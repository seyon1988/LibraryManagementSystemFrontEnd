import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { Literature } from '../literature';
import { UserService } from '../user.service';
import { LiteratureService } from '../literature-service';


@Component({
  selector: 'app-view-literature',
  templateUrl: './view-literature.component.html',
  styleUrls: ['./view-literature.component.css']
})
export class ViewLiteratureComponent implements OnInit {


  admin : User;
  aid: number;
  lid:number;
  
  literature : Literature = new Literature();

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

    this.lid =this.route.snapshot.params['lid'];
      
    this.literatureService.getLiteratureByID(this.lid).subscribe(data =>{
      this.literature = data;
    } , error => console.log(error) );

  }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['manageliteratures',this.aid]);
  }

  deleteLiterature(){
    this.literatureService.deleteLiterature(this.lid). subscribe(data => {
      this.router.navigate(['manageliteratures',this.aid]);
    });
  }

  updateLiterature(){
    this.router.navigate(['updateliterature',this.aid,this.lid]);
  }


  login(){
    PARAMS.loginStatus=false;
    PARAMS.setNavParams(0,this.admin);
    this.router.navigate(['welcome']); //signing out
  }

  lendLiterature(){
    this.router.navigate(['lendliteraturel', this.aid, this.lid]);
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
