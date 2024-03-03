/*
У экземпляра класса должны присутствовать св-ва:
-name string.
-grade string Для простоты предположим, что система грейдов будет иметь значения от L1 до L4.
-hardSkills string[].
-company string.


Так же должны иметься три метода:

-changeCompany(newCompanyName) - сотрудник может сменить компанию, либо же просто уволиться.
-upGrade() - сотрудник может повысить квалификацию.
-addSkill(newSkillName) - сотрудник может дополнить список своих скиллов.
*/

export class Employee {
  constructor(name, grade, company, hardSkills) {
    this.#name = name;
    if (grade != "L1" && grade != "L2" && grade != "L3" && grade != "L4") {
      throw new Error("Invalid grade!");
    }
    this.#grade = grade;
    this.#hardSkills = Object.assign([], hardSkills);
    this.#company = company;
  }
  #name;
  #grade;
  #hardSkills;
  #company;

  print() {
    console.log(this.#name, this.#grade, this.#hardSkills, this.#company);
  }
  get getCompanyName() {
    return this.#company;
  }
  get getGrade() {
    return this.#grade;
  }

  changeCompany(newCompanyName) {
    this.#company = newCompanyName;
  }

  upGrade() {
    if (this.#grade == "L4") return;
    this.#grade = `${this.#grade[0]}${Number(this.#grade[1]) + 1}`;
  }

  addSkill(newSkillName) {
    this.#hardSkills.push(newSkillName);
  }

  toJSON() {
    return {
      name: this.#name,
      grade: this.#grade,
      hardSkills: this.#hardSkills,
      company: this.#company,
    };
  }
}

// const sasha = new Employee("alex", "L1", " s21", "ebet vola");
// console.log(sasha.name, sasha.grade, sasha.hardSkills, sasha.company);
// sasha.changeCompany("42");
// sasha.addSkill("writes code");
// sasha.upGrade();
// console.log(sasha.name, sasha.grade, sasha.hardSkills, sasha.company);
// const masha = new Employee("alex", "L", " s21", "ebet vola");
