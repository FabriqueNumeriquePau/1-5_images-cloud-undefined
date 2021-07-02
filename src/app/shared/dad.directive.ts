import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDad]'
})
export class DadDirective {


  @HostBinding('class.file_hover') fileHover = false;
  @Output() fileDropped = new EventEmitter<File>()
  constructor() { }

  @HostListener('dragover', ['$event']) onDrag(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.fileHover = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: MouseEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileHover = false;
  }

  @HostListener('drop', ['$event']) public ondrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileHover = false;
    let file = evt.dataTransfer?.files.item(0);
    if (file !== null) {
      this.fileDropped.emit(file);
    }
  }
}
