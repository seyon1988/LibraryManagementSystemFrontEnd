import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from "../user";
import { Literature } from "../literature"
import { UserService } from "../user.service"
import { LiteratureService } from '../literature-service';



@Component({
  selector: 'app-lend-literature',
  templateUrl: './lend-literature.component.html',
  styleUrls: ['./lend-literature.component.css']
})
export class LendLiteratureComponent implements OnInit {

  admin:User;
  aid:number;
  literature:Literature = new Literature();
  lid:number;
  user:User = new User();
  uid:number;

  url_identifier:String;

  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) { 

      this.aid = this.route.snapshot.params['aid'];
      this.userService.getUserByID(this.aid).subscribe(data => {
        this.admin = data;
        PARAMS.setNavParams(1,this.admin);
        PARAMS.loginStatus = true;
      } , error => console.log(error));

      this.url_identifier = this.router.url.split('/')[1];
      if(this.url_identifier=="lendliteratureu"){
        this.uid = this.route.snapshot.params['uid'];
        this.userService.getUserByID(this.uid).subscribe(data => {
          this.user = data;
          console.log("Data = "+data.firstName)
          console.log("Admin = "+this.admin.firstName)
        } , error => console.log(error));
      }else if(this.url_identifier=="lendliteraturel"){
        this.lid = this.route.snapshot.params['lid'];
        this.literatureService.getLiteratureByID(this.lid).subscribe(data => {
          this.literature = data;
          console.log("Data = "+data.title)
          console.log("Admin = "+this.admin.firstName)
        } , error => console.log(error));
      }
    }

  ngOnInit(): void {
  }


  goToUsersList(){
    this.router.navigate(['/manageusers',this.aid]);
  }

  onSubmit(){

  }
  getAvailableBooks(l : Literature){
    return (l.totalBooks - l.lendedBooks);
  }

 

  createUser(){
    this.router.navigate(['createuser' , this.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.aid]);
  }


  manageUsers(){
    this.router.navigate(['/manageusers',this.aid]);
  }


  login(){
    PARAMS.loginStatus=false;
    PARAMS.setNavParams(0,this.admin);
    this.router.navigate(['welcome']); //signing out
  }

  goToMyLoans(){
    
  }
  
  manageLending(){

  }

  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  viewBooks(){

  }
  
  getLoginIdTxt(){return PARAMS.strLoginID};
  getMyLoansTxt(){return PARAMS.strMyLoans};
  getManageUsersTxt(){return PARAMS.strManageUsers};
  getManageBoosTxt(){return PARAMS.strManageBooks};
  getManageLendingTxt(){return PARAMS.strManageLending};





}
