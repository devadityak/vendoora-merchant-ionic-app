import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  demoImgUrl = 'assets/img/demo.png';
  img1: any = { dataUrl: this.demoImgUrl };
  img2: any = { dataUrl: this.demoImgUrl };
  img3: any = { dataUrl: this.demoImgUrl };
  img4: any = { dataUrl: this.demoImgUrl };
  

  photoOptions = {
    // width: 600,
    // height: 600,
    resultType: CameraResultType.DataUrl,
    // resultType: CameraResultType.Uri,
    source: CameraSource.Photos,
    quality: 20,
    allowEditing: false,
    // mediaType: CameraResultType. this.camera.MediaType.PICTURE,
    // encodingType: ImageOptions. Camera. .EncodingType.JPEG,
    // format: 'jpeg',
    // webUseInput: true,
    limit: 1,
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  createProduct(data: any) {
    const url = environment.apiUrl + 'product/create-product';
    const token = this.storageService.getToken();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + String(token),
    });

    let formDataObj = new FormData();

    //* loop to convert all the data into formData
    Object.entries(data).forEach(([key, value]) => {
      let tempVal = String(value);
      formDataObj.append(key, tempVal);
    });

    formDataObj.append('img1', this.img1.blob);
    formDataObj.append('img2', this.img2.blob);
    formDataObj.append('img3', this.img3.blob);
    formDataObj.append('img4', this.img4.blob);

    return this.http.post<any>(url, formDataObj, { headers: headers });
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // private async uriToFile(webPath: string): Promise<File> {
  //   const response = await fetch(webPath);
  //   const blob = await response.blob();
  //   return new File([blob], `photo_${Date.now()}.jpeg`, {
  //     type: 'image/jpeg',
  //   });
  // }


  public async selectImg_1() {
    const tempImg = await Camera.getPhoto(this.photoOptions);
    this.img1 = tempImg;
    this.img1.blob = this.dataURItoBlob(String(tempImg.dataUrl));

    //* check img size if large than 1MB then alert
    if (!this.imgSizeCheck(this.img1.blob)) {
      alert('img size should be less than 1MB');
      this.img1.blob = '';
      this.img1.dataUrl = this.demoImgUrl;
    }
  }

  public async selectImg_2() {
    const tempImg = await Camera.getPhoto(this.photoOptions);
    this.img2 = tempImg;
    this.img2.blob = this.dataURItoBlob(String(tempImg.dataUrl));

    //* check img size if large than 1MB then alert
    if (!this.imgSizeCheck(this.img2.blob)) {
      alert('img size should be less than 1MB');
      this.img2.blob = '';
      this.img2.dataUrl = this.demoImgUrl;
    }

  }

  public async selectImg_3() {
    const tempImg = await Camera.getPhoto(this.photoOptions);
    this.img3 = tempImg;
    this.img3.blob = this.dataURItoBlob(String(tempImg.dataUrl));

    //* check img size if large than 1MB then alert
    if (!this.imgSizeCheck(this.img3.blob)) {
      alert('img size should be less than 1MB');
      this.img3.blob = '';
      this.img3.dataUrl = this.demoImgUrl;
    }
  }

  public async selectImg_4() {
    const tempImg = await Camera.getPhoto(this.photoOptions);
    this.img4 = tempImg;
    this.img4.blob = this.dataURItoBlob(String(tempImg.dataUrl));

    //* check img size if large than 1MB then alert
    if (!this.imgSizeCheck(this.img4.blob)) {
      alert('img size should be less than 1MB');
      this.img4.blob = '';
      this.img4.dataUrl = this.demoImgUrl;
    }
  }

  //* convert dataURI to blob
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: 'image/jpeg' });
  }

  //* check img size
  imgSizeCheck(img: any) {
    if (img.size < 539821) {
      return true;
    } else {
      return false;
    }
  }

  //* reset all img thumbnails to default
  resetImgData() {
    this.img1 = { dataUrl: this.demoImgUrl };
    this.img2 = { dataUrl: this.demoImgUrl };
    this.img3 = { dataUrl: this.demoImgUrl };
    this.img4 = { dataUrl: this.demoImgUrl };
    }
}
