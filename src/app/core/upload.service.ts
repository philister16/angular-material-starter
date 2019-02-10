import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

/**
 * Describes the configuration object for an upload
 */
export interface UploadConfig {
  fileName: string,
  path: string,
  file: any,
  options?: object | null
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private afStorage: AngularFireStorage) { }

  /**
   * Takes an upload task object and uploads to firestorage
   * @param uploadTask An upload task which is the result of .getUploadTask() method
   * @returns Observable with the percentage of the upload done
   */
  upload(uploadTask): Observable<number> {
    const progress = Observable.create(observer => {
      let progress = 0;
      uploadTask.on('state_changed', snapshot => {
        progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
        observer.next(progress);
      }, err => {
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
    return progress;
  }

  /**
   * Takes a file and returns a HEX string named filename incl. extension
   * @param file File from JS file API (input[type=file])
   */
  makeFilename(file) {
    const id = this.genImageId();
    const ext = this.getFileExt(file);
    return id + ext;
  }

  /**
   * An upload task object which holds information such as the download URL after upload
   * @param uploadConfig Configuration for the upload to execute
   */
  getUploadTask(uploadConfig: UploadConfig) {
    return this.getStorageRef(uploadConfig.path + uploadConfig.fileName).put(uploadConfig.file, uploadConfig.options);
  }

  private getStorageRef(path: string) {
    return this.afStorage.storage.ref().child(path);
  }

  private genImageId() {
    let id = Date.now().toString(16);
    if (id.length % 2) {
      id = '0' + id;
    }
    return id;
  }

  private getFileExt(file) {
    const type = file.type;
    const ext = type.split('/')[1];
    return '.' + ext;
  }

}
