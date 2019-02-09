import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmEmailChangeComponent } from './confirm-email-change/confirm-email-change.component';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  @Input() oldEmail: string;
  @Output() newEmail = new EventEmitter<{ newEmail: string, password: string } | null>();
  confirmEmailChangeDialogRef: MatDialogRef<ConfirmEmailChangeComponent>;

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.openDialog(form.value);
  }

  onCancel() {
    this.newEmail.emit(null);
  }

  openDialog(submittedValues) {
    this.confirmEmailChangeDialogRef = this.matDialog.open(ConfirmEmailChangeComponent, {
      data: {
        newEmail: submittedValues.newEmail
      }
    });

    this.confirmEmailChangeDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newEmail.emit(submittedValues);
      } else {
        this.onCancel();
      }
    });
  }

}