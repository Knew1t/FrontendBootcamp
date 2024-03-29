Преимущества: \
`-` Никаких больше className. Возможность передавать классы никуда не пропадает, но их использование опционально и бессмысленно, теперь мы можем прописывать все стили внутри стилизованных компонент, и классы будут генерироваться автоматически. \
`-` Простая динамическая стилизация. Не нужно больше писать тернарные операторы и жонглировать className внутри компонента, теперь все эти проблемы решаются благодаря прокидыванию пропсов внутрь стилизованных компонентов. \
`-` Теперь это JS. Так как теперь стили пишутся в экосистеме JavaScript, это упрощает навигацию по проекту и даёт различные возможности написания кода. \
`-` StylisJS под капотом. Данный препроцессор поддерживает: 
1. Ссылки на родителя &, который часто используют в SCSS.
2. Минификация — уменьшение размера исходного кода.
3. Tree Shaking — удаление мёртвого кода.
4. Вендорные префиксы — приставка к свойству CSS, обеспечивающая поддержку браузерами, в которых определённая функция ещё не внедрена на постоянной основе.

Базовый пример:

```
import styled from 'styled-components'

// Создаем стилизованную компоненту
// Присваиваем ей функцию styled.[название тега]
// Приписываем шаблонную строку и внутри пишем CSS стили
const Container = styled.div`
  background-color: #2b2b2b;
  border-radius: 5px;
`

const Title = styled.h1`
  font-weight: 300;
`
const Text = styled.p`
  font-size: 12px
`

// Используем эти компоненты внутри нашего JSX!
export const SimpleComponent = () => (
  <Container>
    <Title>Styled Component</Title>
    <Text>Some text</Text>
  </Container>
)
```

В стилизованные компоненты также передаются свойства. 
Например, передадим Title свойство color="Red" и в компоненте Title получим к нему доступ.
```
color: ${props => props.color};
```

[Оффициальная документация](https://styled-components.com/docs)
