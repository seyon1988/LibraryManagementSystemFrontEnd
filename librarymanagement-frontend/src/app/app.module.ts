import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { LiteratureListComponent } from './literature-list/literature-list.component';
import { CreateLiteratureComponent } from './create-literature/create-literature.component';
import { UpdateLiteratureComponent } from './update-literature/update-literature.component';
import { ViewLiteratureComponent } from './view-literature/view-literature.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ViewUserComponent,
    WelcomeComponent,
    LoginComponent,
    LiteratureListComponent,
    CreateLiteratureComponent,
    UpdateLiteratureComponent,
    ViewLiteratureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
