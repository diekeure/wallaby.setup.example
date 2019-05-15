import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { FileReaderError } from './filereader.service';

export const FILEREADER_SERVICE_TOKEN = new InjectionToken(
  'browser filereader service'
);

export interface FileReaderServiceInterface {
  loaded$: Observable<string | ArrayBuffer>;
  error$: Observable<FileReaderError>;

  // service methods
  isFileTypeAllowed(file: File, regex?: RegExp): boolean;
  reset(): void;

  // filereader method implementations
  abort(): void;
  readAsArrayBuffer(blob: Blob): void;
  readAsBinaryString(blob: Blob): void;
  readAsDataURL(blob: Blob): void;
  readAsText(blob: Blob, encoding?: string): void;
}
