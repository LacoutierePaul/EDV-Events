import * as express from 'express';
import { Request, Response} from 'express';
import { Participation } from "../Models";

const participationRoutes = express.Router();

participationRoutes.get("/api/participations", async (req: Request, res: Response) => {
    try {
        let participations: Participation[] = await Participation.findAll();
        res.status(200).send(participations);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

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

participationRoutes.post("/api/participations", async (req: Request, res: Response) => {
    try {
        const newParticipation: Participation= await Participation.create(req.body);
        res.status(200).send(newParticipation);
    } catch(error) {
        res.status(500).send(error);
    }
});


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