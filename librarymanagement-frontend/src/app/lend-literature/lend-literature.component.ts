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



  lid:number;



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
      this.userService.getUserByID(this.route.snapshot.params['aid']).subscribe(data => {
        this.p.setUserParameters(data);
      } , error => console.log(error));

      this.url_identifier = this.router.url.split('/')[1];
      if(this.url_identifier=="lendliteratureu"){
        this.p.uhid = this.route.snapshot.params['uhid'];
        this.selectUser(this.p.uhid);
      }else if(this.url_identifier=="lendliteraturel" || this.url_identifier=="lendliteraturelv"){
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
    } , error => console.log(error));
  }
  selectUser(uhid:number){
    this.userService.getUserByID(uhid).subscribe(data => {
      this.p.setUserHandled(data);
    } , error => console.log(error));
  }

  addToRegister(){
    if(this.p.userHandled.id ==undefined || this.literature.id==undefined){
      const title = "Please check your input!";
      const text = "You have to provide both user and material details";
      this.openModel(title,text);
      return;
    }
    if(this.p.userHandled.utilizedQuota>=this.p.userHandled.bookQuota){
      const title = "Book Quota of user exceeded";
      const text = "User has allready borrowed "+this.p.userHandled.utilizedQuota
      +" books of his maximum book limit of "+this.p.userHandled.bookQuota;
      this.openModel(title,text);
      return;
    }
    if(this.literature.lendedBooks>=this.literature.totalBooks){
      const title = "Book Unavailable";
      const text = "All available books are lended";
      this.openModel(title,text);
      return;
    }
    this.lendService.getLendByUsrIdMatId(this.p.userHandled.id,this.literature.id).subscribe( data => {
      if(data==null){

        this.lend.userID = this.p.userHandled.id;
        this.lend.materialID = this.literature.id;
        this.lendService.createLend(this.lend).subscribe(data => {
          console.log(data);
          this.literature.lendedBooks++;
          this.literatureService.updateLiterature(this.literature.id,this.literature).subscribe(data => {
            console.log(data);
            this.p.userHandled.utilizedQuota++;
            this.userService.updateUser(this.p.userHandled.id,this.p.userHandled).subscribe(data => {
              console.log(data);
              if(data!=null){
                const title = "Record Added";
                const text = "Relavant lending successfully inserted!";
                this.openModel(title,text);
                this.goAfterInserting();
              }
            } , error => console.log(error));
          } , error => console.log(error));
        }, error => console.log(error));
      }else{
        const title = "Record Exists";
        const text = "This user has allready borrowed this book!";
        this.openModel(title,text);
      }

    } , data => console.log(data) );




  }

  goAfterInserting(){
    if(this.url_identifier=="lendliteratureu"){
      this.goToUsersList();
    }else if(this.url_identifier=="lendliteraturel"){
      this.manageBooks();
    }if(this.url_identifier=="lendliterature"){
      this.manageLending();
    }if(this.url_identifier=="lendliteraturelv"){
      this.viewBooks();
    }
  }

  goToUsersList(){
    this.router.navigate(['/manageusers',this.p.aid]);
  }

  onSubmit(){

  }
  getAvailableBooks(l : Literature){
    return (l.totalBooks - l.lendedBooks);
  }



  createUser(){
    this.router.navigate(['createuser' , this.p.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.p.aid]);
  }


  manageUsers(){
    this.router.navigate(['/manageusers',this.p.aid]);
  }


  login(){
    if(this.p.signedin==true){
      this.p.logoff();
      this.router.navigate(['welcome']); //signing out
    }else{
      this.router.navigate(['login']); // go to login page
    }
  }

  goToMyLoans(){
    this.router.navigate(['myloans',this.p.aid]);
  }
  
  manageLending(){
    this.router.navigate(['managelendings',this.p.aid]);
  }

  goHome(){
    this.router.navigate(['member',this.p.aid]);
  }

  viewBooks(){
    this.router.navigate(['viewliteratures',this.p.aid]);
  }
  



}
