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



// Members endpoints
app.get("/api/members",async(req:Request,res:Response)=> {
    try {
        const users=await Member.findAll();

        res.status(200).send(users)
    }catch(error)
    {
        console.error("Erreur lors de la récupération des membres",error);
        res.status(500).send('Could not query the database');
    }
})


app.get('/api/members/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        console.log('Handle HTTP GET /api/members/', id);
        // Utilisez Sequelize pour rechercher le package d'apprentissage par ID
        const member = await Member.findOne({
            where: { memberId: id }
        });

        if (member) {
            // Renvoyez le package d'apprentissage en tant que réponse JSON
            res.status(200).send(member);
        } else {
            // Renvoyez une réponse 404 si le package n'a pas été trouvé
            res.status(404).send('Member not found for ID: ' );
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

app.post('/api/members',async(req: Request, res: Response) => {
    try {
        const newMember = await Member.create(req.body);
        console.log('handle http POST /api/members', newMember);
        res.status(200).send(newMember)
    }catch(error)
    {
        res.status(500).send(error)
    }
});


app.delete('/api/members/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        console.log('Handle HTTP GET /api/allMembers/', id);
        // Utilisez Sequelize pour rechercher le package d'apprentissage par ID
        const member = await Member.findOne({
            where: { memberId: id }
        });
        if (member) {
            // Renvoyez le package d'apprentissage en tant que réponse JSON
            res.status(200).send(member);
            await member.destroy();
        } else {
            // Renvoyez une réponse 404 si le package n'a pas été trouvé
            res.status(404).send('Member not found for ID: ' + id);
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});

app.put('/api/members',async(req,res) => {
    try {
        const id = +req.body.memberId;
        const member = await Member.findOne({
            where: {memberId: id}
        });
        console.log('handle http PUT /api/member', id);
        if (member) {
            // Renvoyez le package d'apprentissage en tant que réponse JSON
            member.set(req.body);
            await member.save();
            res.status(200).send(member);
        } else {
            // Renvoyez une réponse 404 si le package n'a pas été trouvé
            res.status(404).send( 'Member entity not found for ID: ' + id);
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});







