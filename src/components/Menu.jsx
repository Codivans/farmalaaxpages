import React, { useState, useEffect } from 'react';
import logotipo from './../assets/img/logo-farmaLAAX.png';
import products from './../data/products'
import { FiMenu } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Menu = () => {
    const [open, setOpen] = useState(false)

    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    const itemsFamilias = products.map(x => x.familia)
    const familias = [... new Set(itemsFamilias)]

    const itemsDepartamentos = products.map(x => x.departamento)
    const departamentos = [... new Set(itemsDepartamentos)]

    let arrayMenu = []

    familias.forEach((familia) => {
        const buscarFamilias = products.filter((item) => item.familia === familia)
        const addMenu = {
            familia: familia
        }
        if(buscarFamilias){
            addMenu.departamentos = buscarFamilias.map(item => item.departamento).filter(onlyUnique).map(departamento => departamento)
        }
        arrayMenu.push(addMenu)
    })

    const handleClick = () => {
        setOpen(!open)
    }

    useEffect(() => {
        AOS.init();
      }, [])


  return (

        <header>
            <div className='contain-header'>
                <Link to='/' className='contain-logo'>
                        <img src={logotipo} alt='FarmaLAAX'/>
                </Link>
                <nav>
                    <ul>
                        <li className='items-productos'>
                            <Link to='#' onClick={handleClick}><FiMenu /> Productos</Link>
                            {
                                open 
                                ?
                                <ul data-aos="fade-up">
                                    {
                                        arrayMenu.map(({familia}) => {
                                            return(<li><Link to={`/productos/` + familia} onClick={handleClick}>{familia}</Link></li>)
                                        })
                                    }
                                </ul>
                                :''
                            }
                            
                        </li>
                        <li><Link to='/nosotros'>Nosotros</Link></li>
                        <li><Link to='/franquicias'>Franquicias</Link></li>
                        {/* <li><Link to='/sucursales'>Sucursales</Link></li> */}
                    </ul>
                </nav>
            </div>
        </header>
   
  )
}
