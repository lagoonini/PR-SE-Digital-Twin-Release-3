import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Room, RoomType, RoomTypeImagePath } from './room.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomService {
  roomsChanged = new Subject<Room[]>();
  editModeChange = new Subject<Boolean>();
  basePath = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getRooms():Observable<any>{
    return this.http.get(this.basePath + 'room');
  }

  getRoomById(id: number): Observable<any>{
    return this.http.get(this.basePath + `room/${id}`);
  }

  getRoomImagePath(roomType: RoomType): string {
    return RoomTypeImagePath[roomType];
  } 

  addRoom(room: any):Observable<any>{
    return this.http.post(this.basePath + "room", room);
  }

  updateRoom( room: Room) {
    return this.http.put(this.basePath + "room", room);
  }

  deleteRoom(id: number) {
    return this.http.delete(this.basePath + `room/${id}`, {responseType: 'text'});
  }

  editModeChanged(editMode: boolean){
    this.editModeChange.next(editMode);
  }

  getRoomStructure(){
    return this.http.get(this.basePath + "room/report", { responseType: 'blob' });
  }

  fetchDataFromBackend(room : Room): Observable<any>{
    return this.http.get(this.basePath + `roomData/getBy/${room.id}`);
  }

  fetchAllDataFromBackend(room : Room): Observable<any>{
    console.log("fetching data from backend");
    return this.http.get(this.basePath + `roomData/getAllBy/${room.id}`);
  }


}