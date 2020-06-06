import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-photo-create',
  templateUrl: './photo-create.component.html',
  styleUrls: ['./photo-create.component.css'],
  providers: [PhotoService]
})
export class PhotoCreateComponent implements OnInit {
  thumbnail: string = '';
  isLoading = false;
  photoForm: FormGroup;

  constructor(
    public photoService: PhotoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('_id');
    if (_id) {
      console.log('Edit photo');
      this.photoService.getPhoto(_id)
        .subscribe(
          res => {
            this.photoForm.patchValue({
              title: res.title,
              description: res.description,
              _id: res._id
            });
            this.thumbnail = res.imageURL;
          }
        );
    } else {
      console.log('Create photo');
    }
    this.photoForm = this.fb.group({
      _id: [''],
      title: [''],
      description: [''],
      imageURL: ['']
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photoForm.get('imageURL').setValue(file);
      //Show image preview
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.thumbnail = event.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  addPhoto() {
    const fd = new FormData();
    fd.append('title', this.photoForm.get('title').value);
    fd.append('description', this.photoForm.get('description').value);
    fd.append('imageURL', this.photoForm.get('imageURL').value);
    const _id = this.photoForm.get('_id').value;
    if (_id) {
      this.isLoading = true;
      this.photoService.putPhoto(fd, _id)
        .subscribe(res => {
          this.isLoading = false;
          this.resetForm();
          M.toast({ html: 'Update successfully!', classes: 'rounded' });
          this.router.navigate(['/photos']);
        });
    } else {
      this.isLoading = true;
      this.photoService.postPhoto(fd)
        .subscribe(
          res => {
            this.isLoading = false;
            this.resetForm();
            M.toast({ html: 'Saved successfully!', classes: 'rounded' });
            this.router.navigate(['/photos']);
          }
        );
    }
  }

  cancel() {
    this.resetForm();
    this.router.navigate(['/photos']);
  }

  resetForm() {
    this.thumbnail = '';
    this.photoForm.reset();
  }

}//End class
