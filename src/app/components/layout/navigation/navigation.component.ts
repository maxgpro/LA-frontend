import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Navigation } from 'src/app/models/navigation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  @Input() navigation: Navigation[];
  @Output() sidenavToggle = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav() :void {
    this.sidenavToggle.emit();
  }

}
