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
  uid:number;


  enLend:boolean = false;
  enEditDelete:boolean = false ;
  url_identifier : String;

  literature : Literature = new Literature();

  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) { 
      this.url_identifier = this.router.url.split('/')[1];

      if(this.url_identifier=="viewliterature_"){
        this.p.logoff();
        this.lid =this.route.snapshot.params['lid'];
        this.literatureService.getLiteratureByID(this.lid).subscribe(data => {
          this.literature = data;
        } , error => console.log(error));
      }else if(this.url_identifier=="viewliterature"){
        this.uid = this.route.snapshot.params['uid'];
        this.userService.getUserByID(this.uid).subscribe(data => {
          this.user = data;
          this.p.setUserParameters(data);
          this.lid =this.route.snapshot.params['lid'];
          if(this.p.isAdmin) {this.aid = this.uid;this.admin=this.user;}
          this.literatureService.getLiteratureByID(this.lid).subscribe(data => {
            if(this.p.admin) this.enLend = true;
            this.literature = data;
          } , error => console.log(error));
        } , error => console.log(error));
      }else if(this.url_identifier=="viewliteraturem"){
        this.uid = this.route.snapshot.params['uid'];
        this.userService.getUserByID(this.uid).subscribe(data => {
          this.user = data;
          this.p.setUserParameters(data);
          this.admin = data;
          this.aid = this.uid;
          this.lid =this.route.snapshot.params['lid'];
          this.literatureService.getLiteratureByID(this.lid).subscribe(data => {
            this.enLend = true;
            this.enEditDelete = true;
            this.literature = data;
          } , error => console.log(error));
        } , error => console.log(error));
      }



  }

  ngOnInit(): void {
  }

  goBack(){
    if(this.url_identifier=="viewliteraturem")this.router.navigate(['manageliteratures',this.aid]);
    else if(this.url_identifier=="viewliterature")this.router.navigate(['viewliteratures',this.uid]);
    else if(this.url_identifier=="viewliterature_")this.router.navigate(['viewliteratures_']);
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
    this.router.navigate(['myloans',this.uid]);
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
