import { removeWord } from "./removeWord";
import {errorMessage} from "../utility/notification/useNotification"
export const errorHandle = (data) =>{
    if(data.includes("mobileNo_1")){
        errorMessage("Please provide a another mobile number");
      }else if(data.includes("nidNo_1")){
        errorMessage("This NID Number allready used");
      }else if(data.includes("shopName_1")){
        errorMessage("This Shop name allready used");
      }else if(data.includes("accNo_1")){
        errorMessage("This account number allready used");
      }else{
        errorMessage(removeWord(data, 4));
      }
}