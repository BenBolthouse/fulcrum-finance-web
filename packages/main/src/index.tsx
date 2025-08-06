import React from "react";
import ReactDOM from "react-dom/client";
import {AuthContext} from "./features/auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthContext.Provider value={null}>
            <div>Hello World?</div>
        </AuthContext.Provider>
    </React.StrictMode>
);
