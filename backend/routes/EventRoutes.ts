import * as express from 'express';
import { Request, Response} from 'express';
import {Event, EventType} from "../Models";

const eventRoutes = express.Router();


/**
 * @openapi
 * /api/events:
 *   get:
 *     summary: Get all events.
 *     description: Get all events.
 *     tags:
 *       - Events
 *     responses:
 *       '200':
 *         description: An array of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Could not query the database
 *
 */
eventRoutes.get("/api/events", async (req: Request, res: Response) => {
    try {
        let events: Event[] = await Event.findAll();
        res.status(200).send(events);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});


/**
 * @openapi
 * /api/events/{id}:
 *   get:
 *     summary: Get an event by ID.
 *     description: Retrieve an event based on its ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the event to retrieve.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: The event with the specified ID.
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Event not found with the specified ID.
 *       '500':
 *         description: Wrong id parameter format
 *
 */
eventRoutes.get("/api/events/:id", async (req: Request, res: Response) => {
    try{
        let id = +req.params.id;
        let event: Event = await Event.findOne({
            where: {eventId: id}
        });

        if(event){
            res.status(200).send(event);
        } else {
            res.status(404).send("Event not found with the specified id");
        }
    } catch(error) {
        res.status(500).send("Wrong id parameter format");
    }
});


/**
 * @openapi
 * /api/eventsByType/{eventType}:
 *   get:
 *     summary: Get an event by its type.
 *     description: Retrieve an event based on its type.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: eventType
 *         description: The type of the event to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: An array of events with the specified type.
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Unable to find the events by the specified type
 *
 */
eventRoutes.get("/api/eventsByType/:type", async (req: Request, res: Response) => {
    try {
        const eventType: string = req.params.type;
        let events: Event[] = await Event.findAll({
            where: {eventType: eventType},
            order: [
                ["eventDate", "ASC"]
            ]
        });
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send(error);
    }
});



/**
 * @openapi
 * /api/events:
 *   post:
 *     summary: Create a new event.
 *     description: Create a new event with the provided data.
 *     tags:
 *       - Events
 *     requestBody:
 *       description: Event data to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventNoId'
 *     responses:
 *       '200':
 *         description: The newly created event.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Internal Server Error
 */
eventRoutes.post("/api/events", async (req: Request, res: Response) => {
    try {
        const newEvent= await Event.create(req.body);
        res.status(200).send(newEvent);
    } catch(error) {
        res.status(500).send(error);
    }
});


/**
 * @openapi
 * /api/events:
 *   put:
 *     summary: Update an event.
 *     description: Update an event with the provided data.
 *     tags:
 *       - Events
 *     requestBody:
 *       description: Event data to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       '200':
 *         description: Updated Event.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Could not find this event
 *       '500':
 *         description: Wrong id parameter format
 *
 */
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


/**
 * @openapi
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event by ID.
 *     description: Delete an event based on its ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the event to delete.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: This event has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Unable to find event to delete.
 *       '500':
 *         description: Wrong id parameter format
 */
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
