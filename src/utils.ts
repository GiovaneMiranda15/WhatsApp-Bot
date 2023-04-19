import {parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js";

class Utils{

    formatPhone(phone: string){
        if(!isValidPhoneNumber(phone, "BR")){
            throw new Error("Número inválido")
        }
        
        let phoneNumber = parsePhoneNumber(phone, "BR")?.format("E.164").replace("+", "") as string;
        
        return phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`;
    }

}

export default Utils