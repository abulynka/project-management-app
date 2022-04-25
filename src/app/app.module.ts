import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { BoardsComponent } from './project-management/pages/boards/boards.component';
import { BoardComponent } from './project-management/pages/board/board.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    BoardsComponent,
    BoardComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
