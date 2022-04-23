import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  getTitle(){
    return "Mum Yol"
  }

  getNavButtonClass(selectedNavibutton:string){
    if (window.location.pathname.startsWith(selectedNavibutton)) {
      return "nav-link bg-primary text-wrap rounded";
    }
    return "nav-link text-wrap";
  }
  // setNavButtonClass(selectedNavibutton:string){
  //   this.currentNavibutton = selectedNavibutton;
  // }

}
