import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  visibleSidebar1 = true;    
  visibleSidebar2 = true;    
  visibleSidebar3= true;    
  visibleSidebar4= true;    
  visibleSidebar5= true; 

  constructor() { }

  ngOnInit(): void {
  }


}
