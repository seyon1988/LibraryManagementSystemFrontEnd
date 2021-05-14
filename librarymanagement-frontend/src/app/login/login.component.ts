import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import {PARAMS} from '../params'
import { ModelComponent} from '../model/model.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
  p:PARAMS = new PARAMS();

  constructor(
    public matDialog: MatDialog,
    private userService:UserService,
    private router: Router) {
    this.errorNotification="Login";}

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.email==null || this.email=="" || this.pword==null || this.pword==""){
      alert("Please fill both Email & Password!");
      return;
    }
    this.userService.getUserByEmailPword(this.email,this.pword).subscribe(data => {
      this.user = data;
      if(this.user==null){
        console.log("Wrong Credintials");
        this.errorNotification = "Invalid Credintials";
        const title = "Wrong Credintials!";
        const text = "Invalid Credintials, Provided Username or Password not valid!";
        this.openModel(title,text);
      }else{
        console.log("Correct Credintials");
        this.errorNotification = "Logging In";
        console.log(this.user);
        this.router.navigate(['member',this.user.id]);
      }
    } , error => console.log(error));
    
  }

  openModel(title:String,text:String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "model-component";
    dialogConfig.height = "350px";
    dialogConfig.data = {modelTitle:title,modelText:text};
    const modelDialog = this.matDialog.open(ModelComponent, dialogConfig);
  }



  login(){
    if(this.p.signedin==true){
      this.p.logoff();
      this.router.navigate(['welcome']); //signing out
    }else{
      this.router.navigate(['login']); // go to login page
    }
  }


  manageUsers(){
    this.router.navigate(['manageusers',this.p.uid]);
  }

  goHome(){
    if(this.p.signedin){
      this.router.navigate(['member',this.p.uid]);
    }else{
      this.router.navigate(['welcome']);
    }
  }
  manageBooks(){
    this.router.navigate(['manageliteratures',this.p.uid]);
  }
  
  manageLending(){
    this.router.navigate(['managelendings',this.p.aid]);
  }

  goToMyLoans(){
    this.router.navigate(['myloans',this.p.uid]);
  }

  viewBooks(){
    if(this.p.signedin) this.router.navigate(['viewliteratures',this.p.uid]);
    else this.router.navigate(['viewliteratures_']);
  }






}
