import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isOpen = true;
  constructor() { }

  ngOnInit(): void {
  }

  public toggleSideNav() {
    this.isOpen = !this.isOpen;
  }

  public getNavigationItems(): any {
    //return this.navigationService.getNavigationItems();
  }

  public getActivePage(): any {
    //return this.navigationService.getActivePage();
  }

  public logout() {
    // this.authService.logout();
    // this.router.navigate(['login'], { replaceUrl: true });
  }

  public getPreviousUrl(): any {
    // return this.navigationService.getPreviousUrl();
  }

}
