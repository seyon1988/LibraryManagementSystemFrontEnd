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

  fa:boolean=false;
  admin:User;
  user:User;

  literatures:Literature[];
  
  aid:number;
  uid:number;
  
  url_identifier : String;

  p:PARAMS = new PARAMS();

  enView:boolean = true;
  enLend:boolean = false;
  enEditDelete:boolean = false ;

  litTitle:String = "View Literatures";

  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {

      this.url_identifier = this.router.url.split('/')[1];


      if(this.url_identifier=="viewliteratures_"){
        this.p.logoff();
        this.litTitle = "View Literatures";
        this.getLiteratures();
      }else if(this.url_identifier=="manageliteratures"){
        this.uid = this.route.snapshot.params['uid'];
        this.userService.getUserByID(this.uid).subscribe(data => {
          this.p.setUserParameters(data);
          this.admin = data;
          this.user = data;
          this.enLend = true;
          this.enEditDelete = true ;
          this.admin = data;
          this.aid = this.uid;
          this.litTitle = "Manage Literatures";
          this.getLiteratures();
        } , error => console.log(error));
      }else if(this.url_identifier=="viewliteratures"){
        this.uid = this.route.snapshot.params['uid'];
        this.userService.getUserByID(this.uid).subscribe(data => {
          this.p.setUserParameters(data);
          if(this.p.isAdmin){
            this.enView = true;
            this.enLend = true;
            this.enEditDelete = false ;
            this.admin = data;
            this.aid = this.uid;
          }else{
            this.enView = true;
            this.enLend = false;
            this.enEditDelete = false ;
          }
          this.getLiteratures();
        } , error => console.log(error));
      }
      
      

      

  }

  ngOnInit(): void {
  }


  getLiteratures(){
    this.literatureService.getLiteratureList(). subscribe(data => {
      this.literatures = data.sort((a,b)=> a.id-b.id);
    });
  }

  updateLiterature(lid:number){
    console.log(" aid "+this.aid+lid)
    this.router.navigate(['updateliterature',this.aid,lid]);
  }


  deleteLiterature(lid :number){
    this.literatureService.deleteLiterature(lid). subscribe(data => {
      console.log(data);
      this.getLiteratures();
    });
  }

  viewLiterature(lid :number ){
    if(this.url_identifier=="manageliteratures") this.router.navigate(['viewliteraturem',this.aid, lid]);
    else if(this.p.signedin) this.router.navigate(['viewliterature',this.uid, lid]);
    else this.router.navigate(['viewliterature_', lid]);
  }


  lendLiterature(lid:number){
    this.router.navigate(['lendliteraturel', this.aid, lid]);
  }
  
  createBook(){
    this.router.navigate(['createliterature',this.aid]);
  }


  login(){
    if(this.p.signedin==true){
      this.p.signedin=false;
      this.p.isAdmin = false;
      this.p.user = new User();
      this.p.user.id = -1;
      this.router.navigate(['welcome']); //signing out
    }else{
      this.router.navigate(['login']); // go to login page
    }
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
    if(this.p.signedin) this.router.navigate(['viewliteratures',this.uid]);
    else this.router.navigate(['viewliteratures']);
  }



  goHome(){
    if(this.p.signedin==true) this.router.navigate(['member',this.uid]);
    else this.router.navigate(['welcome']);
  }

  createUser(){
    this.router.navigate(['createuser' , this.aid]);
  }

  getAvailableBooks(l : Literature){
    return (l.totalBooks - l.lendedBooks);
  }

}
