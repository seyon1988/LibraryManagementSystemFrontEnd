import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { LiteratureListComponent } from './literature-list/literature-list.component';
import { CreateLiteratureComponent } from './create-literature/create-literature.component';
import { UpdateLiteratureComponent } from './update-literature/update-literature.component';
import { ViewLiteratureComponent } from './view-literature/view-literature.component';




const routes: Routes = [
  {path: 'manageusers/:aid' , component: UserListComponent},
  {path: 'welcome' , component: WelcomeComponent},
  {path: 'member/:mid' , component: WelcomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'createuser/:aid' , component: CreateUserComponent},
  //{path: '' , redirectTo:'users' , pathMatch:'full'},
  {path: '' , redirectTo:'welcome' , pathMatch:'full'},
  {path: 'updateuser/:aid/:uid' , component: UpdateUserComponent},
  {path: 'viewuser/:aid/:uid' , component: ViewUserComponent},
  {path: 'manageliteratures/:uid' , component: LiteratureListComponent},
  {path: 'viewliteratures/:uid' , component: LiteratureListComponent},
  {path: 'updateliterature/:aid/:lid' , component: UpdateLiteratureComponent},
  {path: 'createliterature/:aid' , component: CreateLiteratureComponent},
  {path: 'viewliterature/:aid/:lid' , component: ViewLiteratureComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
