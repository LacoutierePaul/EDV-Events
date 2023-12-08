import * as express from 'express';
import { Request, Response} from 'express';
import { Participation } from "../Models";

const participationRoutes = express.Router();


/**
 * @openapi
 * /api/participations:
 *   get:
 *     summary: Get all participation.
 *     description: Get all participation.
 *     tags:
 *       - Participations
 *     responses:
 *       '200':
 *         description: An array of participation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participation'
 *       '500':
 *         description: Could not query the database
 *
 */
participationRoutes.get("/api/participations", async (req: Request, res: Response) => {
    try {
        let participations: Participation[] = await Participation.findAll();
        res.status(200).send(participations);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

/**
 * @openapi
 * /api/participations/{eventId}:
 *   get:
 *     summary: Get participations with event ID.
 *     description: Retrieve all participations based on event ID.
 *     tags:
 *       - Participations
 *     parameters:
 *       - in: path
 *         name: eventId
 *         description: ID of the event to retrieve.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: The participations with the specified event ID.
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Participation'
 *       '404':
 *         description: participation not found with the specified eventID.
 *       '500':
 *         description: Internal server error
 *
 */
participationRoutes.get("/api/participations/:eventId", async (req: Request, res: Response) => {
    try{
        let id = +req.params.eventId;
        let participations: Participation[] = await Participation.findAll({
            where: {eventId: id}
        });

        if(participations){
            res.status(200).send(participations);
        } else {
            res.status(404).send("Participations not found");
        }
    } catch(error) {
        res.status(500).send("Wrong eventId parameter format");
    }
});

/**
 * @openapi
 * /api/participations/{memberId}:
 *   get:
 *     summary: Get participations with member ID.
 *     description: Retrieve all participations  of a member based on his ID.
 *     tags:
 *       - Participations
 *     parameters:
 *       - in: path
 *         name: memberId
 *         description: ID of the member to retrieve.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: The participations of the member with the specified ID.
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Participation'
 *       '404':
 *         description: participation not found with the specified memberId.
 *       '500':
 *         description: Internal server error
 *
 */
participationRoutes.get("/api/participations/:memberId", async (req: Request, res: Response) => {
    try{
        let id = +req.params.memberId;
        let participations: Participation[] = await Participation.findAll({
            where: {memberId: id}
        });

        if(participations){
            res.status(200).send(participations);
        } else {
            res.status(404).send("Participations not found");
        }
    } catch(error) {
        res.status(500).send("Wrong memberId parameter format");
    }
});

/**
 * @openapi
 * /api/participations:
 *   post:
 *     summary: Create a new participation.
 *     description: Create a new participation with the provided data.
 *     tags:
 *       - Participations
 *     requestBody:
 *       description: participation data to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Participation'
 *     responses:
 *       '200':
 *         description: The newly created participation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participation'
 *       '500':
 *         description: Internal Server Error
 */
participationRoutes.post("/api/participations", async (req: Request, res: Response) => {
    try {
        const newParticipation: Participation= await Participation.create(req.body);
        res.status(200).send(newParticipation);
    } catch(error) {
        res.status(500).send(error);
    }
});


/**
 * @openapi
 * /api/participations/{eventId}:
 *   delete:
 *     summary: Delete all participation for an event.
 *     description: Delete all participation for the event id.
 *     tags:
 *       - Participations
 *     parameters:
 *       - in: path
 *         name: eventId
 *         description: ID of the event where all participations will be deleted.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: All the participation for this event has been deleted.
 *       '404':
 *         description: Event not found with the specified ID.
 *       '500':
 *         description: Wrong id parameter format
 */
participationRoutes.delete("/api/participations/:eventId", async (req: Request, res: Response) => {
    try {
        const id = +req.params.eventId;
        await Participation.destroy({
            where: {eventId: id}
        });
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});


/**
 * @openapi
 * /api/participations/{memberId}:
 *   delete:
 *     summary: Delete all participation for a member.
 *     description: Delete all participation for the member id.
 *     tags:
 *       - Participations
 *     parameters:
 *       - in: path
 *         name: memberId
 *         description: ID of the member where all participations will be deleted.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: All the participation for this member has been deleted.
 *       '404':
 *         description: Member not found with the specified ID.
 *       '500':
 *         description: Wrong id parameter format
 */
participationRoutes.delete("/api/participations/:memberId", async (req: Request, res: Response) => {
    try {
        const id = +req.params.memberId;
        await Participation.destroy({
            where: {memberId: id}
        });
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});



/**
 * @openapi
 * /api/participations/{memberId}/{eventId}:
 *   delete:
 *     summary: Delete a participation of a member on one event.
 *     description: Delete a participation of a member on one event.
 *     tags:
 *       - Participations
 *     parameters:
 *       - in: path
 *         name: memberId
 *         description: ID of the member to delete.
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: eventId
 *         description: ID of the event to delete.
 *         required: true
 *         schema:
 *           type: number
 *
 *     responses:
 *       '200':
 *         description: This participation has been deleted.
 *       '404':
 *         description: Member or Participation not found with the specified ID.
 *       '500':
 *         description: Wrong id parameter format
 */
participationRoutes.delete("/api/participations/:memberId/:eventId", async (req: Request, res: Response) => {
    try {
        const memberId = +req.params.memberId;
        const eventId = +req.params.eventId;
        await Participation.destroy({
            where: {
                memberId: memberId,
                eventId: eventId
            }
        });
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});

export default participationRoutes;