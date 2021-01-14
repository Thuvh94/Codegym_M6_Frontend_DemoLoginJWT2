import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HelloComponent} from './hello/hello.component';
import {AuthGuard} from './helper/auth-guard';
import {LoginComponent} from './login/login.component';

const routes: Routes = [{
  path: 'hello',
  component: HelloComponent,
  canActivate: [AuthGuard]
},
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
