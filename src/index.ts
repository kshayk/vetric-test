import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {UserController} from "./controller/UserController.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/user', async (req: Request, res: Response) => {
    const userController = new UserController();
    await userController.getUserData(req, res);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
