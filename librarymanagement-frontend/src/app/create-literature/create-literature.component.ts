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

  p:PARAMS = new PARAMS();

  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {
      this.literature.category = "Student"
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
    this.literature.category = event.target.value;
  }
  
  saveLiterature(){
    console.log("ID = " + this.literature.id);

    this.literatureService.createLiterature(this.literature).subscribe(data => {
      console.log(data);
      this.manageBooks(); 
    },
    error => console.log(error));
  }


  goToMyLoans(){
    this.router.navigate(['myloans',this.aid]);
  }

  manageLending(){

  }

  viewBooks(){
    this.router.navigate(['viewliteratures',this.aid]);
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



}
