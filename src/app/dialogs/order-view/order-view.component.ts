import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/api/api.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  order;
  teamName: string;
  right = [];
  left = [];

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<OrderViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.teamName = data.teamName;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer === event.container, event.previousContainer, event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnInit() {

    this.apiService.getOrder(this.teamName).subscribe(val => {
      this.order = val;

      let counter = 0;
      val.forEach(element => {
        if (counter % 2 === 0) {
          this.left.push(element);
        } else {
          this.right.push(element);
        }
        counter += 1;
      });

    });
  }

}
