import {successMessage, errorMessage} from "../../utility/notification/useNotification"
import { adminLoggedIn } from "./adminAuth";

// Admin Login Function Declaration below
export const adminLogin = async (loginAdmin, navigate, data, setIsLoad, dispatch) =>{
  try{
    loginAdmin(data)
    .unwrap()
    .then((res) => {
      if (res.status === "success") {
        dispatch(adminLoggedIn({
          admin: res.data,
          accessToken: res.token
        }
        ))
        successMessage("Login successfull");
        setIsLoad(false)
        navigate("/dashboard/add-dealers")
      }
    })
    .catch((err) => {
      setIsLoad(false)
      errorMessage(err.data.error)
    });
  }catch(e){
    console.log("Err: ", e)
  }
}