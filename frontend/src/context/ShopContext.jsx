import { createContext, useEffect, useState } from "react"
import axios from 'axios'

const ShopContext = createContext()

export const ShopProvider = ({ children }) => {

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const API = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        withCredentials: true
    })

    const checkAuth = async() => {
        try
        {
            const res = await API.get("/api/user")
            setUser(res.data.user)
            setIsLoggedIn(true)
        }
        catch(error)
        {
            setUser(null)
            setIsLoggedIn(false)
        }
        finally
        {
            setLoading(false)
        }
    }

    useEffect(()=>{
        checkAuth()
    },[])

    return (
        <ShopContext.Provider value={{isLoggedIn,setIsLoggedIn,user,loading,setUser}}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContext