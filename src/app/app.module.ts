import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StudentComponent } from './components/student/student.component';
import { PopupComponent } from './components/popup/popup.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
