import { Component, OnInit } from '@angular/core';
import {routes} from "../../core/routes/routes";
import {CommonModule} from "@angular/common";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule,RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent implements OnInit{
  links: string[] = [];
constructor() {}
  ngOnInit(): void {
    this.links = routes.map((r:any) => r.path);
  }

}
