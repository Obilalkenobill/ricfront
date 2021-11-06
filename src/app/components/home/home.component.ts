import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ghibli:string="../../../assets/img/istockphoto-476679667-170667a.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
