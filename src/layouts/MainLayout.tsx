import {FC, PropsWithChildren} from "react";
import {Outlet} from "react-router-dom";

import {Header, SearchBar} from "../components";
interface IProps extends PropsWithChildren {

}

const MainLayout: FC<IProps> = () => {
    return (
        <div>
            <Header/>
            <SearchBar/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};