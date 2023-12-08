import * as express from 'express';
import { Request, Response} from 'express';
import { connectDb, createTables } from './DbManager';
import {Member, Event, Participation, Schools, EventType} from "./Models";

const app = express()
app.use(express.json())
app.listen(3000, () => {
    console.log(`Running on port 3000`);
});

connectDb();
createTables().then(r => {});

app.get("/api/participations", async (req: Request, res: Response) => {
    try {
        let participations: Participation[] = await Participation.findAll();
        res.status(200).send(participations);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

app.get("/api/participations/:eventId", async (req: Request, res: Response) => {
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

app.get("/api/participations/:memberId", async (req: Request, res: Response) => {
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

app.post("/api/participations", async (req: Request, res: Response) => {
    try {
        const newParticipation: Participation= await Participation.create(req.body);
        res.status(200).send(newParticipation);
    } catch(error) {
        res.status(500).send(error);
    }
});


app.delete("/api/participations/:eventId", async (req: Request, res: Response) => {
    try {
        const id = +req.params.eventId;
        await Participation.destroy({
            where: {eventId: id}
        });
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});

app.delete("/api/participations/:memberId", async (req: Request, res: Response) => {
    try {
        const id = +req.params.memberId;
        await Participation.destroy({
            where: {memberId: id}
        });
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});

app.delete("/api/participations/:memberId/:eventId", async (req: Request, res: Response) => {
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
