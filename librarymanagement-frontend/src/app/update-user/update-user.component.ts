import { Component, OnInit } from '@angular/core';



import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { UserService } from '../user.service';
import { LiteratureService } from '../literature-service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})



export class UpdateUserComponent implements OnInit  {

  user : User = new User();
  admin : User ;
  userRole:String;

  uid:number;
  aid:number;

  p:PARAMS = new PARAMS();
  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router) {


      this.uid = this.route.snapshot.params['uid'];
      this.userService.getUserByID(this.uid).subscribe(data => {
        this.user = data;
        console.log(data);
      } , error => console.log(error));

      this.aid = this.route.snapshot.params['aid'];
      this.userService.getUserByID(this.aid).subscribe(data => {
        this.admin = data;
        this.p.setUserParameters(data);
      } , error => console.log(error));


     }



  selectChangeHandler (event: any) {
    this.user.role = event.target.value;
  }
  

  ngOnInit(): void {

  }


  onSubmit(){
    this.userService.updateUser(this.uid,this.user).subscribe(data => {
      this.router.navigate(['manageusers',this.aid]);
    } , error => console.log(error));
  }


  updateUser(uid :number){
    this.router.navigate(['updateuser',uid]);
  }


  goBack(){
    console.log("click");
    this.router.navigate(['users']);
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

  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  goToMyLoans(){
    
  }

  manageLending(){
    console.log("l");
  }

  viewBooks(){
    
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.aid]);
  }





}
