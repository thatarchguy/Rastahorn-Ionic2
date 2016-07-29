import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {WompService} from './services/womp.service';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [WompService]
})

export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.hideSplashScreen();
      StatusBar.styleDefault();
    });
  }


  hideSplashScreen() {
    if (Splashscreen) {
        setTimeout(() => {
          Splashscreen.hide();
        }, 1000);
    }
  }

}

ionicBootstrap(MyApp);
