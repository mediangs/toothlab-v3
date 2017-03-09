import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class ChartService {

  // Observable source
  private activeSection = new Subject<number>();

  // Observable stream
  activeSection$ = this.activeSection.asObservable();

  getActiveSection(section : number){
    console.log('getActiveSection');
    this.activeSection.next(section);
  }

  constructor() { }

}
