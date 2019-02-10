import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UploadService, UploadConfig } from 'src/app/core/upload.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {
  @Input() image: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('profileImage') profileImage: ElementRef;
  isUploading: boolean = false;
  uploadProgress: number = 0;

  constructor(private uploadService: UploadService, private userService: UserService) { }

  ngOnInit() {
    if (this.image) {
      this.setImage(this.image);
    } else {
      this.setImage('assets/avatar.svg');
    }
  }

  setImage(path: string | 'none') {
    if (path === 'none') {
      this.profileImage.nativeElement.style.backgroundImage = 'none';
    } else {
      this.profileImage.nativeElement.style.backgroundImage = `url(${path})`
    }
  }

  onFileSelected() {
    this.uploadProgress = 0; // reset in case of previous upload
    this.isUploading = true;
    this.setImage('none');
    const file = this.fileInput.nativeElement.files[0];
    const config: UploadConfig = {
      fileName: this.uploadService.makeFilename(file),
      path: '/images/avatars/',
      file: file
    };
    const uploadTask = this.uploadService.getUploadTask(config);
    this.uploadService.upload(uploadTask).subscribe(progress => {
      this.uploadProgress = progress;
    }, err => {
      console.log(err);
    }, () => {
      this.setNewImage(uploadTask);
    });

  }

  async setNewImage(uploadTask) {
    try {
      const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
      this.setImage(downloadUrl);
      this.isUploading = false;
      await this.userService.updateUser({ avatar: downloadUrl });
    } catch(err) {
      console.log('ProfileImageComponent#setNewImage:', err);
    }
  }

}
