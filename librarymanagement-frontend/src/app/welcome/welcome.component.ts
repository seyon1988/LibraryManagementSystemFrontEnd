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



  user:User = new User();
  //admin:User = new User();
  mid:number;
  logintext:String = "Login";
  



  url_identifier : String;

  aa:number=0;


  
  p:PARAMS = new PARAMS();
  constructor(
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute,) { 


    
    this.url_identifier = this.router.url.split('/')[1];
    if(this.url_identifier=="welcome"){


    }else if(this.url_identifier=="member"){
      console.log("In member");
      
      this.mid = this.route.snapshot.params['mid'];
      this.userService.getUserByID(this.mid).subscribe(data => {
        this.user = data;
        this.p.setUserParameters(data);
      } , error => console.log(error));

      

    }
    
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

  test(){
    console.log("Tested");
    console.log("Tested");
  }




  manageUsers(){
    this.router.navigate(['manageusers',this.mid]);
  }

  goHome(){
    this.router.navigate(['member',this.mid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.mid]);
  }
  
  manageLending(){

  }

  goToMyLoans(){

  }

  viewBooks(){
    
  }



}
