import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component';

const routes: Routes = [
  { path: '', component: GalleryComponent }
]

@NgModule({
  declarations: [
    GalleryComponent,
    PhotoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GalleryModule { }
