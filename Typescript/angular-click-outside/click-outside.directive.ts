import { Directive, ElementRef, EventEmitter, HostListener, Output, Input } from "@angular/core";

@Directive({
    selector: "[appClickOutside]",
    standalone: true,
})
export class ClickOutsideDirective {
    constructor(private el: ElementRef) {}

    @Output() public clickOutside = new EventEmitter();
    @Input() public COexcluded: string[] = [];

    // targetElement 是指被點擊的目標 DOM
    @HostListener("document:click", ["$event.target"])
    public onClick(targetElement: HTMLElement) {
        // 檢查被點擊的目標是否在這個元件的範圍內
        let clickedInside = this.el.nativeElement.contains(targetElement);
        // 如果不在範圍內，就檢查是否在範圍內的例外裡面
        clickedInside ||=
            this.COexcluded.includes("#" + targetElement.id) ||
            this.COexcluded.includes("." + targetElement.className);
        if (!clickedInside) {
            this.clickOutside.emit(targetElement);
        }
    }
}
