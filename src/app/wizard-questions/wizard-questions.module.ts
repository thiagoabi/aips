import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WizardQuestionsPageRoutingModule } from './wizard-questions-routing.module';

import { WizardQuestionsPage } from './wizard-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WizardQuestionsPageRoutingModule
  ],
  declarations: [WizardQuestionsPage]
})
export class WizardQuestionsPageModule {}
