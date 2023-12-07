import * as express from 'express';
import { Request, Response} from 'express';
import {connectDb, createTables} from './DbManager';


const app = express()
app.use(express.json())
app.listen(3000, () => {
    console.log(`Running on port 3000`);
});

connectDb();
createTables().then(r => {});

app.get("/api/test", (req: Request, res: Response) => {
    res.send("Salut !");
});

