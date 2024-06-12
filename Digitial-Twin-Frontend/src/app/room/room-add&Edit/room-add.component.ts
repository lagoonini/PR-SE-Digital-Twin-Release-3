import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RoomService } from '../room.service';
import { Room, RoomType } from '../room.model';
import { Device, DeviceType } from '../../device/device.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrl: './room-add.component.css'
})
export class RoomAddComponent implements OnInit, OnDestroy{
  index: number;
  editMode = false;
  roomForm: FormGroup;
  subscription: Subscription;


  constructor(private route: ActivatedRoute,private roomService: RoomService,private router: Router) {   
  }

  ngOnInit() {
    this.subscription = this.roomService.editModeChange.subscribe(
      (editMode : boolean) => {
        this.editMode = editMode;
      }
    );
    this.route.params.subscribe(
        (params: Params) => {
          this.index = +params['index'];
          this.editMode = params['index'] != null;
          this.roomService.editModeChange.next(this.editMode);
          this.initForm();
        }
    );
  }

  private initForm() {
    let roomName = '';
    let roomType = '';
    let roomSize = 0;

    //get data of the room (prepopulate the form)
    if (this.editMode) {
      // const room = this.roomService.getRoom(this.index);
      // this.roomBefore = room;
      // roomType = room.type;
      // roomName = room.name;
      // roomSize = room.size;
    }

    this.roomForm = new FormGroup({
      'name': new FormControl(roomName, Validators.required),
      'type': new FormControl(roomType, Validators.required),
      'size': new FormControl(roomSize, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      // 'light': new FormControl(roomLight, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      // 'fans': new FormControl(roomFans, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      // 'doors': new FormControl(roomDoors, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      // 'windows': new FormControl(roomWindows, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
      'deviceDtoList': new FormArray([])
    });
  }

    addDevice() {
      console.log(this.roomForm.value)
      const deviceFormGroup = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'status': new FormControl(null, Validators.required),
        'deviceType': new FormControl(null, Validators.required)
      });
  
      (<FormArray>this.roomForm.get('deviceDtoList')).push(deviceFormGroup);
      console.log(this.roomForm.value)
    }

  onSubmit() {
    // const newRoom = this.convertFormToRoom(this.roomForm.value);
    console.log(this.roomForm.value);
    console.log(this.roomForm.valid);
    if (this.editMode) {
      // this.roomService.updateRoom(this.index, newRoom);
    } else {
      this.roomService.addRoom(this.roomForm.value).subscribe(res=>{
        this.router.navigate(['/home']).then(() => {
          location.reload();
        });
      }, error=>{
        console.log("error", error)
      });
       
      
    }
    this.onCancel();
  }
  
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
