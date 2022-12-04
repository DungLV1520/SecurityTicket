import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApphomelayoutComponent } from './apphomelayout.component';

const routes: Routes = [
  {
    path: '',
    component: ApphomelayoutComponent,

    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApphomelayoutRoutingModule {}
