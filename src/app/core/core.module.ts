import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CoreRoutingModule } from './core-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    CoreRoutingModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    WelcomeComponent,
  ],
})
export class CoreModule {}
