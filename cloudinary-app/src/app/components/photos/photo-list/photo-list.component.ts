import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo';
declare var M: any;

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
  providers: [PhotoService]
})
export class PhotoListComponent implements OnInit {
  isLoading = false;

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getPhotos();
    this.isLoading = false;
  }

  getPhotos() {
    this.isLoading = true;
    this.photoService.getPhotos()
      .subscribe(res => {
        this.isLoading = false;
        this.photoService.photos = res as Photo[];
        console.log(res);
      });
  }

  deletePhoto(_id: string) {
    if (confirm('Are you sure want to delete it?')) {
      this.isLoading = true;
      this.photoService.deletePhoto(_id)
        .subscribe(res => {
          this.isLoading = false;
          this.getPhotos();
          M.toast({ html: 'Deleted successfully!', classes: 'rounded' });
        });
    }
  }

}
