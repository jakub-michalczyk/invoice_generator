import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  menuRoutes: Route[] = [];

  constructor(private router: Router) {
    this.menuRoutes = this.router.config.filter(
      (route) => route.data?.['title'] && route.path !== '**'
    );
  }

  isRouteActive(routePath: string | undefined): boolean {
    if (!routePath) {
      return false;
    }
    return this.router.isActive(routePath, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
