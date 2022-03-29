import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PublishComponent } from './publish/publish.component';
import { ListenComponent } from './listen/listen.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PublishPartComponent } from './publish-part/publish-part.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PublishComponent,
    ListenComponent,
    EditComponent,
    HeaderComponent,
    PublishPartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'dormunication'),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
