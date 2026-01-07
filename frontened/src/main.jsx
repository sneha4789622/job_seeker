import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App";   // 🔥 AppWrapper import
import "./index.css";   // ❗ ye line honi hi chahiye
import { Toaster } from "./components/ui/sonner.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
    <Toaster />
  </React.StrictMode>
);
