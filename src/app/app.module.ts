// angular stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// header & content
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';

// pokemon components
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDisplayerComponent } from './components/pokemon-displayer/pokemon-displayer.component';
import { SearchBarComponent } from './components/searchbar/searchbar.component';
import { PokemonListElementComponent } from './components/pokemon-list-element/pokemon-list-element.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonDisplayerComponent,
    SearchBarComponent,
    ContentComponent,
    PokemonListElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
