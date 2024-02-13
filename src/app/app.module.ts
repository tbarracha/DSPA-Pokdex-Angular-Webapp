// angular stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { PokemonTypeDirective } from './directives/pokemon-type.directive';
import { PokemonCryComponent } from './components/pokemon-cry/pokemon-cry.component';

// interceptors
import { HttpSecureInterceptor } from './interceptors/http-secure.interceptor';

// guards
import { ShinyPokemonGuard } from './guards/shiny-pokemon.guard';
import { ToggleShinyComponent } from './components/toggle-shiny/toggle-shiny.component';
import { PokemonImageComponent } from './components/pokemon-image/pokemon-image.component';
import { CreditsComponent } from './components/credits/credits.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { ToggleLegacyComponent } from './components/toggle-legacy/toggle-legacy.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonDisplayerComponent,
    SearchBarComponent,
    ContentComponent,
    PokemonListElementComponent,
    PokemonTypeDirective,
    PokemonCryComponent,
    ToggleShinyComponent,
    PokemonImageComponent,
    CreditsComponent,
    ScrollTopComponent,
    ToggleLegacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'SHINY_POKEMON_GUARD',
      useValue: ShinyPokemonGuard
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSecureInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
