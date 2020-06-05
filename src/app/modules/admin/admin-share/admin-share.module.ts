import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];
@NgModule({
  exports:[HeaderAdminComponent, FooterAdminComponent, SidebarAdminComponent],
  declarations: [HeaderAdminComponent, FooterAdminComponent, SidebarAdminComponent],
  imports: [
    CommonModule, MatSidenavModule, MatListModule, RouterModule.forChild(routes)

  ]
})
export class AdminShareModule { }
