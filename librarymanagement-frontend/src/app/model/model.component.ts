import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  modelTitle:String;
  modelText:String;

  constructor(
    public dialogRef: MatDialogRef<ModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    
    this.modelTitle = this.data.modelTitle;
    this.modelText = this.data.modelText;
  }

  ngOnInit() {
  }




  closeModel() {
    this.dialogRef.close();
  }

}