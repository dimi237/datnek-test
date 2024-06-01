export class EventDto {
    organizer: string;
    type: string;
    link: string;
    address: string;
    name: string;
    start_date?: Date;
    start_hour?: string;
    end_date?: Date;
    end_hour?: string;

    constructor(organizer: string,
        type: string,
        link: string,
        address: string,
        name: string,
        start_date?: Date,
        start_hour?: string,
        end_date?: Date,
        end_hour?: string,
    ) {
       this.organizer =  organizer;
       this.type =  type;
       this.link =  link;
       this.address =  address;
       this.name =  name;
       this.start_date =  start_date;
       this.start_hour =  start_hour;
       this.end_date =  end_date;
       this.end_hour =  end_hour;
    }
} 

export type EventList =  Event[] | never[];

export type EventStateModel = {
    eventList: EventList;

}