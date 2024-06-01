import { Action, State, StateContext } from "@ngxs/store";
import { EventStateModel } from "./event.dto";
import { Injectable } from "@angular/core";
import { EventService } from "../../../services/event.service";
import { EventInput } from './event.actions'

@State<EventStateModel>({
    name: 'event',
    defaults: {
        eventList: []
    }
})
@Injectable()
export class EventState {
    constructor(private eventService: EventService) { }

    @Action(EventInput.FetchAllEvents)
    async eventList(ctx: StateContext<EventStateModel>) {
        const result = await this.eventService.findAll();
        const state = ctx.getState();
        ctx.setState({
            ...state,
            eventList: result
        });
    }

    @Action(EventInput.AddEvent)
    async addEvent(ctx: StateContext<EventStateModel>, action: EventInput.AddEvent) {
        await this.eventService.create({...action.payload,id:1});
        ctx.dispatch(new EventInput.FetchAllEvents());
    }

    @Action(EventInput.EditEvent)
    async updateEvent(ctx: StateContext<EventStateModel>, action: EventInput.EditEvent) {
        await this.eventService.update(action.id, action.payload);
        ctx.dispatch(new EventInput.FetchAllEvents());
    }

    @Action(EventInput.DeleteEvent)
    async deleteEvent(ctx: StateContext<EventStateModel>, action: EventInput.DeleteEvent) {
        await this.eventService.deleteById(action.id);
        ctx.dispatch(new EventInput.FetchAllEvents());
    }
}