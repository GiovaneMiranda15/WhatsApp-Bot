import { Whatsapp, create, Message, SocketState } from "venom-bot";
import Utils from "./utils";

const utils = new Utils();

export type QrCode = {
    base64Qr: string
    attempts: number
}

class Sender {
    private client: Whatsapp;
    private connected: boolean;
    private qr: QrCode;

    get isConnected(): boolean {
        return this.connected
    }

    get qrCode(): QrCode {
        return this.qr
    }

    constructor() {
        this.initialize();
    }

    onMessage = () => {
        this.client.onMessage((message) => {
            console.log(message.body)
        })
    }

    sendText = async (to:string, message:string) => {
        let phoneNumber = utils.formatPhone(to);
        await this.client.sendText(phoneNumber, message).then(()=>{
            console.log("Mensagem enviada")
        }).catch((error)=>{
            console.log(error)
        })
    }

    //Inicializa uma sessão
    private initialize() {

        const qr = (base64Qr: string, asciiQR: string, attempts: number) => {
            this.qr = { base64Qr, attempts }
        }

        const status = (statusSession: string) => {
            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(statusSession);
        }

        const start = (client: Whatsapp) => {
            this.client = client;
            this.onMessage();
            client.onStateChange((state) => {
                this.connected = state === SocketState.CONNECTED
            })
        }

        create('WhatsApp-Boot', qr, status)
            .then((client) => start(client))
            .catch((erro) => { console.log(erro) });
    }
}

export default Sender