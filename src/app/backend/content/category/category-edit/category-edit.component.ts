import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})

export class CategoryEditComponent implements OnInit {

  data: Category | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: CategoryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getById();
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
