import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from "../user";
import { Literature } from "../literature"
import { Lend } from "../lend";
import { UserService } from "../user.service"
import { LiteratureService } from '../literature-service';
import { LendService } from '../lend-service';
import { ModelComponent} from '../model/model.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'app-lend-literature',
  templateUrl: './lend-literature.component.html',
  styleUrls: ['./lend-literature.component.css']
})

export class LendLiteratureComponent implements OnInit {

  admin:User;
  aid:number;

  lid:number;

  user:User = new User();
  uid:number;

  sUid:number;
  sLid:number;


  lend:Lend = new Lend();
  literature:Literature = new Literature();



  url_identifier:String;
  mc:ModelComponent;
  p:PARAMS = new PARAMS();

  constructor(
    public matDialog: MatDialog,
    private userService:UserService,
    private literatureService:LiteratureService,
    private lendService:LendService,
    private router:Router,
    private route:ActivatedRoute) { 
      this.aid = this.route.snapshot.params['aid'];
      this.userService.getUserByID(this.aid).subscribe(data => {
        this.admin = data;
        this.p.setUserParameters(data);
      } , error => console.log(error));

      this.url_identifier = this.router.url.split('/')[1];
      if(this.url_identifier=="lendliteratureu"){
        this.uid = this.route.snapshot.params['uid'];
        this.selectUser(this.uid);
      }else if(this.url_identifier=="lendliteraturel"){
        this.lid = this.route.snapshot.params['lid'];
        this.selectLiterature(this.lid);
      }

    }

  ngOnInit(): void {
  }

  openModel(title:String,text:String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "model-component";
    dialogConfig.height = "350px";
    dialogConfig.data = {modelTitle:title,modelText:text};
    const modelDialog = this.matDialog.open(ModelComponent, dialogConfig);
  }

  selectLiterature(lid:number){
    this.literatureService.getLiteratureByID(lid).subscribe(data => {
      this.literature = data;
      console.log("Data = "+data.title)
      console.log("Admin = "+this.admin.firstName)
    } , error => console.log(error));
  }
  selectUser(uid:number){
    this.userService.getUserByID(uid).subscribe(data => {
      this.user = data;
    } , error => console.log(error));
  }

  addToRegister(){
    if(this.user.utilizedQuota>=this.user.bookQuota){
      const title = "Book Quota of user exceeded";
      const text = "User has allready borrowed "+this.user.utilizedQuota
      +" books of his maximum book limit of "+this.user.bookQuota;
      this.openModel(title,text);
      return;
    }
    if(this.literature.lendedBooks>=this.literature.totalBooks){
      const title = "Book Unavailable";
      const text = "All available books are lended";
      this.openModel(title,text);
      return;
    }
    this.lend.userID = this.user.id;
    this.lend.materialID = this.literature.id;
    this.lendService.createLend(this.lend).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
    console.log("hhere = "+this.literature.lendedBooks);
    this.literature.lendedBooks++;
    console.log("hhere aft = "+this.literature.lendedBooks);
    this.literatureService.updateLiterature(this.lid,this.literature).subscribe(data => {
      console.log(data);
    } , error => console.log(error));
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

  goToMyLoans(){
    
  }
  
  manageLending(){

  }

  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  viewBooks(){

  }
  



}
