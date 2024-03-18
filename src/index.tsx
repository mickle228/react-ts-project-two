import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";

import './index.css';
import {router} from "./router";
import {SearchProvider, ThemeProvider} from "./hoc";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider>
        <SearchProvider>
            <RouterProvider router={router}/>
        </SearchProvider>
    </ThemeProvider>
);


