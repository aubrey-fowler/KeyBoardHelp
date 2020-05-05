import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as application from 'tns-core-modules/application';
import { ad } from "utils/utils";
var frame = require('ui/frame');

@Injectable({
  providedIn: 'root'
})
export class AndroidKeyboardListenerService {

    public watchKeyboard$(): Observable<boolean> {

        return new Observable((observer) => {

            var current_view = frame.topmost().currentPage.android;

            current_view.getViewTreeObserver().addOnGlobalLayoutListener(new android.view.ViewTreeObserver.OnGlobalLayoutListener({
                onGlobalLayout: function () {
                    if (ad.getInputMethodManager().isAcceptingText()) {
                        console.log(' here ');
                        observer.next(true);
                    } else {
                        console.log(' here 2');
                        observer.next(false);
                    }
                }
            }));

        });

    }

}
