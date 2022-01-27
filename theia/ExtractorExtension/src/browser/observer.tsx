import {eventTypes} from "./constants";

class Observer {

    protected subscriptionsObserver: any;


    constructor() {
        this.subscriptionsObserver = {};

        for (let type in eventTypes) {
            this.subscriptionsObserver[type] = []
        }
    }

    subscribe = (event: any, callback: any) => {
        this.subscriptionsObserver[event].push(callback);
    };

    execute = (event: any, data: any) => {
        this.subscriptionsObserver[event].map((callback : any) => {
            return callback(data)
        })
    };

    unsubscribe = (event: any, callback: any) => {
        this.subscriptionsObserver[event] = this.subscriptionsObserver[event].filter((cb : any) => cb !== callback)
    };
}

export default new Observer()