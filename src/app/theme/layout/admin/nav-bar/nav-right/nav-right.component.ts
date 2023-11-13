// Angular import
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {

  constructor(
    private router: Router,
    private adminServiceService: AdminServiceService){}

  public logout() {
    this.adminServiceService.logout();
  }
}
