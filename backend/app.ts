import * as express from 'express';
import { connectDb, createTables } from './DbManager';
import swaggerJsdoc = require('swagger-jsdoc');
import swaggerUi = require("swagger-ui-express");
import eventRoutes from "./routes/EventRoutes";
import memberRoutes from "./routes/MemberRoutes";
import participationRoutes from "./routes/ParticipationRoutes";

const app = express()

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
                        eventLocation: {
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
                EventNoId: {
                    type: 'object',
                    properties: {
                        eventType: {
                            type: 'string',
                            enum: ['Tournament', 'Training', 'Event'],
                        },
                        eventTitle: {
                            type: 'string',
                        },
                        eventLocation: {
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
    apis: ['app.js', './routes/MemberRoutes.js'],
};

const apiDoc = swaggerJsdoc(jsDocOptions);
app.use('/swagger-ui',swaggerUi.serve,swaggerUi.setup(apiDoc));
app.use(express.json());
app.use(eventRoutes);
app.use(memberRoutes);
app.use(participationRoutes);



connectDb();
createTables().then(r => {});

app.listen(3000, () => {
    console.log(`Running on port 3000`);
});

