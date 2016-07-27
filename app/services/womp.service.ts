import { Injectable } from '@angular/core';
import { WOMP } from './mock-womp';

@Injectable()
export class WompService {
  getAllWomp() {
    return Promise.resolve(WOMP);
  }

  getById(id: number) {
  return this.getAllWomp()
             .then(womps => womps.find(womp => womp.id === id));
  }

  playWomp(womp) {
    let audio = new Audio();
    audio.src = womp.sound;
    audio.load();
    audio.play();
  }
}
