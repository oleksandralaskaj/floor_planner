import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './floor-planning-app/App.tsx';
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById('floor-planning-app'));
root.render(
    <>
        <App/>
    </>
);
