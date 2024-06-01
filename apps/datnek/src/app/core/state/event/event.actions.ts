import { Event } from './event.model';
export namespace EventInput {
    export class AddEvent {
        static readonly type = '[Event] Add';
        constructor(public payload: Event) { }
    }

    export class EditEvent {
        static readonly type = '[Event] Edit';
        constructor(public id: string, public payload: Event) { }
    }

    export class FetchAllEvents {
        static readonly type = '[Event] Fetch All';
    }

    export class DeleteEvent {
        static readonly type = '[Event] Delete';
        constructor(public id: string) { }
    }
}