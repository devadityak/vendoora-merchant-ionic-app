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
  photos: any;
  constructor() {} // private camera: Camera

  public async takePicture2() {
    try {
      // Take a photo
      const img = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 90,
        allowEditing: true,
      });

      console.log(img.base64String);
      this.photos = img.dataUrl;

      const blobData = this.dataURItoBlob(String(img.base64String));

      // Create FormData
      const formData = new FormData();
      formData.append('file', blobData, 'image.jpg');
    } catch (error) {
      console.error('Error taking picture', error);
    }
  }

  public async takePicture() {
    const image = Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 100,
      allowEditing: false,
    });

    this.photos = (await image).dataUrl;
  }

  // takePicture() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };

  //   this.camera.getPicture(options).then(
  //     (imageData: any) => {
  //       // imageData is a base64 encoded string
  //       console.log(imageData);
  //     },
  //     (err: any) => {
  //       console.error('Error taking picture', err);
  //     }
  //   );
  // }

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
