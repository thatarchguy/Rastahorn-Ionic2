import {Component} from '@angular/core';
import {NavController,Platform} from 'ionic-angular';
import {WompService} from '../../services/womp.service';
import {Womp} from '../../services/womp.model';
import {DeviceMotion} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  womp: Womp;
  public canIShake = false;
  public id = 1;
  private lastX:number;
  private lastY:number;
  private lastZ:number;
  private moveCounter:number = 0;

  constructor(
    private navController: NavController,
    platform:Platform,
    public wompService: WompService){
      platform.ready().then(() => {
        var subscription = DeviceMotion.watchAcceleration({frequency:200}).subscribe(acc => {
          //console.log(acc);

          if(!this.lastX) {
            this.lastX = acc.x;
            this.lastY = acc.y;
            this.lastZ = acc.z;
            return;
          }

          let deltaX:number, deltaY:number, deltaZ:number;
          deltaX = Math.abs(acc.x-this.lastX);
          deltaY = Math.abs(acc.y-this.lastY);
          deltaZ = Math.abs(acc.z-this.lastZ);

          if(deltaX + deltaY + deltaZ > 3) {
            this.moveCounter++;
          } else {
            this.moveCounter = Math.max(0, --this.moveCounter);
          }

          if(this.moveCounter > 2) {
            console.log('WOMP WOMP WOMP');
            this.playWomp(this.womp);
            this.moveCounter=0;
          }

          this.lastX = acc.x;
          this.lastY = acc.y;
          this.lastZ = acc.z;

        });
      });
    }

  ngOnInit() {
    this.wompService.getById(this.id).then(womp => this.womp = womp);
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
