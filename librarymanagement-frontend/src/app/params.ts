import { User } from "./user";

export class PARAMS {
    static loginStatus:Boolean;

  
    static strLoginID : String = "Login";
    static strMyLoans : String = "MyLoans";
  
    static strManageUsers : String = "";
    static strManageBooks : String = "";
    static strManageLending : String = "";


    static setNavParams(ls:number,user : User){

      PARAMS.strLoginID = "Login" ;

      if(ls==0){

          PARAMS.strMyLoans = "" ;   
          PARAMS.strManageUsers = "" ;
          PARAMS.strManageBooks = "" ;
          PARAMS.strManageLending = "" ;
        }else if(ls==1){
          PARAMS.strLoginID = user.firstName+", Logout" ;
          PARAMS.strMyLoans = "MyLoans" ;
    
          if(user.role.toLowerCase()=="student"){
            PARAMS.strManageUsers = "" ;
            PARAMS.strManageBooks = "" ;
            PARAMS.strManageLending = "" ;
          }else{
            PARAMS.strManageUsers = "Manage Users" ;
            PARAMS.strManageBooks = "Manage Books" ;
            PARAMS.strManageLending = "Manage Lending" ;
          }
        }
    
      }


}
