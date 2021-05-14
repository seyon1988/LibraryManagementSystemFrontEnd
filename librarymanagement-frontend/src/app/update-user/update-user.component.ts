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





  p:PARAMS = new PARAMS();
  
  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router) {



      this.userService.getUserByID(this.route.snapshot.params['uid']).subscribe(data => {
        this.p.setUserHandled(data);
      } , error => console.log(error));


      this.userService.getUserByID(this.route.snapshot.params['aid']).subscribe(data => {
        this.p.setUserParameters(data);
      } , error => console.log(error));


     }





  ngOnInit(): void {

  }


  onSubmit(){
    this.userService.updateUser(this.p.userHandled.id,this.p.userHandled).subscribe(data => {
      this.router.navigate(['manageusers',this.p.aid]);
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

  goHome(){
    this.router.navigate(['member',this.p.aid]);
  }

  goToMyLoans(){
    this.router.navigate(['myloans',this.p.aid]);
  }

  manageLending(){
    this.router.navigate(['managelendings',this.p.aid]);
  }

  viewBooks(){
    this.router.navigate(['viewliteratures',this.p.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.p.aid]);
  }





}
