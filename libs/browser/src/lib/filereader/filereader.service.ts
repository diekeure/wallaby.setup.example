import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileReaderServiceInterface } from './filereader.service.interface';

export const FILE_READER = new InjectionToken<FileReader>('FileReaderToken', {
  providedIn: 'root',
  factory: () => new FileReader()
});

export enum FileReaderError {
  INVALID_FILETYPE = 'invalid filetype',
  READ_ERROR = 'invalid file'
}

@Injectable({
  providedIn: 'root'
})
export class FileReaderService implements FileReaderServiceInterface {
  loaded$ = new BehaviorSubject<string | ArrayBuffer>(null);
  error$ = new BehaviorSubject<FileReaderError>(null);

  constructor(@Inject(FILE_READER) private fileReader: FileReader) {
    this.setEventHandlers();
  }

  // service methods
  isFileTypeAllowed(
    file: File,
    regex: RegExp = /\.(jpe?g|png|gif)$/i
  ): boolean {
    if (!file || !regex.test(file.name)) {
      this.error$.next(FileReaderError.INVALID_FILETYPE);
      return false;
    }
    return true;
  }

  reset(): void {
    this.fileReader.abort();
    this.loaded$.next(null);
    this.error$.next(null);
  }

  // filereader method implementations
  abort() {
    this.fileReader.abort();
  }
  readAsArrayBuffer(blob: Blob): void {
    this.fileReader.readAsArrayBuffer(blob);
  }
  readAsBinaryString(blob: Blob): void {
    this.fileReader.readAsBinaryString(blob);
  }
  readAsDataURL(blob: Blob): void {
    this.fileReader.readAsDataURL(blob);
  }
  readAsText(blob: Blob, encoding?: string): void {
    this.fileReader.readAsText(blob, encoding);
  }

  private setEventHandlers() {
    this.fileReader.onload = this.onload;
    this.fileReader.onabort = this.onabort;
    this.fileReader.onerror = this.onerror;
    this.fileReader.onloadstart = this.onloadstart;
  }

  // event handlers
  // use arrow functions to maintain 'this' scope, because FileReader applies his own scope
  private onabort = (ev: ProgressEvent): void => {
    this.error$.next(FileReaderError.READ_ERROR);
  };
  private onerror = (ev: ProgressEvent): void => {
    this.fileReader.abort();
  };
  private onload = (ev: ProgressEvent): void => {
    this.loaded$.next((ev.target as FileReader).result);
  };
  private onloadstart = (ev: ProgressEvent): void => {
    this.loaded$.next(null);
  };
}
