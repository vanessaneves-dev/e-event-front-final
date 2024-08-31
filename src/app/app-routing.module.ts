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
import { PerfilOrganizerComponent } from './pages/perfil-organizer/perfil-organizer.component';
import { ListOrganizerComponent } from './components/list-organizer/list-organizer.component';
// import { ErrorPageComponent } from './components/error-page/error-page.component';
import { TermosComponent } from './pages/termos/termos.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { EventoGestaoComponent } from './pages/evento-gestao/evento-gestao.component';


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
  path: 'termos', component: TermosComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'evento-det/:id', component: EventoDetComponent
},
{ path: 'edit-event/:id', component: EditEventComponent 

},
{ path: 'eventGestao/:id', component: EventoGestaoComponent 
  
},
{
  path: 'organizers', component: ListOrganizerComponent
},
{
  path: 'perfilOrganizer', component: PerfilOrganizerComponent
},
// { path: 'error', component: ErrorPageComponent },
// { path: '**', redirectTo: 'error' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
