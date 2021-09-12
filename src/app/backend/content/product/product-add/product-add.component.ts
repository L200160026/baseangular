import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  category: Category[] = []

  constructor(
    private route: ActivatedRoute,
    private serviceCategory: CategoryService,
    private service: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(): void {
    this.serviceCategory.getAll().subscribe(category => this.category = category);
  }

  add(category_id: number | string, name: string, description: string, price: string, date: string): void {
    category_id = category_id;
    name = name.trim();
    description = description.trim();
    price = price;
    date = date;
    
    if (!name || !description) { return; }

    this.service.insert({ category_id, name, description, price, date } as Product)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
