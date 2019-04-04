import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/api/api.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { safeUnsubscribe } from 'src/app/util/util';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit, OnDestroy {

  subOrder: Subscription;

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

    safeUnsubscribe(this.subOrder);
    this.subOrder = this.apiService.getOrder(this.teamName).subscribe(val => {
      this.order = val;

      this.left = [];
      this.right = [];

      let counter = 0;
      this.order.forEach(element => {
        if (counter % 2 === 0) {
          this.left.push(element);
        } else {
          this.right.push(element);
        }
        counter += 1;
      });

    });
  }

  ngOnDestroy() {
    safeUnsubscribe(this.subOrder);
  }

}
