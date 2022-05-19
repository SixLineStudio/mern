import React from "react"
import 'materialize-css'
import {BrowserRouter} from "react-router-dom";
import RoutsApp from "./routs";
import {AuthContext} from "./context/AuthContext";
import useAuth from "./hooks/auth.hook";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";


function App() {

    const {login, logout, token, userId, ready} = useAuth()

    const isAuthentification = !!token


    return (

        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthentification
        }}>
            <BrowserRouter>
                {isAuthentification && <Navbar/>}
                <div className="">
                    {ready
                        ? <RoutsApp isAutentificated={isAuthentification}/>
                        : <Loader/>
                    }

                </div>
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App;
