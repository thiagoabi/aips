import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WizardStartPage } from './wizard-start.page';

const routes: Routes = [
  {
    path: '',
    component: WizardStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WizardStartPageRoutingModule {}
