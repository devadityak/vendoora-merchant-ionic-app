import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photos: any = { dataUrl: 'assets/img/demo.png' };
  img1: any = { dataUrl: 'assets/img/demo.png' };
  img2: any = { dataUrl: 'assets/img/demo.png' };
  img3: any = { dataUrl: 'assets/img/demo.png' };
  img4: any = { dataUrl: 'assets/img/demo.png' };
  photoOptions = {
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Photos,
    quality: 50,
    allowEditing: false,
  };
  constructor() {} // private camera: Camera

  public async takePicture2() {
    try {
      // Take a photo
      let img = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        quality: 50,
        allowEditing: false,
      });
      // alert('123');
      // alert('img - ' + JSON.stringify(img));
      this.photos = img;

      // const path = String(img.webPath);
      // const file = await Filesystem.readFile({
      //   path,
      //   directory: Directory.Data,
      // });

      // Convert the file data to a base64 string
      // const base64Data = file.data;

      // Display the selected image
      // this.photos = `data:image/jpeg;base64,${base64Data}`;
      // this.photos = String(img.dataUrl);
      // this.photos = img;

      // blob conversion .....
      // const blobData = this.dataURItoBlob(String(img.base64String));

      // Create FormData
      //   const formData = new FormData();
      //   formData.append('file', blobData, 'image.jpg');
    } catch (error) {
      console.error('Error taking picture', error);
    }
  }
  public async selectImg_1() {
    let tempImg = await Camera.getPhoto(this.photoOptions);
    this.img1 = tempImg;
  }

  public async selectImg_2() {
    let tempImg = await Camera.getPhoto(this.photoOptions);
    this.img2 = tempImg;
  }

  public async selectImg_3() {
    let tempImg = await Camera.getPhoto(this.photoOptions);
    this.img3 = tempImg;
  }

  public async selectImg_4() {
    let tempImg = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 50,
      allowEditing: false,
      //
      // encodingTyp
      // e: Photo.,
      //  this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.PICTURE,
      // destinationType: this.camera.DestinationType.DATA_URL,
    });

    this.img4 = tempImg;
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: 'image/jpeg' });
  }
}
