import {useCallback, useState} from "react";


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            // console.log(body)
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
                // console.log(body)
            }

            const responce = await fetch( "http://localhost:5000"+url, {method, body, headers})
            const data =  await responce.json()

            if (!responce.ok) {
                throw new Error(data.massage || 'Что то пошло не так')
            }
            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}