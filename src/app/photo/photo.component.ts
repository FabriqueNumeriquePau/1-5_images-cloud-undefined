import { Component, Input, OnInit } from '@angular/core';
import { Photos } from '../services/s3-service.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  @Input() photo!: Photos;
  constructor() { }

  ngOnInit(): void {
  }

}
