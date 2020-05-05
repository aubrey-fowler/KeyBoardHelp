import { Component, OnInit, NgZone } from "@angular/core";
import { EventData, Page, View } from "tns-core-modules/ui/page/page";
import { screen } from 'tns-core-modules/platform/platform';
import * as utils from 'tns-core-modules/utils/utils';
import { IoskeyboardobserverService } from "./ioskeyboardobserver.service";
import { AndroidKeyboardListenerService } from "./AndroidKeyboardListener.service";

@Component({
    selector: "ns-items",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    public clientcode: string = '';
    public isKeyboardShowing: boolean;

    constructor(
        private page: Page,
        private ngZone: NgZone,
        private keyboardObserver: IoskeyboardobserverService,
        private androidKeyboard: AndroidKeyboardListenerService
    ) {

        this.page.on(Page.layoutChangedEvent, (args: EventData) => this.onLayoutChanged(args));
        this.isKeyboardShowing = false;

        if (utils.ios) {

            this.keyboardObserver.heightChange$().subscribe((height) => {
                console.log(height);
            });
    
            this.keyboardObserver.willHide$().subscribe((result) => {
                console.log(result);
            });
    
            this.keyboardObserver.willShow$().subscribe((result) => {
                console.log(result);
            });

        } else {

            this.androidKeyboard.watchKeyboard$().subscribe((result) => {
                console.log(' keyboard ', result);
            });
            
        }

    }

    public dismissKeyboard(args: EventData) {

        console.log(' dismiss keyboard ');

        if (utils.ios) {
            UIApplication.sharedApplication
                .keyWindow
                .endEditing(true);
        } else {
            utils.ad.dismissSoftInput();
        }
    }

    private onLayoutChanged(args: EventData) {

        console.log(' on layout changed ');

        const screenHeight = screen.mainScreen.heightPixels;

        const pageHeight = (args.object as View).getMeasuredHeight();

        const diff = screenHeight - pageHeight;

        if (diff > screenHeight * 0.15) {
            this.setIsKeyboardShowing(true);
        } else {
            this.setIsKeyboardShowing(false);
        }
        console.log(' this.isKeyboardShowing ', this.isKeyboardShowing);
    }

    private setIsKeyboardShowing(showing: boolean) {
        this.ngZone.run( () => {
            this.isKeyboardShowing = showing;
         });
    }

    public ngOnInit() {}

}
