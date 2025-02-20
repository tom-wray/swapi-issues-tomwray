import React from "react";
import ReactDOM from "react-dom";
import { view } from "@forge/bridge";
import App from "./App";

import "@atlaskit/css-reset";
import './index.css';

await view.theme.enable();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
