import * as express from 'express';
import { Request, Response} from 'express';


const app = express()
app.use(express.json())

app.get("/api/test", (req: Request, res: Response) => {
    res.send("Salut !");
});

app.listen(3000, () => {
    console.log(`Running on port 3000`);
});