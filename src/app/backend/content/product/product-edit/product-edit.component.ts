import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
  category: Category[] = []
  data: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private serviceCategory: CategoryService,
    private service: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getById();
  }

  getAllCategory(): void {
    this.serviceCategory.getAll().subscribe(category => this.category = category);
  }

  getById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe(data => this.data = data);
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    if (this.data) {
      this.service.update(this.data)
        .subscribe(() => this.goBack());
    }
  }

}
