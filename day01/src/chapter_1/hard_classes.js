/* В продолжение прошлого задания вам нужно нужно создать 5 новых классов:

**Company** - класс описывающий IT компанию. Состоит из:
1. Св-ва:
- companyName
- currentProjects - текущий пулл проектов. Массив экземпляров класса Project
- completedProjects - пулл завершенных проектов. Массив экземпляров класса Project
- staff - весь пулл сотрудников компании. Это объект, у которого есть поля Developers, Managers. В этих полях лежат массивы экземпляров аналогичных классов.
2. Методы:
- addNewCompanyMember() - позволяет нанять нового сотрудника. В результате метода у выбранного сотрудника
должно смениться имя компании.
- addProject() - позволяет добавить проект в пулл текущих.
- getMembersQuantity() - позволяет получить кол-во сотрудников, работающих в данной компании
- completeProject(project) - позволяет закончить проект. В результате выполнения функции проект из currentProjects перемещается в completedProjects. У команды данного проекта должно увеличиться кол-во завершенных проектов.

**Project** - класс описывающий проект компании. На проекте может быть только 1 менеджер! Каждый сотрудник может работать только над одним проектом! Состоит из:
1. Св-ва:
- projectName
- minQualification - минимальная квалификация сотрудника, для работы на данном проекте.
- team - команда проекта. Объект, типа {manager: Manager, developers: {Frontend : [], backend: []}}. В св-ва этого объекта указан массив аналогичных классов.

2. Методы:
- addNewProjectMember(member) - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.


**Backend Developer** - Класс, который наследуется от класса Employee.
1.Имеет новые св-ва:
- stack - Массив в котором указаны технологии, которыми владеет разработчик.
- developerSide - 'backend'
- projectQuantity - Число завершенных проектов.
2. Методы:
- expandStack(someTech) - разработчик может увеличить стек технологий.

**Frontend Developer** - Класс, который наследуется от класса Employee.
1.Имеет новые св-ва:
- stack - Массив в котором указаны технологии, которыми владеет разработчик.
- developerSide - 'frontend'
- projectQuantity - Число завершенных проектов.
- projectQuantity - Число завершенных проектов.
2. Методы:
- expandStack(someTech) - разработчик может увеличить стек технологий.

**Manager** - Класс, который наследуется от класса Employee.
1.Имеет новые св-ва:
- projectQuantity - Число завершенных проектов.
2. Методы:
- checkMember(minQualification, member) - менеджер проверяет, удовлетворяет ли сотрудник условиям проекта. Сотрудник, состоящий в другой компании не может работать над проектом другой компании.

*/

import { Employee } from "./classes.js";

/* Св-ва и методы класса
companyName - string
currentProjects - Массив экземпляров класса Project
completedProjects -  Массив экземпляров класса Project
staff - {
    developers :  {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса BackendDeveloper
    },
    managers: массив содержащий экземпляры класса Manager
}

addNewCompanyMember(Developer/Manager) - в кач-ве аргумента принимает экземпляр класса FrontendDeveloper, BackendDeveloper или Manager
addProject(Project) - в кач-ве аргумента принимает экземпляр класса Project
getMembersQuantity()
completeProject()
*/
export class Company {
  #companyName;
  #currentProjects = [];
  #completedProjects = [];
  #staff = {
    developers: { frontend: [], backend: [] },
    managers: [],
  };
  constructor(companyName, currentProjects, completedProjects, staff) {
    this.companyName = companyName;
    this.currentProjects = currentProjects;
    this.completedProject = completedProjects;
    this.staff = staff;
  }

  addNewCompanyMember(developer) {
    if (developer instanceof BackendDeveloper) {
      developer.changeCompany(this.#companyName);
      this.#staff.developers.backend.push(developer);
    } else if (developer instanceof FrontendDeveloper) {
      developer.changeCompany(this.#companyName);
      this.#staff.developers.frontend.push(developer);
    } else if (developer instanceof Manager) {
      developer.changeCompany(this.#companyName);
      this.#staff.managers.push(developer);
    } else {
      throw new Error(
        "new company member has to be Manager/FrontendDeveloper/BackendDeveloper",
      );
    }
  }

  addProject(newProject) {
    if (newProject instanceof Project) {
      this.#currentProjects.push(newProject);
    } else {
      throw new Error("newProject as to be an instance of Project class");
    }
  }

  getMembersQuantity() {
    return this.#staff.developers.frontend.length +
      this.#staff.developers.backend.length + this.#staff.managers.length;
  }

  completeProject(project) {
    if (project instanceof Project) {
      let id = this.#currentProjects.findIndex((element) => element === project);
      if (id > -1) {
        this.#currentProjects.splice(id, 1);
        this.#completedProjects.push(project);

        this.#staff.developers.frontend.forEach((element) =>
          element.plusProject()
        );
        this.#staff.developers.backend.forEach((element) =>
          element.plusProject()
        );
        this.#staff.managers.forEach((element) => element.plusProject());
      }
    } else {
      throw new Error(" complete project takes as an argument Project class");
    }
  }
}

/*
- projectName - string
- minQualification -string
- team -  {
    manager : экземпляр класса Manager
    developers: {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса BackendDeveloper
    }
}

addNewProjectMember(Developer) - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.
*/

export class Project {
  #projectName;
  #minQualification;
  #team = { manager: {}, developers: { frontend: [], backend: [] } };
  constructor(projectName, minQualification, team) {
    this.#projectName = projectName;
    this.#minQualification = minQualification;
    this.#team = Object.assign({}, team);
  }

  addNewProjectMember(Developer) {
    if (this.#team.manager.checkMember(Developer.getGrade, Developer)) {
      if (Developer instanceof BackendDeveloper) {
        this.#team.developers.backend.push(Developer);
      } else {
        this.#team.developers.frontend.push(Developer);
      }
    }
  }
}
/*
projectQuantity - number
checkMember(minQualification, member) - в качестве аргумента принимается строка ('L1'/'L2'/'L3'/'L4') и BackendDeveloper || FrontendDeveloper
*/
export class Manager extends Employee {
  #projectQuantity;
  constructor(name, grade, company, hardSkills, projectQuantity = 0) {
    super(name, grade, company, hardSkills);
    this.#projectQuantity = projectQuantity;
  }

  checkMember(minQualification, member) {
    if (member instanceof Employee == false || member instanceof Manager) {
      throw new Error(
        "member has to be FrontendDeveloper or BackendDeveloper class",
      );
    }
    if (
      minQualification != "L1" &&
      minQualification != "L2" &&
      minQualification != "L3" &&
      minQualification != "L4"
    ) {
      throw new Error("Wrong qualification");
    }
    if (
      member.getCompanyName === this.getCompanyName &&
      member.getGrade[1] >= minQualification[1]
    ) return true;
    else return false;
  }
  plusProject() {
    ++this.#projectQuantity;
  }
}

/*
stack - массив строк
- developerSide - строка ('frontend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/

export class FrontendDeveloper extends Employee {
  #stack;
  #projectQuantity;
  #developerSide = "frontend";
  constructor(
    name,
    grade,
    company,
    hardSkills,
    stack,
    pq = 0,
  ) {
    super(name, grade, company, hardSkills);
    this.#stack = Object.assign([], stack);
    if (typeof pq != "number") {
      throw new Error("invalid projectQuantity");
    }
    this.#projectQuantity = pq;
  }
  expandStack(str) {
    if (typeof str === "string") {
      this.#stack.push(str);
    } else {
      throw new Error("expandStack accepts string");
    }
  }
  get getDevSide() {
    return this.#developerSide;
  }
  plusProject() {
    ++this.#projectQuantity;
  }
}

/*
stack - массив строк
- developerSide - строка ('backend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/

export class BackendDeveloper extends Employee {
  #stack;
  #projectQuantity;
  #developerSide = "backend";
  constructor(
    name,
    grade,
    company,
    hardSkills,
    stack,
    pq = 0,
  ) {
    super(name, grade, company, hardSkills);
    this.#stack = Object.assign([], stack);
    if (typeof pq != "number") {
      throw new Error("invalid projectQuantity");
    }
    this.#projectQuantity = pq;
  }

  expandStack(str) {
    if (typeof str === "string") {
      this.#stack.push(str);
    } else {
      throw new Error("expandStack accepts string");
    }
  }
  toJSON() {
    let returnObj = super.toJSON();
  }
  get getDevSide() {
    return this.#developerSide;
  }
  plusProject() {
    ++this.#projectQuantity;
  }
}
