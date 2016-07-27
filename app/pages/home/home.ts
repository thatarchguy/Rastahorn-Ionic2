import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WompService} from '../../services/womp.service';
import {Womp} from '../../services/womp.model';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  womp: Womp;
  public canIShake = false;

  constructor(
    private navController: NavController,
    private wompService: WompService) {
      this.wompService = wompService;
  }

  ngOnInit() {
    let id = 1;
    this.wompService.getById(id).then(womp => this.womp = womp);
    console.log(this.womp);
  }
  playWomp(womp) {
    this.toggleShake();
    this.wompService.playWomp(womp);
  }
  toggleShake() {
        this.canIShake = true;
        setTimeout(function() {  this.canIShake=false; }.bind(this), 1000);
 }
}
