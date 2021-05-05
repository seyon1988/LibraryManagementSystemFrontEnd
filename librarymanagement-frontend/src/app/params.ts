import { User } from "./user";

export class PARAMS {
    static loginStatus:Boolean;

  
    static strLoginID : String = "Login";
    static strMyLoans : String = "MyLoans";
  
    static strAddUser : String = "";
    static strManageUsers : String = "";
    static strAddBooks : String = "";
    static strManageBooks : String = "";
    static strLendBook : String = "";
    static strManageLending : String = "";


    static setNavParams(ls:number,user : User){
      console.log("From params");
      PARAMS.strLoginID = "Login" ;

      if(ls==0){

          PARAMS.strMyLoans = "" ;   
          PARAMS.strAddUser = "" ;
          PARAMS.strManageUsers = "" ;
          PARAMS.strAddBooks = "" ;
          PARAMS.strManageBooks = "" ;
          PARAMS.strLendBook = "" ;
          PARAMS.strManageLending = "" ;
        }else if(ls==1){
          console.log("From params ls==1");
          PARAMS.strLoginID = user.firstName+" ,Logout" ;
          PARAMS.strMyLoans = "MyLoans" ;
    
          if(user.role.toLowerCase()=="student"){
            
            PARAMS.strAddUser = "" ;
            PARAMS.strManageUsers = "" ;
            PARAMS.strAddBooks = "" ;
            PARAMS.strManageBooks = "" ;
            PARAMS.strLendBook = "" ;
            PARAMS.strManageLending = "" ;
          }else{
    
            
            console.log("From params library");
            PARAMS.strAddUser = "Add User" ;
            PARAMS.strManageUsers = "Manage Users" ;
            PARAMS.strAddBooks = "Add Books" ;
            PARAMS.strManageBooks = "Manage Books" ;
            PARAMS.strLendBook = "Lend Book" ;
            PARAMS.strManageLending = "Manage Lending" ;
          }
        }
    
      }


}
