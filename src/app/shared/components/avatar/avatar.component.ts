
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../services/storages/storage.service';
import { LoadingService } from '../../controllers/loading/loading.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent  implements OnInit {
protected image = "https://ionicframework.com/docs/img/demos/avatar.svg";
@Input() control = new FormControl;
@Input() onlyview = false;

protected mimetype = "image/jpeg";

  constructor(private readonly storageSrv: StorageService, private readonly loadsrv: LoadingService) { }

  ngOnInit() {}


  public async uploadFile(event: any){
    try {
    await this.loadsrv.show();
      console.log(event.target.files[0]);
      const url = await this.storageSrv.uploadFileAndGetUrl(event.target.files[0]);
      console.log(" ~ AvatarComponent ~ uploadFile ~ url:", url);
      this.control.setValue(url);
    await this.loadsrv.dismiss();

    } catch (error) {
    await this.loadsrv.dismiss();

      console.error(error);
    }


  }
}
