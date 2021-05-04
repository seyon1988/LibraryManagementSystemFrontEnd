import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user : User = new User();



  constructor(private userService:UserService,
    private route:Router) {}

  ngOnInit(): void {
  
  }

  saveUser(){
    this.userService.createUser(this.user).subscribe(data => {
      console.log(data);
      this.goToUsersList(); 
    },
    error => console.log(error));
  }

  goToUsersList(){
    this.route.navigate(['/users']);
  }

  onSubmit(){
    console.log(this.user);
    this.saveUser();
  }
}
