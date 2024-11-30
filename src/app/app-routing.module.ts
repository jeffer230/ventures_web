import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { EventoComponent } from './components/evento/evento.component';
import { EmprendimientoComponent } from './components/emprendimiento/emprendimiento.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
  },
  {
    path: 'eventos',
    component: EventoComponent,

  },
  {
    path: 'emprendimientos',
    component: EmprendimientoComponent,

  },
  {
    path: 'categorias',
    component: CategoriaComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
