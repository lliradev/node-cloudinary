import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/menu';
import { Title } from '@angular/platform-browser';
declare var M: any;

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  providers: [MenuService]
})
export class MenuListComponent implements OnInit {
  isLoading = false;

  constructor(public menuService: MenuService, private titleService: Title) {
    titleService.setTitle('Lista de Imágenes');
  }

  ngOnInit() {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {
      accordion: true
    });
    this.getMenus();
  }

  getMenus() {
    this.isLoading = true;
    this.menuService.findAll().subscribe(res => {
      this.isLoading = false;
      this.menuService.menus = res as Menu[];
      this.menuService.menus.forEach(menus => {
        switch (menus.type) {
          case '1':
            menus.type_name = 'Excelente'
            break;
          case '2':
            menus.type_name = 'Buena'
            break;
          case '3':
            menus.type_name = 'Regular'
            break;
          case '4':
            menus.type_name = 'Mala'
            break;
          case '5':
            menus.type_name = 'Pésima'
            break;
          default:
            break;
        }
      })
    });
  }

  onDeleteMenu(_id: string) {
    if (confirm('¿Seguro que quieres eliminarlo?')) {
      this.isLoading = true;
      this.menuService.deleteMenu(_id).subscribe(res => {
        this.isLoading = false;
        this.getMenus();
        M.toast({ html: 'Eliminado exitosamente!', classes: 'rounded' });
      });
    }
  }

}
