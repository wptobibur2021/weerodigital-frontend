import { errorHandle } from "../../utility/errorHandle";
import { successMessage } from "../../utility/notification/useNotification";

export const invoiceCreate = async(addInvoice, data, reset, setIsLoad, setShowModal) =>{
    try{
        addInvoice(data)
        .unwrap()
       .then((res) => {
         if (res.status === "success") {
           successMessage("Invoice Add successfull");
           reset();
           setIsLoad(false)
           setShowModal(false)
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

export const deleteInvoice = async (invoiceDeleteById, id, setIsLoad) =>{
    try{
      invoiceDeleteById(id)
      .unwrap()
     .then((res) => {
      console.log("res:", res)
       if (res.data.deletedCount === 1) {
         successMessage("Invoice delete successfull");
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