import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AswerUser } from '../services/aswer-user';
import { User } from '../services/user';
import { ToastController } from '@ionic/angular';
import { Aswer } from '../services/aswer';
import { Question } from '../services/question';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  AswerUserActual: AswerUser[] = [];
  UserActual: User = new User();
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  years = Array.from({ length: 1920 }, (_, i) => 2010 - i);
  dateOfBirth = {
    day: 0,
    month: 0,
    year: 0
  }

  constructor(private toastController: ToastController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        let data = JSON.parse(params.special);
        if (data && data.length > 0) {
          data.forEach((e: { question: Question; aswer: Aswer; }) => {
            this.AswerUserActual.push(new AswerUser(e.question, e.aswer, new User()));
          });
          this.AswerUserActual
        }
      }
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

  ngOnInit() {
  }

  register() {
    let exit = false;
    var invalid = null;
    this.AswerUserActual.forEach(e => {
      var invalid = e.validate();
      if (invalid) {
        this.presentToast("bottom", invalid);
        exit = true;
        return;
      }
    });
    if (this.dateOfBirth.year > 0 && this.dateOfBirth.month > 0 && this.dateOfBirth.day > 0) {
      this.UserActual.dateOfBirth = new Date(this.dateOfBirth.year, this.dateOfBirth.month, this.dateOfBirth.day, 0, 0, 0, 0)
    }
    this.AswerUserActual[0].user = this.UserActual;
    invalid = this.AswerUserActual[0].validateUser();
    if (invalid) {
      this.presentToast("bottom", invalid);
      exit = true;
    }

    if (exit) {
      return
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.AswerUserActual)
      }
    };
    this.router.navigate(['wizard-finish'], navigationExtras);
  }

}
