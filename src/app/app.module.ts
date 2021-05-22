import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    jqxDataTableModule,
    jqxInputModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
