import { Subscription } from "rxjs";

export function safeUnsubscribe(subscription: Subscription) {
    if (subscription != null) {
        subscription.unsubscribe();
    }
}