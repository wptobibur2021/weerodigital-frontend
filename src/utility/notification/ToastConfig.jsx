import React from 'react'
import { ToastContainer } from "react-toastify";
const ToastConfig = () => {
  return (
    <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
    />
  )
}

export default ToastConfig