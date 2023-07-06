import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplacePipe } from 'src/pipes/replace.pipe';
import { PasswordStrengthComponent } from './components/password-strength/password-strength.component';

@NgModule({
  declarations: [AppComponent, ReplacePipe, PasswordStrengthComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
