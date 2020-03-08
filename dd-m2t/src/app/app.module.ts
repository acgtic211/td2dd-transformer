import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WotFormComponent } from './wot-form/wot-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';

import { TdValidatorService } from './td-validator.service'
import { DdInfraBuilderService } from './dd-infra-builder.service';
import { DdBuilderService } from './dd-builder.service';
import { DdResponseComponent } from './dd-response/dd-response.component';

@NgModule({
  declarations: [
    AppComponent,
    WotFormComponent,
    HeaderComponent,
    DdResponseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [TdValidatorService, DdInfraBuilderService, DdBuilderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
