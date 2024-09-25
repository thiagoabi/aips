import { Aswer } from "./aswer";
import { Question } from "./question";
import { User } from "./user";

export class AswerUser {
  question: Question;
  aswer: Aswer[] = [];
  user: User;

  constructor(q: Question, a: Aswer, u: User) {
    this.question = q;
    this.user = u;
    if (a) {
      this.aswer.push(a);
    }
  }

  setAswer(value: Aswer) {
    let i = this.aswer.indexOf(value)
    if (i >= 0) {
      this.aswer[i] = value;
    } else {
      this.aswer.push(value)
    }
  }

  validate(): string {
    if (this.aswer.length == 0) {
      return "Você deve escolher pelo menos uma opção";
    }

    if (!this.question.multiple && this.aswer.length > 1) {
      return "Você deve escolher apenas UMA opção";
    }
    return undefined;
  }

  validateUser() {
    if (!this.user) {
      return "Dados pessoais obrigatório";
    }
    if (!this.user.name || this.user.name.trim().length == 0) {
      return "Nome obrigatório";
    }
    if (!this.user.dateOfBirth || this.user.dateOfBirth.toLocaleString().length == 0) {
      return "Data de nascimento obrigatório";
    }
    if (!this.user.city || this.user.city == 0) {
      return "Cidade/Estado obrigatório";
    }  
    if (!this.user.gender || this.user.gender.length == 0) {
      return "Gênero obrigatório";
    }
    return undefined;
  }
}
