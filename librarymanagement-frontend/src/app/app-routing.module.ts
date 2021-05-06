import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'manageusers/:aid' , component: UserListComponent},
  {path: 'welcome' , component: WelcomeComponent},
  {path: 'member/:mid' , component: WelcomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'createuser' , component: CreateUserComponent},
  //{path: '' , redirectTo:'users' , pathMatch:'full'},
  {path: '' , redirectTo:'welcome' , pathMatch:'full'},
  {path: 'updateuser/:aid/:uid' , component: UpdateUserComponent},
  {path: 'viewuser/:aid/:uid' , component: ViewUserComponent},
  {path: 'validatecredentials/:email/:password:' , component: ViewUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
