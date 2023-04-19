import { Whatsapp, create, Message, SocketState } from "venom-bot";

export type QrCode = {
    base64Qr: string
    attempts: number
}

class Sender {
    private client: Whatsapp;
    private connected: boolean;
    private qr: QrCode;

    get isConnected(): boolean{
        return this.connected
    }

    get qrCode(): QrCode{
        return this.qr
    }

    constructor() {
        this.initialize();
    }

    //Inicializa uma sessão
    private initialize() {

        const qr = (base64Qr: string, asciiQR:string, attempts: number) => {
            this.qr = { base64Qr, attempts }
        }

        const status = (statusSession: string) => {
            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(statusSession);
        }

        const start = (client: Whatsapp) => {
            this.client = client;

            client.onStateChange((state)=>{
                this.connected = state === SocketState.CONNECTED
            })
        }

        create('WhatsApp-Boot', qr, status)
            .then((client) => start(client))
            .catch((erro) => { console.log(erro) });
    }
}

export default Sender