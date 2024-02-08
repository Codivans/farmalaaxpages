import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import products from '../data/products';

const CatalogoContext = React.createContext();

const useCatalogo = () => {
    return useContext(CatalogoContext);
}

const CatalogoProvider = ({children}) => {
    let location = useLocation();

    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    const itemsFamilias = products.map(x => x.familia)
    const familias = [... new Set(itemsFamilias)]

    const itemsDepartamentos = products.map(x => x.departamento)
    const departamentos = [... new Set(itemsDepartamentos)]

    let itemsMenu = []

    familias.forEach((familia) => {
        const buscarFamilias = products.filter((item) => item.familia === familia)
        const addMenu = {
            familia: familia
        }
        if(buscarFamilias){
            addMenu.departamentos = buscarFamilias.map(item => item.departamento).filter(onlyUnique).map(departamento => departamento)
        }
        itemsMenu.push(addMenu)
    })


    return(
        <CatalogoContext.Provider value={{itemsMenu}}>
            {children}
        </CatalogoContext.Provider>
    )
}



export { CatalogoProvider, CatalogoContext, useCatalogo };