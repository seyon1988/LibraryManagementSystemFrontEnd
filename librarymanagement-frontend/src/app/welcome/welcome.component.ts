import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import {PARAMS} from '../params'
import { UserService } from '../user.service';
import { LiteratureService } from '../literature-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  
  url_identifier : String;



  
  p:PARAMS = new PARAMS();
  constructor(
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute,) { 


    
    this.url_identifier = this.router.url.split('/')[1];
    if(this.url_identifier=="welcome"){


    }else if(this.url_identifier=="member"){
      this.userService.getUserByID(this.route.snapshot.params['mid']).subscribe(data => {
        this.p.setUserParameters(data);
      } , error => console.log(error));

      

    }
    
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

  test(){
    console.log("Tested");
    console.log("Tested");
  }




  manageUsers(){
    this.router.navigate(['manageusers',this.p.uid]);
  }

  goHome(){
    this.router.navigate(['member',this.p.uid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.p.uid]);
  }
  
  manageLending(){

  }

  goToMyLoans(){
    this.router.navigate(['myloans',this.p.uid]);
  }

  viewBooks(){
    if(this.p.signedin) this.router.navigate(['viewliteratures',this.p.uid]);
    else this.router.navigate(['viewliteratures_']);
  }



}
