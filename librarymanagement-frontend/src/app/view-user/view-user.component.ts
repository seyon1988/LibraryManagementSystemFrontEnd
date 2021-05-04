import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  user : User = new User();

  id:number;


  constructor(private userService:UserService,
    private router:ActivatedRoute,
    private route:Router) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.userService.getUserByID(this.id).subscribe(data => {
      this.user = data;
      console.log(data);
    } , error => console.log(error));
  }

  updateUser(id :number){
    console.log("click");
    this.route.navigate(['updateuser',id]);
  }

  deleteUser(id :number){
    console.log("click");
    this.userService.deleteUser(id). subscribe(data => {
      console.log(data);
      this.goBack();
    });
  }

  goBack(){
    console.log("click");
    this.route.navigate(['users']);
  }



}
