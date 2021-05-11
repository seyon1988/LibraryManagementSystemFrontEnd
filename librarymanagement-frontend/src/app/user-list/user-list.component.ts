import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from "../user"
import { UserService } from "../user.service"
import { LiteratureService } from '../literature-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  admin:User;
  users:User[];
  aid:number;
  p:PARAMS = new PARAMS();
  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) { 
      this.aid = this.route.snapshot.params['aid'];
      this.userService.getUserByID(this.aid).subscribe(data => {
        this.admin = data;
        this.p.setUserParameters(data);
      } , error => console.log(error));
    }

  ngOnInit(): void {

    this.getUsers();
  }

  private getUsers(){
    this.userService.getUserList(). subscribe(data => {
      this.users = data.sort((a,b)=> a.id-b.id);
    });
  }

  updateUser(uid :number){
    this.router.navigate(['updateuser',this.aid,uid]);
  }

  deleteUser(uid :number){
    this.userService.deleteUser(uid). subscribe(data => {
      console.log(data);
      this.getUsers();
    });
  }

  viewUser(uid :number ){
    this.router.navigate(['viewuser' , this.aid , uid]);
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

  manageUsers(){
    this.router.navigate(['/manageusers',this.aid]);
  }

  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  createUser(){
    this.router.navigate(['createuser' , this.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.aid]);
  }

  goToMyLoans(){

  }

  manageLending(){

  }
  
  lendLiterature(uid:number){
    this.router.navigate(['lendliteratureu', this.aid, uid]);
  }
  

  viewBooks(){
    
  }


}
