import { Component } from '@angular/core';
import { FotoService, Photo } from '../services/foto.service';
import { AngularFireStorage } from '@angular/fire/storage';

export interface fileFoto{
  name: string; //filepath
  path: string; //webviewpath
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  urlImageStorage : string[] = [];
  selectedPhoto : Photo[] = [];

  constructor(private afStorage : AngularFireStorage,public fotoService:FotoService) {}

  async ngOnInit(){
    await this.fotoService.loadFoto();
  }

  removeItemsWithName(items: Photo[], name: string): Photo[] {
    return items.filter(i => i.filePath !== name);
  }

  addSelected(isiFoto){
    if(document.getElementById(isiFoto.filePath).style.opacity=='0.7'){
      document.getElementById(isiFoto.filePath).style.opacity = '1';
      this.selectedPhoto = this.removeItemsWithName(this.selectedPhoto,isiFoto.filePath);
    }
    else{
      this.selectedPhoto.unshift(isiFoto);
      document.getElementById(isiFoto.filePath).style.opacity = '0.7';
    }
    console.log(this.selectedPhoto);
  }

  TambahFoto(){
    this.fotoService.tambahfoto();
  }

  uploadFoto(){
    this.urlImageStorage=[];

    for(var index in this.selectedPhoto){
      const imgFilepath = 'imgStorage/'+this.fotoService.dataFoto[index].filePath;
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() =>  {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=>{
          this.urlImageStorage.unshift(url);
        });
      });
    }
    for(var i in this.selectedPhoto){
      document.getElementById(this.selectedPhoto[i].filePath).style.opacity='1';
    }
    this.selectedPhoto=[];
    alert("Upload successfully!");
  }
}
