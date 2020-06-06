import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { FilterInternalPipe } from './pipes/filter-internal.pipe';
import { FilterSupplierPipe } from './pipes/filter-supplier.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhotoCreateComponent } from './components/photos/photo-create/photo-create.component';
import { PhotoListComponent } from './components/photos/photo-list/photo-list.component';
import { MenuCreateComponent } from './components/menu/menu-create/menu-create.component';
import { MenuListComponent } from './components/menu/menu-list/menu-list.component';
import { HeaderComponent } from './components/header/header.component';

import { FilterExternalPipe } from './pipes/filter-external.pipe';

@NgModule({
    declarations: [
        AppComponent,
        FilterInternalPipe,
        FilterSupplierPipe,
        NotFoundComponent,
        PhotoCreateComponent,
        PhotoListComponent,
        MenuCreateComponent,
        MenuListComponent,
        HeaderComponent,
        TruncatePipe,
        FilterExternalPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        NgxPaginationModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
