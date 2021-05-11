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

  p:PARAMS = new PARAMS();
  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {
    this.aid = this.route.snapshot.params['aid'];
    this.userService.getUserByID(this.aid).subscribe(data => {
      this.admin = data;
      this.p.setUserParameters(data);
    } , error => console.log(error));

    this.getLiteratures();


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
    this.router.navigate(['viewliterature',this.aid, lid]);
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

}
