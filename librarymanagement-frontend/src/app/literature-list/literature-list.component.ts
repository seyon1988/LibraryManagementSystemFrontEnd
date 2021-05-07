import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from "../user";
import { Literature } from "../literature"
import { UserService } from "../user.service"
import { LiteratureService } from '../literature-service';

@Component({
  selector: 'app-literature-list',
  templateUrl: './literature-list.component.html',
  styleUrls: ['./literature-list.component.css']
})
export class LiteratureListComponent implements OnInit {

  admin:User;

  literatures:Literature[];
  
  aid:number;

  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {
      this.aid = this.route.snapshot.params['uid'];
      this.userService.getUserByID(this.aid).subscribe(data => {
        this.admin = data;
        PARAMS.setNavParams(1,this.admin);
        PARAMS.loginStatus = true;

      } , error => console.log(error));


      this.getLiteratures();


  }

  ngOnInit(): void {
  }


  getLiteratures(){
    this.literatureService.getLiteratureList(). subscribe(data => {
      this.literatures = data;
    });
  }

  updateLiterature(lid:number){
    this.router.navigate(['updateliterature',this.aid,lid]);
  }


  deleteLiterature(lid :number){
    this.literatureService.deleteLiterature(lid). subscribe(data => {
      console.log(data);
      this.getLiteratures();
    });
  }

  viewLiterature(lid :number ){
    this.router.navigate(['viewliterature',this.aid, lid]);
  }

  createBook(){
    this.router.navigate(['createliterature',this.aid]);
  }


  login(){
    PARAMS.loginStatus=false;
    PARAMS.setNavParams(0,this.admin);
    this.router.navigate(['welcome']); //signing out
  }

  manageUsers(){
    this.router.navigate(['/manageusers',this.aid]);
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



  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  createUser(){
    this.router.navigate(['createuser' , this.aid]);
  }

  getAvailableBooks(l : Literature){
    return (l.totalBooks - l.lendedBooks);
  }

  getLoginIdTxt(){return PARAMS.strLoginID};
  getMyLoansTxt(){return PARAMS.strMyLoans};
  getManageUsersTxt(){return PARAMS.strManageUsers};
  getManageBoosTxt(){return PARAMS.strManageBooks};
  getManageLendingTxt(){return PARAMS.strManageLending};


}
