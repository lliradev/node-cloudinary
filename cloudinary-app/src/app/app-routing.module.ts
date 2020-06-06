import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhotoCreateComponent } from './components/photos/photo-create/photo-create.component';
import { PhotoListComponent } from './components/photos/photo-list/photo-list.component';
import { MenuListComponent } from './components/menu/menu-list/menu-list.component';
import { MenuCreateComponent } from './components/menu/menu-create/menu-create.component';

const routes: Routes = [
  { path: 'photos', component: PhotoListComponent },
  { path: 'photos/create', component: PhotoCreateComponent },
  { path: 'photos/edit/:_id', component: PhotoCreateComponent },

  { path: 'menus', component: MenuListComponent },
  { path: 'menus/create', component: MenuCreateComponent },
  { path: 'menus/edit/:_id', component: MenuCreateComponent },

  {
    path: '', redirectTo: '/menus', pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
