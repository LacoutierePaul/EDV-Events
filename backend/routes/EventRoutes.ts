import * as express from 'express';
import { Request, Response} from 'express';
import {Event, EventType} from "../Models";

const eventRoutes = express.Router();

eventRoutes.get("/api/events", async (req: Request, res: Response) => {
    try {
        let events: Event[] = await Event.findAll();
        res.status(200).send(events);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

eventRoutes.get("/api/events/:id", async (req: Request, res: Response) => {
    try{
        let id = +req.params.id;
        let event: Event = await Event.findOne({
            where: {eventId: id}
        });

        if(event){
            res.status(200).send(event);
        } else {
            res.status(404).send("Event not found");
        }
    } catch(error) {
        res.status(500).send("Wrong id parameter format");
    }
});

eventRoutes.post("/api/events", async (req: Request, res: Response) => {
    try {
        const newEvent= await Event.create(req.body);
        res.status(200).send(newEvent);
    } catch(error) {
        res.status(500).send(error);
    }
});

eventRoutes.put("/api/events", async (req: Request, res: Response) => {
    try {
        const id = +req.body.eventId;
        const event: Event = await Event.findOne({
            where: {eventId: id}
        });

        if (event) {
            event.set(req.body);
            await event.save();
            res.status(200).send(event);
        } else {
            res.status(404).send("Could not find this event");
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});

eventRoutes.delete("/api/events/:id", async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const event: Event = await Event.findOne({
            where: { eventId: id }
        });

        if (event) {
            res.status(200).send(event);
            await event.destroy();
        } else {
            res.status(404).send("Unable to find event to delete");
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});

export default eventRoutes;
