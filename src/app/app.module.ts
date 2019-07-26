import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { BoardComponent } from './board/board.component'

import { BoardService } from '../services/board.service'
import { ThreadService } from '../services/thread.service'
import { ReplyService } from '../services/reply.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    BoardService,
    ThreadService,
    ReplyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
