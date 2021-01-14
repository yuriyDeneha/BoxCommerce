import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'convert',
    loadChildren: () => import('./convert/convert.module').then(m => m.ConvertModule)
  },
  {
    path: '**',
    redirectTo: 'convert',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
