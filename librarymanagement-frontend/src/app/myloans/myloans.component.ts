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
  selector: 'app-myloans',
  templateUrl: './myloans.component.html',
  styleUrls: ['./myloans.component.css']
})
export class MyloansComponent implements OnInit {

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

      this.uid = this.route.snapshot.params['uid'];
      this.userService.getUserByID(this.uid).subscribe(data => {
        this.admin = data;
        this.p.setUserParameters(data);
      } , error => console.log(error));
      if(this.p.isAdmin) this.admin = this.p.admin;
    }

  ngOnInit(): void {
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





}
