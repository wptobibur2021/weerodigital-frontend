import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhotoUpload from "../photoUpload/PhotoUpload";
import { useAllDealerQuery } from "../../../feature/delears/apiSlice";
import { camelCase } from "../../../utility/camelCase";
import { useAddProductMutation } from "../../../feature/product/productSlice";
import { errorMessage } from "../../../utility/notification/useNotification";
import { productCreate } from "../../../feature/product/productAPI";
import Loading from "../common/Loading";
function AddProducts() {
  const [isLoad, setIsLoad] = useState(false)
  const { register, handleSubmit, reset } = useForm();
  const [photo, setPhoto] = useState();
  const {data} = useAllDealerQuery();
  const [addProduct] = useAddProductMutation()
  const onSubmit = (data) => {
    if(photo){
      setIsLoad(true)
      productCreate(addProduct, photo, setPhoto, data, reset, setIsLoad)
    }else{
      errorMessage("Please upload product photo")
    }
  };
  return (
    <div className="relative">
    {isLoad && (
      <div className="z-50 absolute flex justify-center top-0 w-full h-full right-0 opacity-70 bg-white">
        <Loading />
      </div>
    )}
    <div className="shadow-md p-10 rounded-md md:mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="fullName" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Product Name
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={5} maxLength={15} {...register("proName", { required: true })} id="fullName" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Product Name" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="dealerId" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Dealer Name
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <select {...register("dealerId", { required: true })} id="dealerId" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
              <option selected>Select Dealer Name</option>
              {
                data?.data?.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {camelCase(item?.fullName)}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="catName" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Category Name
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input {...register("catName", { required: true })} id="catName" minLength={5} maxLength={15} className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Category Name" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="brandName" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Brand Name
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input {...register("brandName", { required: true })} id="brandName" minLength={5} maxLength={15} className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Brand Name" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="proPrice" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Product Price
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={2} maxLength={5} {...register("proPrice", { required: true })} id="proPrice" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Product Price" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="proQty" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Product Quantity
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input {...register("proQty", { required: true })} id="proQty" minLength={2} maxLength={5} required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Product Quantity" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <PhotoUpload photo={photo} setPhoto={setPhoto}/>
          </div>
        </div>
        <div>
          <button className="bg-gray-800 text-white py-2 px-5 rounded" type="submit">Add Dealers</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddProducts;
