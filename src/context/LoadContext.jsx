import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router';

const LoadContext = React.createContext();

const useLoad = () => {
    return useContext(LoadContext);
}

const LoadProvider = ({children}) => {
    const [load, setLoad] = useState(false);
    let location = useLocation();

    useEffect(() => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false)
        }, 2500);
    }, [location.pathname])

    return(
        <LoadContext.Provider value={{load, setLoad}}>
            {children}
        </LoadContext.Provider>
    )
}



export { LoadProvider, LoadContext, useLoad };