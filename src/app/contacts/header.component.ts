import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selectedFeatureEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onTabSelected(tab: string){
    this.selectedFeatureEvent.emit(tab);
  }

}
