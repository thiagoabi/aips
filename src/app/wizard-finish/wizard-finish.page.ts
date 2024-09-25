import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HeaderHeightFn } from '@ionic/core';
import { AswerUser } from '../services/aswer-user';
import { DbService } from '../services/db.service';
import { HealthCenter } from '../services/health-center';
import { Question } from '../services/question';

@Component({
  selector: 'app-wizard-finish',
  templateUrl: './wizard-finish.page.html',
  styleUrls: ['./wizard-finish.page.scss'],
})
export class WizardFinishPage implements OnInit {
  AswerUserActual: AswerUser[] = [];
  HealthCenters: HealthCenter[] = [];
  HealthCenterActual = new HealthCenter();
  percent = 0;
  result: string[] = [];
  showFinish = false;
  constructor(private db: DbService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.AswerUserActual = JSON.parse(params.special);
        this.AswerUserActual.forEach(a => {
          a.aswer.forEach(b => {
              this.percent += b[0].weight;
          });
        });
        
        if (isNaN(this.percent)) {
          this.percent = 0;
        }
        if (this.percent > 100){
          this.percent = 100;
        }
      }
    });
  }

  ngOnInit() {
    this.setResult();
    this.getHealthsCenter();
  }

  setResult() {
    if (this.percent <= 30) {
      this.result.push("De acordo com seu resultado não identificamos que não há necessidade de encaminhamento ao centro APIS de diagnóstico")
      this.result.push("Isso é ótimo, continue sempre se prevenindo e fazendo exames periódicos")
    }
    if (this.percent > 30 && this.percent <= 60) {
      this.result.push("Caso queira continuar com seu diagnóstico, você pode procurar uma de nossos centros avançados AIPS")
    } else if (this.percent > 60 && this.percent <= 100) {
      this.result.push("De acordo com seu resultado sugerimos que procure, caso queira mais informações e tratamentos, nosso ao centro APIS de diagnóstico")
    }
    if (this.percent > 30) {
      this.result.push("Veja o endereço da filial mais perto de você na próxima página")
    }
  }
 
  getHealthsCenter() {
    this.db.getFakeHealthCenter().subscribe((res: any) => {
      this.HealthCenters = res;
      this.HealthCenterActual = this.HealthCenters[this.AswerUserActual[0].user.city - 1];
      this.HealthCenters = this.HealthCenters.filter(e => e.id != this.HealthCenterActual.id)
    },
      (err) => {
        alert('failed loading json data');
      });
  }

  ionSlideNextEnd()
  {
    this.showFinish = true;
  }

  restart() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: true
      }
    };
    this.router.navigate(['splash'], navigationExtras);
  }
}
