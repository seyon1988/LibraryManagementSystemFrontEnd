import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS } from '../params';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


  user : User = new User();
  admin : User;
  aid : number ;


  constructor(
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {
      this.user.role = "Student"
      //This value explicitly specified because "Role" selected from change event
    }

  ngOnInit(): void {
    this.aid = this.route.snapshot.params['aid'];
    this.userService.getUserByID(this.aid).subscribe(data => {
      this.admin = data;
      PARAMS.setNavParams(1,this.admin);
      PARAMS.loginStatus = true;
    } , error => console.log(error));
  }

  selectChangeHandler (event: any) {
    this.user.role = event.target.value;
  }
  saveUser(){
    this.userService.createUser(this.user).subscribe(data => {
      console.log(data);
      this.goToUsersList(); 
    },
    error => console.log(error));
  }

  goToUsersList(){
    this.router.navigate(['/manageusers',this.aid]);
  }

  onSubmit(){
    this.saveUser();
  }
}
