import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { Literature } from '../literature';
import { UserService } from '../user.service';
import { LiteratureService } from '../literature-service';


@Component({
  selector: 'app-view-literature',
  templateUrl: './view-literature.component.html',
  styleUrls: ['./view-literature.component.css']
})
export class ViewLiteratureComponent implements OnInit {




  p:PARAMS = new PARAMS();


  lid:number;



  enLend:boolean = false;
  enEditDelete:boolean = false ;
  url_identifier : String;

  literature : Literature = new Literature();

  constructor(
    private literatureService:LiteratureService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) { 
      this.url_identifier = this.router.url.split('/')[1];

      this.lid =this.route.snapshot.params['lid'];
      this.literatureService.getLiteratureByID(this.lid).subscribe(data => {

        this.literature = data;
        
        if(this.url_identifier=="viewliterature_"){this.p.logoff();}
        else{
          this.userService.getUserByID(this.route.snapshot.params['uid']).subscribe(data => {
            this.p.setUserParameters(data);
            if(this.url_identifier=="viewliterature"){
              if(this.p.isAdmin) this.enLend = true;
            }else if(this.url_identifier=="viewliteraturem"){
              this.enLend = true;
              this.enEditDelete = true;
            }
          } , error => console.log(error));
        }
      } , error => console.log(error));
      
            

  }

  ngOnInit(): void {
  }

  goBack(){
    if(this.url_identifier=="viewliteraturem")this.router.navigate(['manageliteratures',this.p.aid]);
    else if(this.url_identifier=="viewliterature")this.router.navigate(['viewliteratures',this.p.uid]);
    else if(this.url_identifier=="viewliterature_")this.router.navigate(['viewliteratures_']);
  }

  deleteLiterature(){
    this.literatureService.deleteLiterature(this.lid). subscribe(data => {
      this.router.navigate(['manageliteratures',this.p.aid]);
    });
  }

  updateLiterature(){
    this.router.navigate(['updateliterature',this.p.aid,this.lid]);
  }


  login(){
    if(this.p.signedin==true){
      this.p.logoff();
      this.router.navigate(['welcome']); //signing out
    }else{
      this.router.navigate(['login']); // go to login page
    }
  }


  lendLiterature(){
    this.router.navigate(['lendliteraturelv', this.p.aid, this.lid]);
  }

  manageUsers(){
    this.router.navigate(['/manageusers',this.p.aid]);
  }

  manageBooks(){
    this.router.navigate(['manageliteratures',this.p.aid]);
  }
  
  goToMyLoans(){
    this.router.navigate(['myloans',this.p.uid]);
  }
  
  manageLending(){
    this.router.navigate(['managelendings',this.p.aid]);
  }

  viewBooks(){
    if(this.p.signedin) this.router.navigate(['viewliteratures',this.p.uid]);
    else this.router.navigate(['viewliteratures']);
  }



  goHome(){
    if(this.p.signedin==true) this.router.navigate(['member',this.p.uid]);
    else this.router.navigate(['welcome']);
  }

  createUser(){
    this.router.navigate(['createuser' , this.p.aid]);
  }

  getAvailableBooks(l : Literature){
    return (l.totalBooks - l.lendedBooks);
  }



}
