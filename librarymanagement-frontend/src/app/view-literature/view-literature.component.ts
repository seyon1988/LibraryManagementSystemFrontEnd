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



  user:User = new User();
  admin:User = new User();
  mid:number;
  logintext:String = "Login";
  p:PARAMS = new PARAMS();


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
        this.p.setUserParameters(data);
        this.lid =this.route.snapshot.params['lid'];
        this.literatureService.getLiteratureByID(this.lid).subscribe(data => {
          this.literature = data;
        } , error => console.log(error));
      } , error => console.log(error));


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



}
