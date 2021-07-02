import { Component, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Photos, S3ServiceService } from '../services/s3-service.service';
import { base64StringToBlob } from 'blob-util';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  photos$: Observable<Photos[]>;
  private readonly isDestroyed$ = new Subject<boolean>();
  constructor(private readonly s3Service: S3ServiceService) {
    this.photos$ = timer(1500).pipe(
      switchMap(() => {
        return this.s3Service.fetchPhotos$()
      })
    );
  }

  ngOnInit(): void {

  }

  trackFn(index: number, item: Photos): number {
    return index;
  }

  fileDropped(event: File): void {
    const formData = new FormData();
    formData.append('file', event);
    this.s3Service
      .postPhotos$(formData)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(img => {
        console.log(img);
      })
    // try {
    //   const b64 = await this.changeFile(event);
    //   const blob = this.b64toBlob(b64, event);
    //   console.log(blob);

    //   // console.log(base64StringToBlob(b64));
    //   this.s3Service
    //     .postPhotos$(blob)
    //     .pipe(takeUntil(this.isDestroyed$))
    //     .subscribe(img => {
    //       console.log(img);
    //     })
    // }
    // catch (err) {
    //   console.log(err);
    // }

  }
  private b64toBlob(b64: string, file: File): Blob {

    var byteString = atob(b64.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: file.type });
  }

  private changeFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

}
