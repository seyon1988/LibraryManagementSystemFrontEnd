import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loginstatus : String;
  myaccount : String;
  constructor() { this.loginstatus = "Login" , this.myaccount="  " }

  ngOnInit(): void {
  }

}
