import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App";   // 🔥 AppWrapper import
import "./index.css";   // ❗ ye line honi hi chahiye
import { Toaster } from "./components/ui/sonner.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
<<<<<<< HEAD
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

=======
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
=======
        <AppWrapper />
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
    </Provider>
    <Toaster />
  </React.StrictMode>
);
