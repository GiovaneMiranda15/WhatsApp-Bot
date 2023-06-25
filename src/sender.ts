import { create } from "venom-bot"
import Utils from "./utils"

class Sender {
    private utils = new Utils()
    private clientSession: any

    constructor() {
        this.initialize()
    }

    private async initialize() {
        create({
            session: "whatsapp-bot",
        })
            .then((client) => {
                this.clientSession = client
                this.start()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    private async start() {
        this.clientSession.onMessage((message: any) => {
            console.log("Mensagem recebida:", message.body)
        })
    }

    public async send(phoneNumber: any, message: any) {
        const phoneFormat = this.utils.formatPhone(phoneNumber)
        this.clientSession
            .sendText(phoneFormat, message)
            .then((result: any) => {
                console.log("Mensagem enviado com sucesso: ", result.text)
            })
            .catch((err: any) => {
                console.log("Falha ao enviar a mensagem: ", err)
            })
    }
}

export default Sender
