
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
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid'];
    this.aid = this.route.snapshot.params['aid'];

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
    this.router.navigate(['updateuser',aid,uid]);
  }

  deleteUser(uid :number){
    console.log("click");
    this.userService.deleteUser(uid). subscribe(data => {
      console.log(data);
      this.goBack();
    });
  }

  goBack(){
    this.router.navigate(['manageusers',this.aid]);
  }


  lendLiterature(uid:number){
    this.router.navigate(['lendliteratureu', this.aid, uid]);
  }
  





  viewUser(uid :number){
    this.router.navigate(['viewuser',uid]);
  }


  login(){
    PARAMS.loginStatus=false;
    PARAMS.setNavParams(0,this.admin);
    this.router.navigate(['welcome']); //signing out
  }


  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  getLoginIdTxt(){return PARAMS.strLoginID};
  getMyLoansTxt(){return PARAMS.strMyLoans};
  getManageUsersTxt(){return PARAMS.strManageUsers};
  getManageBoosTxt(){return PARAMS.strManageBooks};
  getManageLendingTxt(){return PARAMS.strManageLending};



  manageBooks(){
    this.router.navigate(['manageliteratures',this.aid]);
  }
  
  goToMyLoans(){
    
  }

  manageLending(){

  }

  viewBooks(){
    
  }
}
