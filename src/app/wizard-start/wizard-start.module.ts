import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WizardStartPageRoutingModule } from './wizard-start-routing.module';

import { WizardStartPage } from './wizard-start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WizardStartPageRoutingModule
  ],
  declarations: [WizardStartPage]
})
export class WizardStartPageModule {}
