import React from 'react'
import { useParams } from 'react-router-dom'
import { useAllDealerQuery } from '../../feature/delears/apiSlice';
import { camelCase } from '../../utility/camelCase';

const ProfilePage = () => {
    const {id} = useParams();
    console.log("Id", id)
    const {data} = useAllDealerQuery();
    const dealer = data?.data?.filter((item)=> item._id === id);
    const {photo, fullName, address,accNo, nidNo, mobileNo, shopAddress, shopName} = dealer[0];
  return (
    <div>
        <div className="bg-gray-700 p-10 flex justify-between rounded text-white">
            <div>
                <div className="mb-5">
                    <img className="w-36 rounded-full p-1 bg-gray-900" src={photo} alt={fullName} />
                </div>
                <div>
                    <h2>Name: {camelCase(fullName)}</h2>
                    <p>Address: {address}</p>
                </div>
            </div>
            <div>
                <div>
                    <ul>
                        <li className="border-b border-gray-900 border-dashed mb-2 py-1">Shop Name: {shopName}</li>
                        <li className="border-b border-gray-900 border-dashed mb-2 py-1">Shop Address: {shopAddress}</li>
                        <li className="border-b border-gray-900 border-dashed mb-2 py-1">Mobile No: {mobileNo}</li>
                        <li className="border-b border-gray-900 border-dashed mb-2 py-1">Account No:: {accNo}</li>
                        <li className="border-b border-gray-900 border-dashed mb-2 py-1">NID No: {nidNo}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage