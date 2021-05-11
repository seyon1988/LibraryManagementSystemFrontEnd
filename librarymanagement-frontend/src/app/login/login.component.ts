import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import {PARAMS} from '../params'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  email:String;
  pword:String;
  errorNotification:String;
  
  
  constructor(private userService:UserService,
    private router: Router) {
      console.log("Hi"); 
    this.errorNotification="Login";}

  ngOnInit(): void {
    console.log("Hi");
  }

  onSubmit(){
    this.userService.getUserByEmailPword(this.email,this.pword).subscribe(data => {
      this.user = data;
      if(this.user==null){
        console.log("Wrong Credintials");
        this.errorNotification = "Invalid Credintials";
      }else{
        console.log("Correct Credintials");
        this.errorNotification = "Logging In";
        console.log(this.user);
        this.router.navigate(['member',this.user.id]);
      }
    } , error => console.log(error));
    



  }

}
