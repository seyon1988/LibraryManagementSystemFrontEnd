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


  lid:number;



  p:PARAMS = new PARAMS();
  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {


      this.userService.getUserByID(this.route.snapshot.params['aid']).subscribe(data => {
        this.p.setUserParameters(data);
      } , error => console.log(error));

      this.lid =this.route.snapshot.params['lid'];
      this.literatureService.getLiteratureByID(this.lid).subscribe(data =>{
        this.literature = data;
      } , error => console.log(error) );


    }

    selectChangeHandler (event: any) {
      this.literature.category = event.target.value;
    }
    


  ngOnInit(): void {
  }


  onSubmit(){
    this.literatureService.updateLiterature(this.lid,this.literature).subscribe( data => {
      this.router.navigate(['manageliteratures',this.p.aid]);
    }, error => console.log(error));
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
  



  manageUsers(){
    this.router.navigate(['/manageusers',this.p.aid]);
  }


  login(){
    if(this.p.signedin){
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
