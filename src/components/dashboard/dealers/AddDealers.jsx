import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhotoUpload from "../photoUpload/PhotoUpload";
import { dealersCreate } from "../../../feature/delears/dealersAPI";
import { useAddDealerMutation } from "../../../feature/delears/apiSlice";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

function AddDealers() {
  const { register, handleSubmit, reset } = useForm();
  const [bank, setBank] = useState([]);
  const [photo, setPhoto] = useState();
  const [addDealer] = useAddDealerMutation()
  const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/6430d836ebd26539d0a6a666")
      .then((response) => response.json())
      .then((json) => {
        setBank(json.record);
      });
  }, []);

  const onSubmit = (data) => {
    if(photo){
      setIsLoad(true)
      dealersCreate(addDealer, photo, setPhoto, data, reset, setIsLoad)
    }else{
      toast.error("Please upload photo")
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
              Full Name
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={5} maxLength={20} {...register("fullName", { required: true })} id="fullName" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Md Tobibur Rohman" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="accNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Full Address
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={5} maxLength={30} {...register("address", { required: true })} id="accNo" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Account No" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="shopName" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Shop Name
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={5} maxLength={20} {...register("shopName", { required: true })} id="shopName" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Shop Name" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="shopAddress" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Shop Address
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={5} maxLength={30} {...register("shopAddress", { required: true })} id="shopAddress" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Shope Address" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="bankName" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Bank Name
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <select {...register("bankName", { required: true })} id="bankName" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
              <option selected>Choose a Bank</option>
              {
                bank?.map((item, i) => (
                  <option key={i} value={item?.BankName}>
                    {item?.BankName}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="accNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Account No
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={10} maxLength={20} {...register("accNo", { required: true })} id="accNo" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Account No" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="accNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              NID No
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={10} maxLength={17} {...register("nidNo", { required: true })} id="accNo" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Account No" />
          </div>

          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="mobileNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Mobile Number
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={11} maxLength={11} {...register("mobileNo", { required: true })} id="mobileNo" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Mobile Number" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <label htmlFor="password" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
              Password
              <span className="text-red-600 ml-1 font-semibold">
                *
              </span>
            </label>
            <input minLength={5} maxLength={20} {...register("password", { required: true })} id="password" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="password" placeholder="Type Password" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-5">
            <PhotoUpload photo={photo} setPhoto={setPhoto} />
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

export default AddDealers;
