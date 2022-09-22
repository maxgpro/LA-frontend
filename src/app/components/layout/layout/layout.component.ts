import { Component, OnInit } from '@angular/core';
import { NaviagtionService } from 'src/app/services/naviagtion.service';
import { Navigation } from 'src/app/models/navigation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  navigation: Navigation[];
  navMenu: boolean = true;

  constructor(
    private navigationService: NaviagtionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((url: any) => {
        if(url.url && url.url.indexOf('login') != 1) {
          if(this.authService.checkUser() && !this.navigation) {
            this.getMenu();
          }
        }
    })
  }

  ngOnInit(): void {
    // this.getMenu();
  }

  getMenu(): void {
    this.navigationService.getNavigation().subscribe(
      (data: Navigation[]) => {
        this.navigation = data;
      }
    )
  }

}
