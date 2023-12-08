import * as express from 'express';
import { Request, Response} from 'express';
import { connectDb, createTables } from './DbManager';
import {Member, Event, Participation, Schools, EventType} from "./Models";
import swaggerJsdoc=require('swagger-jsdoc')
import swaggerUi=require("swagger-ui-express")

const app = express()
app.use(express.json())
app.listen(3000, () => {
    console.log(`Running on port 3000`);
});

connectDb();
createTables().then(r => {});


//swagger

const jsDocOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with swagger',
            version: '1.0.0',
            description: 'Documentation for express API with swagger',
        },
        components: {
            schemas: {
                Member: {
                    type: 'object',
                    properties: {
                        memberId: {
                            type: 'number',
                        },
                        memberLastName: {
                            type: 'string',
                        },
                        memberFirstName: {
                            type: 'string',
                        },
                        memberEmail: {
                            type: 'string',
                        },
                        memberPassword: {
                            type: 'string',
                        },
                        memberSchool: {
                            type: 'string',
                            enum: ['ESILV', 'IIM', 'EMLV'],
                        },
                        isAdmin: {
                            type: 'boolean',
                        },
                    },
                },
                Event: {
                    type: 'object',
                    properties: {
                        eventId: {
                            type: 'number',
                        },
                        eventType: {
                            type: 'string',
                            enum: ['Tournament', 'Training', 'Event'],
                        },
                        eventTitle: {
                            type: 'string',
                        },
                        eventPlace: {
                            type: 'string',
                        },
                        eventDescription: {
                            type: 'string',
                        },
                        eventDate: {
                            type: 'string',
                            format:"date",
                        },
                        eventLimit: {
                            type: 'number',
                        },
                    },
                },
                Participation: {
                    type: 'object',
                    properties: {
                        eventId: {
                            type: 'number',
                        },
                        memberId: {
                            type: 'number',
                        },
                    },
                },
                MemberNoId: {
                    type: 'object',
                    properties: {
                        memberLastName: {
                            type: 'string',
                        },
                        memberFirstName: {
                            type: 'string',
                        },
                        memberEmail: {
                            type: 'string',
                        },
                        memberPassword: {
                            type: 'string',
                        },
                        memberSchool: {
                            type: 'string',
                            enum: ['ESILV', 'IIM', 'EMLV'],
                        },
                        isAdmin: {
                            type: 'boolean',
                        },
                    },
                },
            },
        },
    },
    apis: ['app.js'],
};


const apiDoc=swaggerJsdoc(jsDocOptions)
console.log('api-doc json',JSON.stringify(apiDoc,null,2))
app.use('/swagger-ui',swaggerUi.serve,swaggerUi.setup(apiDoc))

// Members endpoints

/**
 * @openapi
 * /api/members:
 *   get:
 *     summary: Get all member.
 *     description: Get all members.
 *     responses:
 *       '200':
 *         description: An array of members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       '500':
 *         description: Could not query the database
 *
 */
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

/**
 * @openapi
 * /api/members/{id}:
 *   get:
 *     summary: Get a member by ID.
 *     description: Retrieve a member based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the member to retrieve.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: The member with the specified ID.
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Member'
 *       '404':
 *         description: member not found with the specified ID.
 *       '500':
 *         description: Internal server error
 *
 */
app.get('/api/members/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        console.log('Handle HTTP GET /api/members/', id);
        // Utilisez Sequelize pour rechercher le package d'apprentissage par ID
        const member = await Member.findOne({
            where: { memberId: id }
        });
app.get("/api/events", async (req: Request, res: Response) => {
    try {
        let events: Event[] = await Event.findAll();
        res.status(200).send(events);
    } catch(error){
        res.status(500).send("Could not query the database");
    }
});

app.get("/api/events/:id", async (req: Request, res: Response) => {
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

/**
 * @openapi
 * /api/members:
 *   post:
 *     summary: Create a new member.
 *     description: Create a new member with the provided data.
 *     requestBody:
 *       description: Member data to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberNoId'
 *     responses:
 *       '200':
 *         description: The newly created member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       '500':
 *         description: Internal Server Error
 */
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

/**
 * @openapi
 * /api/members/{id}:
 *   delete:
 *     summary: Delete a member by ID.
 *     description: Delete a member based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the member to delete.
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: This member has been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       '404':
 *         description: Member not found with the specified ID.
 *       '500':
 *         description: Wrong id parameter format
 */
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

/**
 * @openapi
 * /api/members:
 *   put:
 *     summary: Update a member.
 *     description: Update a member with the provided data.
 *     requestBody:
 *       description: Member data to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       '200':
 *         description: Updated Member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       '404':
 *         description: Member Entity Not found for this id
 *       '500':
 *         description: Wrong id parameter format
 *
 */
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
app.post("/api/events", async (req: Request, res: Response) => {
    try {
        const newEvent= await Event.create(req.body);
        res.status(200).send(newEvent);
    } catch(error) {
        res.status(500).send(error);
    }
});

app.put("/api/events", async (req: Request, res: Response) => {
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

app.delete("/api/events/:id", async (req: Request, res: Response) => {
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
