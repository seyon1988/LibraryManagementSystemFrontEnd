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

  literatures:Literature[];

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
        this.userService.getUserByID(this.route.snapshot.params['uid']).subscribe(data => {
          this.p.setUserParameters(data);
          this.enLend = true;
          this.enEditDelete = true ;
          this.litTitle = "Manage Literatures";
          this.getLiteratures();
        } , error => console.log(error));
      }else if(this.url_identifier=="viewliteratures"){
        this.userService.getUserByID(this.route.snapshot.params['uid']).subscribe(data => {
          this.p.setUserParameters(data);
          if(this.p.isAdmin){
            this.enView = true;
            this.enLend = true;
            this.enEditDelete = false ;
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
    this.router.navigate(['updateliterature',this.p.aid,lid]);
  }


  deleteLiterature(lid :number){
    this.literatureService.deleteLiterature(lid). subscribe(data => {
      console.log(data);
      this.getLiteratures();
    });
  }

  viewLiterature(lid :number ){
    if(this.url_identifier=="manageliteratures") this.router.navigate(['viewliteraturem',this.p.aid, lid]);
    else if(this.p.signedin) this.router.navigate(['viewliterature',this.p.uid, lid]);
    else this.router.navigate(['viewliterature_', lid]);
  }


  lendLiterature(lid:number){
    this.router.navigate(['lendliteraturel', this.p.aid, lid]);
  }
  
  createBook(){
    this.router.navigate(['createliterature',this.p.aid]);
  }


  login(){
    if(this.p.signedin==true){
      this.p.logoff();
      this.router.navigate(['welcome']); //signing out
    }else{
      this.router.navigate(['login']); // go to login page
    }
  }

  manageUsers(){
    this.router.navigate(['/manageusers',this.p.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.p.aid]);
  }
  
  goToMyLoans(){
    this.router.navigate(['myloans',this.p.uid]);
  }
  
  manageLending(){
    this.router.navigate(['managelendings',this.p.aid]);
  }
  
  viewBooks(){
    if(this.p.signedin) this.router.navigate(['viewliteratures',this.p.uid]);
    else this.router.navigate(['viewliteratures']);
  }



  goHome(){
    if(this.p.signedin==true) this.router.navigate(['member',this.p.uid]);
    else this.router.navigate(['welcome']);
  }

  createUser(){
    this.router.navigate(['createuser' , this.p.aid]);
  }

  getAvailableBooks(l : Literature){
    return (l.totalBooks - l.lendedBooks);
  }

}
