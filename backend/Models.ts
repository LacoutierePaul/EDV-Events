import {Model} from "sequelize";

export class Member extends Model {
    declare memberId: number;
    declare memberLastName: string;
    declare memberFirstName: string;
    declare memberEmail: string;
    declare memberPassword: string;
    declare memberSchool: string;
    declare isAdmin: boolean;
}

export class Event extends Model {
    declare eventId: number;
    declare eventType:string;
    declare eventTitle: string;
    declare eventPlace: string;
    declare eventDescription?: string;
    declare eventDate: Date;
    declare eventLimit: number;
}

export class Participation extends Model {
    declare eventId: number;
    declare memberId: number;
}

export enum EventType {
    Tournament,
    Training,
    Event
}

export enum Schools {
    ESILV,
    IIM,
    EMLV
}