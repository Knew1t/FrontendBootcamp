import { Employee } from "./classes.js";
import {
  BackendDeveloper,
  Company,
  FrontendDeveloper,
  Manager,
  Project,
} from "./hard_classes.js";

let sasha = new FrontendDeveloper(
  "alex",
  "L2",
  "company - s21",
  [
    "paints",
    "buttons",
  ],
  ["css", "html"],
  0,
);
let slava = new BackendDeveloper(
  "slava",
  "L2",
  "company - s21",
  [
    "works",
    "sleeps",
  ],
  ["js", "go"],
  0,
);
let sveta = new Manager(
  "sveta",
  "L2",
  "company - s21",
  ["manages", "talks"],
  0,
);

let team = {
  manager: sveta,
  developers: { frontend: [sasha], backend: [] },
};

let veryImportantProject = new Project("EVALA", "L1", team);

veryImportantProject.addNewProjectMember(slava);

let company = new Company("s21");

company.addNewCompanyMember(slava);
company.addNewCompanyMember(sasha);
company.addNewCompanyMember(sveta);
company.addProject(veryImportantProject);
company.completeProject(veryImportantProject);
console.log(company.getMembersQuantity());

console.log("done");
