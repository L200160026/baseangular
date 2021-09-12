import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})

export class AccountEditComponent implements OnInit {
  account: Account[] = [];
  data: Account | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: AccountService,
    private location: Location
  ) { }

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
