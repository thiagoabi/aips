import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard-start',
  templateUrl: './wizard-start.page.html',
  styleUrls: ['./wizard-start.page.scss'],
})
export class WizardStartPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  start() {
    this.router.navigateByUrl('wizard-questions');
  }

}
