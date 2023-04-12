import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useLoginDealerMutation } from '../../feature/delears/apiSlice';
import {dealerLogin} from "../../feature/delears/dealersAPI"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
const LoginPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const[loginDealer]=useLoginDealerMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoad, setIsLoad] = useState(false)
    const onSubmit = (data) => {
        setIsLoad(true)
        dealerLogin(loginDealer, navigate, data, setIsLoad, dispatch)
    };
    return (
        <div className="bg-gray-800">
            <div className="h-screen py-20">
                <div className="w-1/4 m-auto bg-gray-950 p-10 rounded-md shadow-sm">
                    <div className="text-center mb-8 text-white border-b border-dashed border-gray-900">
                        <h2 className="text-lg font-semibold mb-2">Dealer Login</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label htmlFor="fullName" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                                Full Name
                                <span className="text-red-600 ml-1 font-semibold">
                                    *
                                </span>
                                </label>
                                <input {...register("mobileNo", { required: true })} id="fullName" required className="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none bg-gray-950 focus:bg-gray-950 text-white" type="number" placeholder="01722527364" />
                            </div>
                            <div className="w-full px-3 mb-5">
                                <label htmlFor="accNo" className="block uppercase mb-2 tracking-wide text-gray-700 text-xs font-bold">
                                Password
                                <span className="text-red-600 ml-1 font-semibold">
                                    *
                                </span>
                                </label>
                                <input {...register("password", { required: true })} id="accNo" className="appearance-none block w-full border rounded py-3 px-4 leading-tight bg-gray-950 focus:outline-none focus:bg-gray-950 text-white" type="password" placeholder="Password" />
                            </div>
                        </div>
                        <div>
                            {
                                isLoad ? (<button disabled className="bg-blue-800 text-white py-2 px-5 rounded" type="submit">Logining...</button>) : (
                                    <button className="bg-gray-800 text-white py-2 px-5 rounded" type="submit">Login</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage