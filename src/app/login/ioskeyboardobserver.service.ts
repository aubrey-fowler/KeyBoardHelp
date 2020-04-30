import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as application from 'tns-core-modules/application';

@Injectable({
  providedIn: 'root'
})
export class IoskeyboardobserverService {


    public willHide$(): Observable<boolean> {

        return new Observable((observer) => {

            const iosObserver = application.ios.addNotificationObserver(UIKeyboardWillHideNotification, (notification) => {

                console.log(' notification ', notification);

                console.log(notification.userInfo);

                observer.next(false);
            });

            return () => {
                application.ios.removeNotificationObserver(iosObserver, UIKeyboardWillHideNotification);
            }
            
        });



    }

    public willShow$(): Observable<any> {


        return new Observable((observer) => {

            const iosObserver = application.ios.addNotificationObserver(UIKeyboardWillShowNotification, (notification) => {

                console.log(' notification ', notification);

                console.log(notification.userInfo);

                observer.next(false);
            });

            return () => {
                application.ios.removeNotificationObserver(iosObserver, UIKeyboardWillShowNotification);
            }
            
        });

    }

    public heightChange$(): Observable<number> {

        return new Observable((observer) => {

            const iosObserver = application.ios.addNotificationObserver(UIKeyboardWillChangeFrameNotification, (notification) => {

                console.log(' notification ', notification);

                const safeArea = application.ios.window.safeAreaInsets.bottom;
                const safeAreaTop =  application.ios.window.safeAreaInsets.top;

                console.log('',application.ios.window);

                console.log(' safe area ', safeArea);
                console.log(' safeAreaTop ', safeAreaTop);

                const height = notification.userInfo.valueForKey(UIKeyboardFrameEndUserInfoKey).CGRectValue.size.height;
                console.log(' height ', height);

                observer.next(height - safeArea);
            });

            return () => {
                application.ios.removeNotificationObserver(iosObserver, UIKeyboardWillChangeFrameNotification);
            }
        });

    }

}
