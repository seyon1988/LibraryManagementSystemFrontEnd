
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})


export class ViewUserComponent implements OnInit {

  user : User = new User();
  admin : User;

  uid:number;
  aid:number;

  constructor(private userService:UserService,
    private router:ActivatedRoute,
    private route:Router) { }

  ngOnInit(): void {
    this.uid = this.router.snapshot.params['uid'];
    this.aid = this.router.snapshot.params['aid'];

    this.userService.getUserByID(this.uid).subscribe(data => {
      this.user = data;
    } , error => console.log(error));

    this.userService.getUserByID(this.aid).subscribe(data => {
      this.admin = data;
      PARAMS.setNavParams(1,this.admin);
      PARAMS.loginStatus = true;
    } , error => console.log(error));

  }


  
  updateUser(aid:number , uid :number){
    this.route.navigate(['updateuser',aid,uid]);
  }

  deleteUser(uid :number){
    console.log("click");
    this.userService.deleteUser(uid). subscribe(data => {
      console.log(data);
      this.goBack();
    });
  }

  goBack(){
    this.route.navigate(['manageusers',this.aid]);
  }








  viewUser(uid :number){
    this.route.navigate(['viewuser',uid]);
  }


  login(){
    PARAMS.loginStatus=false;
    PARAMS.setNavParams(0,this.admin);
    this.route.navigate(['welcome']); //signing out
  }


  goHome(){
    this.route.navigate(['member',this.aid]);
  }

  getLoginIdTxt(){return PARAMS.strLoginID};
  getMyLoansTxt(){return PARAMS.strMyLoans};
  getManageUsersTxt(){return PARAMS.strManageUsers};
  getManageBoosTxt(){return PARAMS.strManageBooks};
  getManageLendingTxt(){return PARAMS.strManageLending};







}
