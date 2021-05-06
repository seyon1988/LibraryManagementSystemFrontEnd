import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { Literature } from '../literature';
import { UserService } from '../user.service';
import { LiteratureService } from '../literature-service';

@Component({
  selector: 'app-update-literature',
  templateUrl: './update-literature.component.html',
  styleUrls: ['./update-literature.component.css']
})
export class UpdateLiteratureComponent implements OnInit {

  literature : Literature = new Literature();

  admin : User = new User();

  aid : number ;
  lid:number;




  constructor(
    private literaturerService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {

      this.aid = this.route.snapshot.params['aid'];
      this.userService.getUserByID(this.aid).subscribe(data => {
        this.admin = data;
        PARAMS.setNavParams(1,this.admin);
        PARAMS.loginStatus = true;
  
      } , error => console.log(error));

      this.lid =this.route.snapshot.params['lid'];
      
      this.literaturerService.getLiteratureByID(this.lid).subscribe(data =>{
        this.literature = data;
      } , error => console.log(error) );


    }

    selectChangeHandler (event: any) {
      this.literature.category = event.target.value;
    }
    


  ngOnInit(): void {
  }


  onSubmit(){
    this.literaturerService.updateLiterature(this.lid,this.literature).subscribe( data => {
      this.router.navigate(['manageliteratures',this.aid]);
    }, error => console.log(error));
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
