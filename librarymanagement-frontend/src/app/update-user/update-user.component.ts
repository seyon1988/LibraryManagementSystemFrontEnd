import { Component, OnInit } from '@angular/core';



import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { UserService } from '../user.service';

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
        PARAMS.setNavParams(1,this.admin);
        PARAMS.loginStatus = true;
  
      } , error => console.log(error));

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

  deleteUser(uid :number){
    console.log("click");
    this.userService.deleteUser(uid). subscribe(data => {
      console.log(data);
      this.goBack();
    });
  }

  goBack(){
    console.log("click");
    this.router.navigate(['users']);
  }

  manageUsers(){
    this.router.navigate(['/manageusers',this.aid]);
  }






  viewUser(uid :number){
    this.router.navigate(['viewuser',uid]);
  }


  login(){
    PARAMS.loginStatus=false;
    PARAMS.setNavParams(0,this.admin);
    this.router.navigate(['welcome']); //signing out
  }


  goHome(){
    this.router.navigate(['member',this.aid]);
  }

  getLoginIdTxt(){return PARAMS.strLoginID};
  getMyLoansTxt(){return PARAMS.strMyLoans};
  getManageUsersTxt(){return PARAMS.strManageUsers};
  getManageBoosTxt(){return PARAMS.strManageBooks};
  getManageLendingTxt(){return PARAMS.strManageLending};





}
