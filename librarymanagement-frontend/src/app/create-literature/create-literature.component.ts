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


  p:PARAMS = new PARAMS();

  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {
      this.literature.category = "Student"
      //This value explicitly specified because "Role" selected from change event
      this.userService.getUserByID(this.route.snapshot.params['aid']).subscribe(data => {
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
    this.router.navigate(['myloans',this.p.aid]);
  }

  manageLending(){

  }

  viewBooks(){
    this.router.navigate(['viewliteratures',this.p.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.p.aid]);
  }
  
  onSubmit(){
    this.saveLiterature();
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



}
