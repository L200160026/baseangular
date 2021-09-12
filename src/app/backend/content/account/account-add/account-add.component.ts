import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})

export class AccountAddComponent implements OnInit {
  DataAccount: Account[] = [];

  constructor(private service: AccountService, private location: Location) { }

  ngOnInit(): void {
  }

  add(name: string, username: string, level: string, created: string, modified: string, isactive: string): void {
    name = name.trim();
    username = username.trim();
    level = level.trim();
    created = created;
    modified = modified;
    isactive = isactive;

    if (!name || !username || !level || !created || !modified || !isactive) { return; }

    this.service.insert({ name, username, level, created, modified, isactive } as Account)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
