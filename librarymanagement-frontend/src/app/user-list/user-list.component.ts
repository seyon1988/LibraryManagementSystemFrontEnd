import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from "../user"
import { UserService } from "../user.service"

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  admin:User;
  users:User[];
  aid:number;

  constructor(
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getUsers();
  }

  private getUsers(){
    this.aid = this.route.snapshot.params['aid'];
    this.userService.getUserByID(this.aid).subscribe(data => {
      this.admin = data;
      PARAMS.setNavParams(1,this.admin);
      PARAMS.loginStatus = true;

    } , error => console.log(error));
    this.userService.getUserList(). subscribe(data => {
      this.users = data;
    });
  }

  updateUser(uid :number){
    this.router.navigate(['updateuser',this.aid,uid]);
  }

  deleteUser(uid :number){
    this.userService.deleteUser(uid). subscribe(data => {
      console.log(data);
      this.getUsers();
    });
  }

  viewUser(uid :number ){
    this.router.navigate(['viewuser' , this.aid , uid]);
  }


  login(){
    PARAMS.loginStatus=false;
    PARAMS.setNavParams(0,this.admin);
    this.router.navigate(['welcome']); //signing out
  }

  manageUsers(){
    this.router.navigate(['/manageusers',this.aid]);
  }

  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  createUser(){
    this.router.navigate(['createuser' , this.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.aid]);
  }

  goToMyLoans(){

  }

  manageLending(){

  }
  
  viewBooks(){
    
  }

  getLoginIdTxt(){return PARAMS.strLoginID};
  getMyLoansTxt(){return PARAMS.strMyLoans};
  getManageUsersTxt(){return PARAMS.strManageUsers};
  getManageBoosTxt(){return PARAMS.strManageBooks};
  getManageLendingTxt(){return PARAMS.strManageLending};


}
