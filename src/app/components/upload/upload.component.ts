import { Component, EventEmitter, Output } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  @Output() fileUploaded = new EventEmitter<string>();
  uploadedFileURL: string = '';

  constructor(private storage: Storage) {}

  async uploadFile(event: any) {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const filePath = `uploads/${file.name}`;
    const fileRef = ref(this.storage, filePath);

    try {
      // Envia o arquivo para o Firebase Storage
      await uploadBytes(fileRef, file);

      // Obtém a URL de download do arquivo
      const url = await getDownloadURL(fileRef);
      this.uploadedFileURL = url;
      this.fileUploaded.emit(this.uploadedFileURL);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  }

  getFileURL() {
    return this.uploadedFileURL;
  }
}
