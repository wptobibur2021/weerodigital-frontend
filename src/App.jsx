import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./router/Router";
import ToastConfig from "./utility/notification/ToastConfig";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./app/store";
let persistor = persistStore(store);
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={routes} />
          <ToastConfig/>
        </PersistGate>
      </Provider>
    </>

  );
}

export default App;
