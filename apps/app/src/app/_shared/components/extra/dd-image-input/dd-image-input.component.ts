import { Component, ElementRef, HostListener, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'dd-image-input',
  templateUrl: './dd-image-input.component.html',
  styleUrls: ['./dd-image-input.component.scss']
})
export class DdImageInputComponent {
  @Input()
  defaultSrc: string = 'assets/sample.jpg';

  private _src: string = '';
  public get src(): string {
    return this._src || this.defaultSrc;
  };

  @ViewChild('fileInput', {static: false})
  fileInput!: ElementRef;

  @Output()
  fileSelected = new EventEmitter<any>();

  @HostListener('click')
  clickImageInput() {
    this.fileInput.nativeElement.click();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: Event & {dataTransfer: any}){
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      this.fileInput.nativeElement.files = files;
      this.selectedFiles(files);
    }
  }

  selected(event: Event) {
    this.selectedFiles((event as Event & {target: {files: File[]}})?.target?.files);
  }

  private selectedFiles(files: File[]) {
    const file = files[0];
    console.log('selectedFiles:', file);

    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = () => {
      let resultDataUrl = reader.result as string;
      this._src = resultDataUrl;
    }

    this.fileSelected.emit(file);
  }
}
