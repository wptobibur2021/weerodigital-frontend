import { uploadCloudinary } from "../../utility/cloudinaryPhotoUpload"
import { errorHandle } from "../../utility/errorHandle";
import {successMessage, errorMessage} from "../../utility/notification/useNotification"
import { dealerLoggedIn } from "./dealerAuth";
// Dealer Create function declaration below
export const dealersCreate = async (addDealer, photo, setPhoto, data, reset, setIsLoad) =>{
    try{
       const photoUlr = await uploadCloudinary(photo)
       const dealerData = {
        ...data,
        photo: photoUlr
       }
       addDealer(dealerData)
       .unwrap()
      .then((res) => {
        if (res.status === "success") {
          setPhoto("");
          successMessage("Dealer Add successfull");
          reset();
          setIsLoad(false)
        }
      })
      .catch((err) => {
        setIsLoad(false)
        errorHandle(err.data.error)
      });
    }catch(e){
        console.log("Error: ", e)
    }
}

export const deleteDealer = async (dealerDeleteById, id, setIsLoad) =>{
  try{
    dealerDeleteById(id)
    .unwrap()
   .then((res) => {
    console.log("res:", res)
     if (res.data.deletedCount === 1) {
       successMessage("Dealer delete successfull");
       setIsLoad(false)
     }
   })
   .catch((err) => {
    setIsLoad(false)
     errorHandle(err.data.error)
   });
  }catch(e){
    console.log("Err: ", e)
  }
}



// Dealer Login Function Declaration below
export const dealerLogin = async (loginDealer, navigate, data, setIsLoad, dispatch) =>{
  try{
    loginDealer(data)
    .unwrap()
    .then((res) => {
      if (res.status === "success") {
        dispatch(dealerLoggedIn({
          dealer: res.data,
          accessToken: res.token
        }
        ))
        successMessage("Login successfull");
        setIsLoad(false)
        navigate("/dashboard/user/add-products")
      }
    })
    .catch((err) => {
      setIsLoad(false)
      console.log("Err: ", err.data.error)
      errorMessage(err.data.error)
    });
  }catch(e){
    console.log("Err: ", e)
  }
}