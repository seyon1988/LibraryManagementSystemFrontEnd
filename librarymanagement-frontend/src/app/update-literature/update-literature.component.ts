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
      this.router.navigate(['manageliteratures',this.aid]);
    }, error => console.log(error));
  }


  goToMyLoans(){
    
  }

  manageLending(){

  }

  viewBooks(){
    this.router.navigate(['viewliteratures',this.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.aid]);
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
