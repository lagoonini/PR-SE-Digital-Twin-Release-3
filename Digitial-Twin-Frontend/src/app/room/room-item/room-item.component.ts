import { Component, Input } from '@angular/core';
import { Room, RoomType, } from '../room.model';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrl: './room-item.component.css'
})
export class RoomItemComponent {
  @Input() room: Room;
  @Input() index: number = 0;

  constructor(private roomService: RoomService) { 
  }

  getRoomImagePath(roomType: RoomType): string {
    return this.roomService.getRoomImagePath(roomType);
  } 
}
