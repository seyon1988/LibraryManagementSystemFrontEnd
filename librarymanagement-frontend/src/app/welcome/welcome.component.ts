import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import {PARAMS} from '../params'
import { UserService } from '../user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {



  user:User;
  id:number;
  rid:number;

  signedin: Boolean;
  url_identifier : String;


  constructor(
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) { 

    this.url_identifier = this.router.url.split('/')[1];
    if(this.url_identifier=="welcome"){

      PARAMS.setNavParams(0,this.user);

    }else if(this.url_identifier=="member"){
      this.rid = 0;
      this.id = this.route.snapshot.params['id'];
      console.log("Member = " + this.id)

      this.userService.getUserByID(this.id).subscribe(data => {
        this.user = data;
        if(data.id==0){
          console.log("User undefined");
          PARAMS.setNavParams(0,this.user);
          PARAMS.loginStatus = true;
        }else{
          console.log("User Defined");
          PARAMS.setNavParams(1,this.user);
          PARAMS.loginStatus = true;
        }
      } , error => console.log(error));



    }
    
  }

  ngOnInit(): void {

  }

  login(){
    if(PARAMS.loginStatus==true){
      PARAMS.loginStatus=false;
      PARAMS.setNavParams(0,this.user);
      this.router.navigate(['welcome']); //signing out
    }else{
      this.router.navigate(['login']); // go to login page
    }
  }

  test(){
    console.log("Tested");
    console.log("Tested");
  }


  viewBooks(){}
  myLoans(){}


  manageUsers(){}
  manageBooks(){}
  manageLending(){}

  getLoginIdTxt(){return PARAMS.strLoginID};
  getMyLoansTxt(){return PARAMS.strMyLoans};
  getManageUsersTxt(){return PARAMS.strManageUsers};
  getManageBoosTxt(){return PARAMS.strManageBooks};
  getManageLendingTxt(){return PARAMS.strManageLending};


}
