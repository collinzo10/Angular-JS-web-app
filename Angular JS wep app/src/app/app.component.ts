import { Component, ViewChild, HostListener, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ApiService } from "./shared/api.service";
import { Router, NavigationStart } from "@angular/router";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  opened = true;
  isLoggedIn: boolean = false;
  navStart: Observable<NavigationStart>;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  constructor(private apiService: ApiService, private router: Router) {
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    this.navStart.subscribe(
      evt => (this.isLoggedIn = this.apiService.IsAdminLoggedIn())
    );
    this.isLoggedIn = this.apiService.IsAdminLoggedIn();
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  adminLogout() {
    this.apiService.AdminLogout();
    this.router.navigateByUrl("/player-rankings");
  }

  ngOnChanges() {
    console.log("qwe");
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}
