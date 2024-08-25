import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroEventoComponent } from './pages/cadastro-evento/cadastro-evento.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { LoginComponent } from './pages/login/login.component';
import { EventoDetComponent } from './pages/evento-det/evento-det.component';

const routes: Routes = [
{
  path: '', component: HomeComponent
},
{
  path: 'cadastro', component: CadastroComponent
},
{
  path: 'cadastroEvento', component: CadastroEventoComponent
},
{
  path: 'eventos', component: EventosComponent
},
{
  path: 'sobre', component: SobreNosComponent
},
{
  path: 'contato', component: ContatoComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'evento-det/:id', component: EventoDetComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
