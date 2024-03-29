package auth

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"time"
)

// import (
//
//	"context"
//	"fmt"
//	"github.com/golang-jwt/jwt"
//	"github.com/labstack/echo/v4"
//	"net/http"
//	"time"
//
// )
//
// Ключ для подписи JWT токена
var jwtKey []byte

// Claims Вспомогательная структура для передачи данных в JWT токен
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func SetJwtKey(key string) {
	jwtKey = []byte(key)
}

// Функция для создания JWT токена
func CreateToken(username string) (string, error) {
	// Устанавливаем время истечения токена через 1 неделю
	expirationTime := time.Now().Add(24 * 7 * time.Hour)

	// Создаем структуру Claims с данными для токена
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Создаем JWT токен с указанным ключом подписи
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// VerifyAndExtractUsername Функция для проверки валидности JWT токена и извлечения атрибута "username"
func VerifyAndExtractUsername(tokenString string) (string, error) {
	// Парсим токен с использованием ключа подписи
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// Убедитесь, что метод подписи токена совпадает с тем, который использовался при создании токена
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("неверный метод подписи токена")
		}
		return jwtKey, nil
	})

	if err != nil {
		return "", err
	}

	// Проверяем валидность токена
	if !token.Valid {
		return "", fmt.Errorf("неверный токен")
	}

	// Извлекаем атрибут "username" из структуры Claims
	if claims, ok := token.Claims.(*Claims); ok {
		fmt.Println(claims.Username)
		return claims.Username, nil
	} else {
		return "", fmt.Errorf("не удалось извлечь атрибут username из токена")
	}
}
