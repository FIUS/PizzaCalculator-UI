import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  order;
  teamName: string;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<OrderViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.teamName = data.teamName;
  }

  ngOnInit() {

    this.apiService.getOrder(this.teamName).subscribe(val => {
      this.order = val;
    });
  }

}
