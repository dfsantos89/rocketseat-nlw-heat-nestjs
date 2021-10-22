import { ConnectedSocket, OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }})
export class AppGateway implements OnGatewayConnection {
  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`Usuário conectado no socket ${socket.id}`);
  }
}
