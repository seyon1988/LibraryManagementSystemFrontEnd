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
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-manage-loans',
  templateUrl: './manage-loans.component.html',
  styleUrls: ['./manage-loans.component.css']
})
export class ManageLoansComponent implements OnInit {

  p:PARAMS = new PARAMS();

  lends:Lend[];
  users:User[];
  literatures:Literature[];
  literature:Literature;

  showList:boolean = false;

  sUhid:number;


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

      this.createLendList();
    }



  ngOnInit(): void {
  }



  selectUser(){
    this.showList = false;
    this.lends = [] ;
    this.literatures = [];
    this.users = [];
    this.lendService.getLendByUserID(this.sUhid).subscribe( data => {
      this.lends = data ;
      for(let lend of this.lends){
        this.userService.getUserByID(lend.userID).subscribe(data => {
          this.users.push(data);
          this.literatureService.getLiteratureByID(lend.materialID).subscribe(data => {
            this.literatures.push(data);
            if(this.lends.length==this.literatures.length) this.showList = true;
          } , error => console.log(error));
        } , error => console.log(error));
      }
    } , error => console.log(error));
  }



  createLendList(){
    this.showList = false;
    this.lends = [] ;
    this.literatures = [];
    this.users = [];
    this.lendService.getLendList().subscribe( data => {
      this.lends = data ;
      if(this.lends.length==0) alert("No Lending Records Found on Database");
      for(let lend of this.lends){
        this.userService.getUserByID(lend.userID).subscribe(data => {
          this.users.push(data);
          this.literatureService.getLiteratureByID(lend.materialID).subscribe(data => {
            this.literatures.push(data);
            if(this.lends.length==this.literatures.length) this.showList = true;
          } , error => console.log(error));
        } , error => console.log(error));
      }
    } , error => console.log(error));
    
  }


  removeFromRegister( lend:Lend , user:User , literature:Literature ){
    this.showList = false;
    if(user.utilizedQuota) user.utilizedQuota--;
    if(literature.lendedBooks) literature.lendedBooks--;
    this.userService.updateUser(user.id,user).subscribe( data => {
      console.log(data);
      this.literatureService.updateLiterature(literature.id,literature).subscribe( data => {
        console.log(data);
        this.lendService.deleteLend(lend.id).subscribe( data => {
          console.log(data);
          this.createLendList();
          this.showList = true;
        } , error => console.log(error) );
      } , error => console.log(error));
    } , error => console.log(error));
  }

  addNewLend(){
    this.router.navigate(['/lendliterature',this.p.aid]);
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
    this.router.navigate(['viewliteratures',this.p.uid]);
  }

  getAvailableBooks(l : Literature){
    return (l.totalBooks - l.lendedBooks);
  }


  goHome(){
    this.router.navigate(['member',this.p.aid]);
  }



  login(){
    if(this.p.signedin==true){
      this.p.logoff();
      this.router.navigate(['welcome']); //signing out
    }else{
      this.router.navigate(['login']); // go to login page
    }
  }


  


}
