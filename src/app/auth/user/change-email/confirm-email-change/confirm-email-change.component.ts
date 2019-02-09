import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-email-change',
  templateUrl: './confirm-email-change.component.html',
  styleUrls: ['./confirm-email-change.component.scss']
})
export class ConfirmEmailChangeComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmEmailChangeComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

}
