import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/home',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./apphomelayout/apphomelayout.module').then(
        (m) => m.AppHomeLayoutModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'ticket',
    loadChildren: () =>
      import('./appinnerlayout/appinnerlayout.module').then(
        (m) => m.AppInnerLayoutModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
