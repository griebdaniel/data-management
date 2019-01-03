import { Injectable } from '@angular/core';
import { getUrl } from './config';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private baseUrl = getUrl();
  private socket: SocketIOClient.Socket;

  constructor() {

  }

  init() {
    this.socket = socketIo(this.baseUrl);
    this.socket.on('message', (data) => {
      console.log(data);
    });
  }

}
