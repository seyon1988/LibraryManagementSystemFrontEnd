import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../user"
import { UserService } from "../user.service"
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[];

  constructor(private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {

    this.getUsers();
  }

  private getUsers(){
    console.log("test\ntest");
    this.userService.getUserList(). subscribe(data => {
      this.users = data;
    });
  }

  updateUser(id :number){
    this.router.navigate(['updateuser',id]);
  }

  deleteUser(id :number){
    this.userService.deleteUser(id). subscribe(data => {
      console.log(data);
      this.getUsers();
    });
  }

  viewUser(id :number){
    this.router.navigate(['viewuser',id]);
  }
}
