export type Event = {
    id:number;
    organizer: string;
    type: string;
    link: string;
    address: string;
    name: string;
    start_date?: Date;
    start_hour?: string;
    end_date?: Date;
    end_hour?: string;
    description?:string;
} 
