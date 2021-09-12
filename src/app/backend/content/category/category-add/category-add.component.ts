import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})

export class CategoryAddComponent implements OnInit {
  DataCategory: Category[] = [];

  constructor(private service: CategoryService, private location: Location) { }

  ngOnInit(): void {
  }

  add(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name || !description) { return; }

    this.service.insert({ name, description } as Category)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
