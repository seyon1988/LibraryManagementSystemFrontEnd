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
  selector: 'app-myloans',
  templateUrl: './myloans.component.html',
  styleUrls: ['./myloans.component.css']
})
export class MyloansComponent implements OnInit {



  lends:Lend[];

  literatures:Literature[] = [];

  arrearsCount1:String;
  arrearsCount2:String;
  arrearsText:String;


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
      this.userService.getUserByID(this.route.snapshot.params['mid']).subscribe(data => {
        this.p.setUserParameters(data);
        this.lendService.getLendByUserID(this.p.user.id).subscribe(data => {
          this.lends = data;
          this.getBooksDetails();
        } , error => console.log(error));
      } , error => console.log(error));
    }

  ngOnInit(): void {
  }


  login(){
    if(this.p.signedin==true){
      this.p.logoff();
      this.router.navigate(['welcome']); //signing out
    }else{
      this.router.navigate(['login']); // go to login page
    }
  }

  getBooksDetails(){
    for(let lend of this.lends){
      this.literatureService.getLiteratureByID(lend.materialID).subscribe(data => {
        this.literatures.push(data);
        console.log(data);
      } , error => console.log(error));
    }
    if(this.lends.length==0){
      this.arrearsText = "Currently, You dont have any arrears!";
    }else if(this.lends.length==1){
      this.arrearsText = "You have Borrowed Following Book";
    }else if(this.lends.length>=2){
      this.arrearsText = "You have Borrowed "+(this.lends.length)+" Books , Details Below";
    }
    this.arrearsCount1 = "Total Book Quota : " + this.p.user.bookQuota + " Books ";
    this.arrearsCount2 = "Borrowed Books : " + (this.p.user.utilizedQuota) ;
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



  goHome(){
    this.router.navigate(['member',this.p.aid]);
  }





}
