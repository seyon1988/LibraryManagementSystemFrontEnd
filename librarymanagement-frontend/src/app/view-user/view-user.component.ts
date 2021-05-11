
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { UserService } from '../user.service';
import { LiteratureService } from '../literature-service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})


export class ViewUserComponent implements OnInit {

  user : User = new User();
  admin : User;

  uid:number;
  aid:number;

  p:PARAMS = new PARAMS();
  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router) {
      this.aid = this.route.snapshot.params['aid'];
      this.userService.getUserByID(this.aid).subscribe(data => {
        this.admin = data;
        this.p.setUserParameters(data);
      } , error => console.log(error));
    }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid'];
    this.userService.getUserByID(this.uid).subscribe(data => {
      this.user = data;
    } , error => console.log(error));


  }


  
  updateUser(aid:number , uid :number){
    this.router.navigate(['updateuser',aid,uid]);
  }

  deleteUser(uid :number){
    console.log("click");
    this.userService.deleteUser(uid). subscribe(data => {
      console.log(data);
      this.goBack();
    });
  }

  goBack(){
    this.router.navigate(['manageusers',this.aid]);
  }


  lendLiterature(uid:number){
    this.router.navigate(['lendliteratureu', this.aid, uid]);
  }
  





  viewUser(uid :number){
    this.router.navigate(['viewuser',uid]);
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


  goHome(){
    this.router.navigate(['member',this.aid]);
  }


  manageBooks(){
    this.router.navigate(['manageliteratures',this.aid]);
  }
  
  goToMyLoans(){
    
  }

  manageLending(){

  }

  viewBooks(){
    this.router.navigate(['viewliteratures',this.uid]);
  }
}
