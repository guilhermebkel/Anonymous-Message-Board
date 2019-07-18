import { Component, OnInit } from '@angular/core';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  state: []
  isModalActive: Boolean
  isModalActiveStyle: {}
  isCreateButtonActiveStyle: {}

  constructor() { }

  ngOnInit() {
    this.isModalActive = false;
    this.state = []
  }

  toggleCreationModal(){
    this.isModalActive = !this.isModalActive
    this.isModalActiveStyle = this.isModalActive ? {'display': 'block'} : {'display': 'none',}
    this.isCreateButtonActiveStyle = this.isModalActive ? {'transform': 'rotate(45deg)'} : {'transform': 'rotate(0)'}
  }
}
