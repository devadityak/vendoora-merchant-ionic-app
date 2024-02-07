import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

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
    width: 600,
    height: 600,
    // resultType: CameraResultType.DataUrl,
    resultType: CameraResultType.Base64,

    source: CameraSource.Photos,
    quality: 20,
    allowEditing: false,
    format: 'jpeg',
    // limit: 1,
  };

  constructor(private http: HttpClient) {} // private camera: Camera

  createProduct(data: any, prodImg1: any) {
    const url = environment.apiUrl + 'product/create-product';
    const headers = new HttpHeaders({
      // Authorization: 'Bearer ' + String(token),
    });
    console.log('data -', data);
    console.log('this.img1 -', prodImg1);

    let formDataObj = new FormData();
    // loop to convert all the data into formData
    Object.entries(data).forEach(([key, value]) => {
      let tempVal = String(value);
      formDataObj.append(key, tempVal);
    });
    // formDataObj.append('img1', prodImg1);
    formDataObj.append('img1', this.img2);

    return this.http.post<any>(url, formDataObj, { headers: headers });
  }

  // createProduct2(data: any) {
  //   const url = environment.apiUrl + 'product/create-product';
  //   const headers = new HttpHeaders({
  //     // Authorization: 'Bearer ' + String(token),
  //   });
  //   console.log('data -', data);

  //   let formDataObj = new FormData();
  //   formDataObj.append('hello', 'hello1');
  //   formDataObj.append('img1', data);
  //   formDataObj.append('img2', data);

  //   console.log('formData', formDataObj);
  //   return this.http.post<any>(url, formDataObj, { headers: headers });
  // }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public async takePicture2() {
    try {
      // Take a photo
      let img = await Camera.getPhoto({
        quality: 20,
        width: 600,
        height: 600,

        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,

        allowEditing: true,
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
