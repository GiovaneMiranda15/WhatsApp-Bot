import Sender from "./sender";
import express, { Request, Response } from "express";

const sender = new Sender();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.post("/send", async (req: Request, res: Response) => {
    const { phone, message } = req.body;
    try {
        return res.send(await sender.send(phone, message));
    } catch (error) {
        return res.send({ status: 400, message: error })
    }
})

app.listen(2000);