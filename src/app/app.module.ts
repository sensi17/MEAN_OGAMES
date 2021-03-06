import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing/routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UserService } from './users/user.service';
import { GlobalService } from './globals.service';
import { RoomService } from './rooms/room.service';
import { ChatService } from './chat/chat.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PongCanvasService } from './games/pong-canvas/pong-canvas.service';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { LoginComponent } from './users/login/login.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomDetailsComponent } from './rooms/room-details/room-details.component';
import { RoomComponent } from './rooms/room/room.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChatboxComponent } from './chat/chatbox/chatbox.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SlotsGameComponent } from './games/slots-game/slots-game.component';
import { LogoutComponent } from './users/logout/logout.component';

import { RoomCreateComponent } from './rooms/room-create/room-create.component';
import { PongGameComponent } from './games/pong-game/pong-game.component';
import { NewsCarouselComponent } from './lobby/news-carousel/news-carousel.component';
import { NewsListComponent } from './lobby/news-list/news-list.component';
import { InfoDashComponent } from './info-dash/info-dash.component';
import { RoomJoinComponent } from './rooms/room-join/room-join.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { TutorialGameComponent } from './games/tutorial-game/tutorial-game.component';
import { WebglTutorialComponent } from './games/webgl-tutorial/webgl-tutorial.component';
import { WebglTut2Component } from './games/webgl-tut2/webgl-tut2.component';
import { PhaserStatesComponent } from './games/phaser-states/phaser-states.component';
import { PongCanvasComponent } from './games/pong-canvas/pong-canvas.component';
import { RoomSearchComponent } from './rooms/room-search/room-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    UserListComponent,
    UserDetailsComponent,
    RoomListComponent,
    LoginComponent,
    LobbyComponent,
    RoomDetailsComponent,
    RoomComponent,
    ChatboxComponent,
    TopNavComponent,
    SlotsGameComponent,
    LogoutComponent,
    RoomCreateComponent,
    PongGameComponent,
    NewsCarouselComponent,
    NewsListComponent,
    InfoDashComponent,
    RoomJoinComponent,
    UserCreateComponent,
    TutorialGameComponent,
    WebglTutorialComponent,
    WebglTut2Component,
    PhaserStatesComponent,
    PongCanvasComponent,
    RoomSearchComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [
    UserService, 
    GlobalService, 
    RoomService, 
    ChatService,
    BsModalService,
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    PongCanvasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
