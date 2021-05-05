import { Component, OnInit } from '@angular/core';



import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})



export class UpdateUserComponent implements OnInit {

  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router) { }


    user : User = new User();

    userRole:String;
  
    id:number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserByID(this.id).subscribe(data => {
      this.user = data;
      console.log("Data = "+data.firstName);
    } , error => console.log(error));
  }


  onSubmit(){
    this.userService.updateUser(this.id,this.user).subscribe(data => {
      this.goToUsersList();
    } , error => console.log(error));
  }
  goToUsersList(){
    this.router.navigate(['/users']);
  }
}
