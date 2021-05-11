import { ActivatedRoute, Router } from "@angular/router";
import { User } from "./user";
import { UserService } from "./user.service";
import { Literature } from './literature';
import { LiteratureService } from './literature-service';
import { waitForAsync } from "@angular/core/testing";

export class PARAMS {

  public signedin:boolean = false;
  public isAdmin:boolean = false;
  public user:User = new User();
  public admin:User = new User();
  
  loginText:String = "Login";



  constructor(){}


    public setUserParameters(user:User){
      this.signedin= true;
      this.user = user;
      if(this.user.role.toLowerCase()=="librarian"){
        this.isAdmin = true;
        this.admin = user;
      }
      this.loginText = this.user.firstName + ", Logout";
    }

    public logoff(){
      this.signedin= false;
      this.isAdmin = false;
      this.user = new User();
      this.admin = new User();
      this.loginText = "Login";
    }

}
