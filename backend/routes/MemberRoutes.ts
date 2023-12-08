import * as express from 'express';
import { Request, Response} from 'express';
import {Member} from "../Models";

const memberRoutes = express.Router();


/**
 * @openapi
 * /api/members:
 *   get:
 *     summary: Get all member.
 *     description: Get all members.
 *     tags:
 *       - Members
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
memberRoutes.get("/api/members",async(req:Request,res:Response)=> {
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
 *     tags:
 *       - Members
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
memberRoutes.get('/api/members/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        console.log('Handle HTTP GET /api/members/', id);
        // Utilisez Sequelize pour rechercher le package d'memberRoutesrentissage par ID
        const member = await Member.findOne({
            where: { memberId: id }
        });

        if (member) {
            // Renvoyez le package d'memberRoutesrentissage en tant que réponse JSON
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
 *     tags:
 *       - Members
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
memberRoutes.post('/api/members',async(req: Request, res: Response) => {
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
 *     tags:
 *       - Members
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
memberRoutes.delete('/api/members/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        console.log('Handle HTTP GET /api/allMembers/', id);
        // Utilisez Sequelize pour rechercher le package d'memberRoutesrentissage par ID
        const member = await Member.findOne({
            where: { memberId: id }
        });
        if (member) {
            // Renvoyez le package d'memberRoutesrentissage en tant que réponse JSON
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
 *     tags:
 *       - Members
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
memberRoutes.put('/api/members',async(req,res) => {
    try {
        const id = +req.body.memberId;
        const member = await Member.findOne({
            where: {memberId: id}
        });
        console.log('handle http PUT /api/member', id);
        if (member) {
            // Renvoyez le package d'memberRoutesrentissage en tant que réponse JSON
            member.set(req.body);
            await member.save();
            res.status(200).send(member);
        } else {
            // Renvoyez une réponse 404 si le package n'a pas été trouvé
            res.status(404).send('Member entity not found for ID: ' + id);
        }
    } catch (error) {
        res.status(500).send("Wrong id parameter format");
    }
});

export default memberRoutes;
