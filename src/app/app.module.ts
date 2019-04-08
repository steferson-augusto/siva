import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { DialogConfigComponent } from './dialog-config/dialog-config.component';
import { MainComponent } from './main/main.component';
import { environment } from '../environments/environment';
import { AtividadeComponent } from './modal/atividade/atividade.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogConfigComponent,
    MainComponent,
    AtividadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({ experimentalTabSynchronization: true }),
    NgxChartsModule,
  ],
  entryComponents: [
    DialogConfigComponent,
    AtividadeComponent,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
