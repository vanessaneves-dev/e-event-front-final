import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ErrorInterceptorService } from './core/error-interceptor.service'; 



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { UploadComponent } from './components/upload/upload.component';
import { ButtonMainComponent } from './components/button-main/button-main.component';
import { ButtonSecundComponent } from './components/button-secund/button-secund.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { HomeComponent } from './pages/home/home.component';
import { ContainerComponent } from './components/container/container.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { InputComponent } from './components/input/input.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormOrganizerComponent } from './components/form-organizer/form-organizer.component';
import { FormEventComponent } from './components/form-event/form-event.component';
import { CadastroEventoComponent } from './pages/cadastro-evento/cadastro-evento.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { EventoDetComponent } from './pages/evento-det/evento-det.component';
import { CardEventoComponent } from './components/card-list-evento/card-evento.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LoginOrgComponent } from './components/login-org/login-org.component';
import { PerfilUserComponent } from './pages/perfil-user/perfil-user.component';
import { PerfilOrganizerComponent } from './pages/perfil-organizer/perfil-organizer.component';
import { ListOrganizerComponent } from './components/list-organizer/list-organizer.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { TermosComponent } from './pages/termos/termos.component';
import { BannerGeralComponent } from './components/banner-geral/banner-geral.component';
import { EditEventComponent } from './pages/edit-event/edit-event.component';
import { EventoGestaoComponent } from './pages/evento-gestao/evento-gestao.component';
import { UserEventosComponent } from './pages/user-eventos/user-eventos.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    UploadComponent,
    ButtonMainComponent,
    ButtonSecundComponent,
    ButtonBackComponent,
    HomeComponent,
    ContainerComponent,
    CadastroComponent,
    InputComponent,
    FormUserComponent,
    FormOrganizerComponent,
    FormEventComponent,
    CadastroEventoComponent,
    EventosComponent,
    EventoDetComponent,
    CardEventoComponent,
    SobreNosComponent,
    ContatoComponent,
    LoginComponent,
    LoginUserComponent,
    LoginOrgComponent,
    PerfilUserComponent,
    PerfilOrganizerComponent,
    ListOrganizerComponent,
    ErrorPageComponent,
    TermosComponent,
    BannerGeralComponent,
    EditEventComponent,
    EventoGestaoComponent,
    UserEventosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
