import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { MainComponent } from './main.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';

import { DashboardComponent } from './content/dashboard/dashboard.component';
import { CategoryListComponent } from './content/category/category-list/category-list.component';
import { CategoryAddComponent } from './content/category/category-add/category-add.component';
import { CategoryEditComponent } from './content/category/category-edit/category-edit.component';
import { ProductListComponent } from './content/product/product-list/product-list.component';
import { ProductAddComponent } from './content/product/product-add/product-add.component';
import { ProductEditComponent } from './content/product/product-edit/product-edit.component';
import { AccountListComponent } from './content/account/account-list/account-list.component';
import { AccountAddComponent } from './content/account/account-add/account-add.component';
import { AccountEditComponent } from './content/account/account-edit/account-edit.component';




const routes: Routes = [
  { 
    path: '', 
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent }
    ]
  },

  {
    path: 'category',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: CategoryListComponent},
      { path: 'add', component: CategoryAddComponent },
      { path: 'edit/:id', component: CategoryEditComponent },
    ]
  },

  {
    path: 'product',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ProductListComponent},
      { path: 'add', component: ProductAddComponent },
      { path: 'edit/:id', component: ProductEditComponent },
    ]
  },

  {
    path: 'account',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: AccountListComponent},
      { path: 'add', component: AccountAddComponent },
      { path: 'edit/:id', component: AccountEditComponent },
    ]
  }
];

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent,
    DashboardComponent,
    AccountListComponent,
    AccountAddComponent,
    AccountEditComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule
  ],
  exports: [
    RouterModule,
  ]

})
export class BackendModule { }
