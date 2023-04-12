import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { camelCase } from '../../../utility/camelCase';
import { errorMessage } from '../../../utility/notification/useNotification';
import { invoiceCreate } from '../../../feature/invoice/invoiceAPI';
import { useAddInvoiceMutation } from '../../../feature/invoice/invoiceSlice';
const InvoiceCreateModal = ({setShowModal, product}) => {
  const [isLoad, setIsLoad] = useState(false)
  const { register, handleSubmit, reset } = useForm();
  const {proName, proPrice, proQty, dealerId, _id} = product
  const [qty, setQty] = useState(0);
  const [payment, setPayment] = useState(0);
  const [addInvoice] = useAddInvoiceMutation()
  const productQty = (e) =>{
    let q = e.target.value
    if(proQty >= q){
      setQty(q)
    }else{
      errorMessage("Product not available")
    }
  }
  const totalAmount = qty*proPrice
  const duePayment = totalAmount - payment
  const onSubmit = (data) => {
    data.duePayment = duePayment,
    data.totalAmount = totalAmount,
    data.proQty = qty,
    data.payment = payment,
    data.productId = _id,
    data.dealerId = dealerId
    invoiceCreate(addInvoice, data, reset, setIsLoad, setShowModal)
    console.log("Pay: ", data)
  };

  return (
    <div>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                Create a invoice
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/3 px-3 mb-5">
                  <label htmlFor="fullName" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                    Product Name
                    <span className="text-red-600 ml-1 font-semibold">
                      *
                    </span>
                  </label>
                  <input value={camelCase(proName)} id="fullName" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-5">
                  <label htmlFor="accNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                    Dealer Name
                    <span className="text-red-600 ml-1 font-semibold">
                      *
                    </span>
                  </label>
                  <input value={camelCase(dealerId.fullName)} id="accNo" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-5">
                  <label htmlFor="shopName" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                    Price
                    <span className="text-red-600 ml-1 font-semibold">
                      *
                    </span>
                  </label>
                  <input value={proPrice} id="shopName" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-5">
                  <label htmlFor="shopAddress" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                    Product Qty {proQty}
                    <span className="text-red-600 ml-1 font-semibold">
                      *
                    </span>
                  </label>
                  <input onChange={productQty} id="shopAddress" required className={`appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} type="number" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-5">
                  <label htmlFor="accNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                    Total
                    <span className="text-red-600 ml-1 font-semibold">
                      *
                    </span>
                  </label>
                  <input value={totalAmount} id="accNo" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Account No" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-5">
                  <label htmlFor="accNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                    Pay Amount
                    <span className="text-red-600 ml-1 font-semibold">
                      *
                    </span>
                  </label>
                  <input onChange={(e)=>setPayment(e.target.value)} id="accNo" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Pay amount" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-5">
                  <label htmlFor="accNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                    Due Amount
                    <span className="text-red-600 ml-1 font-semibold">
                      *
                    </span>
                  </label>
                  <input value={duePayment} id="accNo" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="number" placeholder="Due Amount" />
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
                  <label htmlFor="dealerId" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                    Payment Option
                    <span className="text-red-600 ml-1 font-semibold">
                      *
                    </span>
                  </label>
                  <select {...register("payOption", { required: true })} id="dealerId" className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
                    <option selected>Select Dealer Name</option>
                    <option value="Bank Acc">Bank Acc</option>
                    <option value="bKash">bKash</option>
                    <option value="Nagod">Nagod</option>
                  </select>
                </div>
              </div>
              <div>
                <button className="bg-gray-800 text-white py-2 px-5 rounded" type="submit">Add Dealers</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default InvoiceCreateModal