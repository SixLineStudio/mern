import React from "react";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";

const RoutsApp = ({isAutentificated}) => {
    if (isAutentificated) {
        return (
            <Routes>
                <Route path='/links' exact element = {<LinksPage />} />
                <Route path='/create' exact element = {<CreatePage />} />
                <Route path='/detail/:id' exact element = {<DetailPage />}/>
                <Route path='*' element={<Navigate replace to = '/create'/>}/>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path='/' exact element = {<AuthPage/>}/>
            <Route path='*' element={<Navigate replace to = '/'/>}/>
        </Routes>
    )
}
export default RoutsApp