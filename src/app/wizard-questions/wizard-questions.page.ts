import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AswerUser } from '../services/aswer-user';
import { Question } from '../services/question';
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { ActionSequence } from 'protractor';

@Component({
  selector: 'app-wizard-questions',
  templateUrl: './wizard-questions.page.html',
  styleUrls: ['./wizard-questions.page.scss'],
})
export class WizardQuestionsPage implements OnInit {

  Questions: Question[] = [];
  AswerUserComplete: AswerUser[];
  QuestionActual = new Question();
  AswerUserActual: AswerUser[] = [];
  Total = 0;
  nextStep = 0;
  canNext = false;

  constructor(private toastController: ToastController,
    private db: DbService, private router: Router) { }

  ngOnInit() {
    this.db.getFakeQuestions().subscribe((res: any) => {
      this.Questions = res;
      this.Total = this.Questions.length;
      this.QuestionActual = this.Questions[0]
      this.canNext = this.QuestionActual.aswers.length > 0;
    },
      (err) => {
        alert('failed loading json data');
      });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      icon: "information-outline",
      color: "warning"
    });

    await toast.present();
  }

  getAswerActual() : AswerUser {
    return this.AswerUserActual.find(e => e.question.id == this.QuestionActual.id) ?? new AswerUser(this.QuestionActual, null, null);
  }

  async addAswer(value: any) {
    try {
      
    this.canNext = false;
    let aswer = this.QuestionActual.aswers.find(e => e.id == value.detail.value);
    aswer.checked = value.detail.checked;
    let aswerUser = new AswerUser(this.QuestionActual, aswer, null)
    let invalid = aswerUser.validate();
    if (invalid) {
      await this.presentToast("bottom", invalid);
      return;
    }
    let qa = this.AswerUserActual.find(e => e.question.id == this.QuestionActual.id);

    if (qa && !this.QuestionActual.multiple) {
      let indexOf = this.AswerUserActual.findIndex(e => e.question.id == qa.question.id);
      this.AswerUserActual.splice(indexOf, 1);
    }

    if (value.detail.checked != undefined && !value.detail.checked) {
      let existAswerQuestion = this.AswerUserActual.find(e => e.question.id == this.QuestionActual.id && e.aswer.findIndex(a => a.id == value.detail.value) >= 0)
      if (existAswerQuestion) {        
      let indexOf = this.AswerUserActual.findIndex(e => e.question.id == existAswerQuestion.question.id && e.aswer.findIndex(a => a.id == value.detail.value) >= 0);
      this.AswerUserActual.splice(indexOf, 1);
      }
      return;
    }
    this.AswerUserActual.push(aswerUser);
    } catch (error) {
      this.presentToast("top", "Ocorreu um erro interno")
    } finally {
      this.canNext = this.getAswerActual().aswer.length > 0;
    }
    
    if (!this.QuestionActual.multiple) {
      this.next();
    }
  }

  previous() {
    if (this.QuestionActual.orderby > 1) {
      this.QuestionActual = this.Questions.find(e => e.next == this.QuestionActual.id);
    }      
    this.canNext = this.getAswerActual().aswer.length > 0;
  }

  next() {
    if (!this.canNext) {
      this.presentToast("bottom", "Você não pode avançar sem concluir essa etapa");
    }
    this.canNext = false;
    if (this.QuestionActual.next == 0) {
      this.finish()
      return;
    }
    this.QuestionActual = this.Questions.find(e => e.id == this.QuestionActual.next);   
    this.canNext = this.getAswerActual().aswer.length > 0;;
  }

  finish() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.AswerUserActual)
      }
    };
    this.router.navigate(['register'], navigationExtras);
  }
}
