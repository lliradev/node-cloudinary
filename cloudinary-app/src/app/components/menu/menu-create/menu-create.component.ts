import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
declare var M: any;

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css'],
  providers: [MenuService]
})
export class MenuCreateComponent implements OnInit {
  thumbnail: string = '';
  isLoading = false;
  menuForm: FormGroup

  constructor(
    public menuService: MenuService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title) {
    titleService.setTitle('Nueva imagen');
  }

  ngOnInit() {
    setTimeout(() => {
      const select = document.querySelectorAll('select');
      M.FormSelect.init(select, {});
    }, 100);

    const _id = this.route.snapshot.paramMap.get('_id');
    if (_id) {
      console.log('Edit Menu');
      this.menuService.getMenu(_id).subscribe(res => {
        this.menuForm.patchValue({
          type: res.type,
          name: res.name,
          description: res.description,
          price: res.price,
          _id: res._id
        });
        this.thumbnail = res.image;
      });
    } else {
      console.log('Create menu');
    }
    this.menuForm = this.fb.group({
      _id: [''],
      type: [''],
      name: [''],
      description: [''],
      price: [0],
      image: ['']
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.menuForm.get('image').setValue(file);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.thumbnail = event.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  onAddMenu() {
    const fd = new FormData();
    fd.append('type', this.menuForm.get('type').value);
    fd.append('name', this.menuForm.get('name').value);
    fd.append('description', this.menuForm.get('description').value);
    fd.append('price', this.menuForm.get('price').value);
    fd.append('image', this.menuForm.get('image').value);
    const _id = this.menuForm.get('_id').value;

    if (_id) {
      this.isLoading = true;
      this.menuService.putMenu(fd, _id).subscribe(res => {
        this.isLoading = false;
        this.menuForm.reset();
        M.toast({ html: 'Actualizado exitosamente', classes: 'green' });
        this.router.navigate(['/menus']);
      });
    } else {
      this.isLoading = true;
      this.menuService.postMenu(fd).subscribe(res => {
        this.isLoading = false;
        this.menuForm.reset();
        M.toast({ html: 'Guardado exitosamente', classes: 'green' });
        this.router.navigate(['/menus']);
      }, err => {
        this.isLoading = false;
        M.toast({
          html: err.error.message,
          classes: 'red'
        });
      });
    }
  }

  onCancel() {
    this.thumbnail = '';
    this.menuForm.reset();
    this.router.navigate(['/menus']);
  }

}
