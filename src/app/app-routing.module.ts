import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'wizard-questions',
    loadChildren: () => import('./wizard-questions/wizard-questions.module').then( m => m.WizardQuestionsPageModule)
  },  {
    path: 'wizard-start',
    loadChildren: () => import('./wizard-start/wizard-start.module').then( m => m.WizardStartPageModule)
  },
  {
    path: 'wizard-finish',
    loadChildren: () => import('./wizard-finish/wizard-finish.module').then( m => m.WizardFinishPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
