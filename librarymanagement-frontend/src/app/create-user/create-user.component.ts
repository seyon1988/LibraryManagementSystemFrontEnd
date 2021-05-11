import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { UserService } from '../user.service';
import { LiteratureService } from '../literature-service';


@Component({
  
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {




  p:PARAMS = new PARAMS();

  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {
      this.p.userHandled.role = "Student"
      //This value explicitly specified because "Role" selected from change event
      this.userService.getUserByID(this.route.snapshot.params['aid']).subscribe(data => {
        this.p.setUserParameters(data);
      } , error => console.log(error));
  }

  ngOnInit(): void {

  }

  selectChangeHandler (event: any) {
    this.p.userHandled.role = event.target.value;
  }
  saveUser(){
    this.userService.createUser(this.p.userHandled).subscribe(data => {
      console.log(data);
      this.goToUsersList(); 
    },
    error => console.log(error));
  }

  goToUsersList(){
    this.router.navigate(['/manageusers',this.p.aid]);
  }

  onSubmit(){
    this.saveUser();
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

  }

  goHome(){
    this.router.navigate(['member',this.p.aid]);
  }

  viewBooks(){
    this.router.navigate(['viewliteratures',this.p.aid]);
  }
  



}
