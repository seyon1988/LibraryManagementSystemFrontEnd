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


  user : User = new User();
  admin : User;
  aid : number ;

  p:PARAMS = new PARAMS();
  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {
      this.user.role = "Student"
      //This value explicitly specified because "Role" selected from change event
      this.aid = this.route.snapshot.params['aid'];
      this.userService.getUserByID(this.aid).subscribe(data => {
        this.admin = data;
        this.p.setUserParameters(data);
      } , error => console.log(error));
  }

  ngOnInit(): void {

  }

  selectChangeHandler (event: any) {
    this.user.role = event.target.value;
  }
  saveUser(){
    this.userService.createUser(this.user).subscribe(data => {
      console.log(data);
      this.goToUsersList(); 
    },
    error => console.log(error));
  }

  goToUsersList(){
    this.router.navigate(['/manageusers',this.aid]);
  }

  onSubmit(){
    this.saveUser();
  }


  manageUsers(){
    this.router.navigate(['/manageusers',this.aid]);
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

  goToMyLoans(){
    
  }
  
  manageLending(){

  }

  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  viewBooks(){

  }
  



}
