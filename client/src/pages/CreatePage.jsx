import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const nav = useNavigate()

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link},
                    {'Authorization':`Bearer ${auth.token}`
                    })
                nav(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }
    return (
        <div className='row'>
            <div className="col s8 offset-2" style={{paddingTop: "2rem"}}>
                <div className="input-field ">
                    <input
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyDown={pressHandler}/>

                    <label htmlFor="email">Ссылка</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;