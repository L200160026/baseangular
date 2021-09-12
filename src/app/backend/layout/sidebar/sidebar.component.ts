import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  logo: string = "assets/adminlte/dist/img/AdminLTELogo.png";
  profile: string = "assets/adminlte/dist/img/user2-160x160.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}
