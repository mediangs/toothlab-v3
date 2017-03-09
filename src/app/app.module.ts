import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MaterialModule} from "@angular/material";

import {nvD3} from 'ng2-nvd3';

import { AppComponent } from './app.component';
import { HomeComponent} from "./home/home.component";
import { AboutComponent} from "./about/about.component";
import { MaterialComponent } from './material/material.component';
import { PeopleComponent } from './people/people.component';
import { PublicationsComponent } from './publications/publications.component';
import { SpecimenListComponent } from './specimen-list/specimen-list.component';

import { PeopleService } from "./services/people.service";
import { PublicationsService } from "./services/publications.service";
import { SpecimenService } from "./services/specimen.service";
import { ModelDetailPlainComponent } from './model-detail-plain/model-detail-plain.component';
import { KeysPipe } from './keys.pipe';
import {Routing} from "./app.routes";
import {ChartService} from "./services/chart.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MaterialComponent,
    PeopleComponent,
    PublicationsComponent,
    SpecimenListComponent,
    ModelDetailPlainComponent,
    KeysPipe,
    nvD3,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Routing
  ],
  providers: [
    PeopleService,
    PublicationsService,
    SpecimenService,
    ChartService
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

