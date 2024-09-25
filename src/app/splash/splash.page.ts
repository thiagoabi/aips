import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(restart => {
      if (restart) {
        this.redirect();
      }
    });
  }

  ngOnInit() {
    this.redirect();
  }

  redirect() {
    setTimeout(() => {
      this.router.navigateByUrl('home');
    }, 2000);
  }
}
