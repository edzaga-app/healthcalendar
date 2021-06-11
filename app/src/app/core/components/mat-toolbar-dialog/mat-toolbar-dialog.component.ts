import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mat-toolbar-dialog',
  templateUrl: './mat-toolbar-dialog.component.html',
  styleUrls: ['./mat-toolbar-dialog.component.scss']
})
export class MatToolbarDialogComponent implements OnInit {

  @Input()
  title: string = '';

  constructor() { }

  ngOnInit() {
  }

}
