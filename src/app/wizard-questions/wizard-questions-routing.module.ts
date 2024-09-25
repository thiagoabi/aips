import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WizardQuestionsPage } from './wizard-questions.page';

const routes: Routes = [
  {
    path: '',
    component: WizardQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WizardQuestionsPageRoutingModule {}
