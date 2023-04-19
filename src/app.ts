import Sender from "./sender";
import express, { Request, Response } from "express";

const sender = new Sender();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get("/status", (req: Request, res: Response)=>{
    return res.send({
        qrCode: sender.qrCode,
        connected: sender.isConnected
    })
})

app.listen(2000);