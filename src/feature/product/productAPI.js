import { uploadCloudinary } from "../../utility/cloudinaryPhotoUpload";
import { errorHandle } from "../../utility/errorHandle";
import { successMessage } from "../../utility/notification/useNotification";

export const productCreate = async(addProduct, photo, setPhoto, data, reset, setIsLoad) =>{
    try{
        const photoUlr = await uploadCloudinary(photo)
        const proData = {
         ...data,
         photo: photoUlr
        }
        addProduct(proData)
        .unwrap()
       .then((res) => {
         if (res.status === "success") {
           setPhoto("");
           successMessage("Product Add successfull");
           reset();
           setIsLoad(false)
         }
       })
       .catch((err) => {
         setIsLoad(false)
         console.log("Err: ", err)
         errorHandle(err.data.error)
       });
    }catch(e){
        console.log("Error: ", e)
    }
}

export const deleteProduct = async (productDeleteById, id, setIsLoad) =>{
    try{
      productDeleteById(id)
      .unwrap()
     .then((res) => {
      console.log("res:", res)
       if (res.data.deletedCount === 1) {
         successMessage("Product delete successfull");
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