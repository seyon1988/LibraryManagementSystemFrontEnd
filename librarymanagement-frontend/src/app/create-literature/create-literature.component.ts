import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { Literature } from '../literature';
import { UserService } from '../user.service';
import { LiteratureService } from '../literature-service';

@Component({
  selector: 'app-create-literature',
  templateUrl: './create-literature.component.html',
  styleUrls: ['./create-literature.component.css']
})
export class CreateLiteratureComponent implements OnInit {

  literature : Literature = new Literature();
  admin : User = new User();
  aid : number ;


  constructor(
    private literaturerService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {
      this.literature.category = "Student"
      //This value explicitly specified because "Role" selected from change event
    }

  ngOnInit(): void {
    this.aid = this.route.snapshot.params['aid'];
    this.userService.getUserByID(this.aid).subscribe(data => {
      this.admin = data;
      PARAMS.setNavParams(1,this.admin);
      PARAMS.loginStatus = true;
    } , error => console.log(error));
  }


  selectChangeHandler (event: any) {
    this.literature.category = event.target.value;
  }
  
  saveLiterature(){
    console.log("ID = " + this.literature.id);

    this.literaturerService.createLiterature(this.literature).subscribe(data => {
      console.log(data);
      this.manageBooks(); 
    },
    error => console.log(error));
  }

  goToMyLoans(){
    
  }

  manageLending(){

  }

  viewBooks(){
    
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.aid]);
  }
  
  onSubmit(){
    this.saveLiterature();
  }


  manageUsers(){
    this.router.navigate(['/manageusers',this.aid]);
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
