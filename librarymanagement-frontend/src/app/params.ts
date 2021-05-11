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
  public userHandled:User = new User();
  
  
  loginText:String = "Login";

  uid:number;
  aid:number;
  lid:number;
  uhid:number;


  constructor(){}


    public setUserParameters(user:User){
      this.signedin= true;
      this.user = user;
      this.uid = user.id
      if(this.user.role.toLowerCase()=="librarian"){
        this.isAdmin = true;
        this.admin = user;
        this.aid = this.user.id;
      }
      this.loginText = this.user.firstName + ", Logout";
    }

    public setUserHandled(usrH:User){
      this.uhid = usrH.id;
      this.userHandled = usrH;
    }

    public logoff(){
      this.signedin= false;
      this.isAdmin = false;
      this.user = new User();
      this.admin = new User();
      this.loginText = "Login";
    }

}
