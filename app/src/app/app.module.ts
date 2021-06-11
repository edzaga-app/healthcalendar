import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavModule } from './core/components/nav/nav.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/services/http/interceptor.service';
import { SpinnerModule } from './core/components/spinner/spinner.module';
import { SpinnerInterceptor } from './core/services/http/spinner.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavModule,
    HttpClientModule,
    SpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
    // { 
    //    provide: HTTP_INTERCEPTORS,
    //    useClass: SpinnerInterceptor,
    //    multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
