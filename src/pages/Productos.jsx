import React, { useState, useEffect } from 'react'
import { Menu } from '../components/Menu'
import { useParams } from "react-router";
import products from './../data/products'
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { useLoad } from '../context/LoadContext';
import { Loading } from '../components/Loading';
import ReactPaginateProps from 'react-paginate';
import { VscChevronDown } from 'react-icons/vsc'




export const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [selectDepartamento, setSelectDepartamento] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [open, setOpen] = useState(false)
    let { familia } = useParams();
    const {load} = useLoad()


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

    const getProductsFilter = () => {
        const res = selectDepartamento === null ? products.filter((item) => item.familia === familia) : products.filter((item) => item.familia === familia && item.departamento === selectDepartamento) 
        setProductos(res);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }

    const resetearDepartamento = () => {
        setSelectDepartamento(null)
    }

    useEffect(() => {
        resetearDepartamento()
    },[familia])


    useEffect(() => {
        getProductsFilter()
    }, [familia, selectDepartamento])

    const handleClick = (event) => {
        setSelectDepartamento(event.target.dataset.depto)
        setOpen(false)
    }

    const usersPerPage = 60
    const pagesVisited = pageNumber * usersPerPage

    const displayUsers = productos
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map(({codigo, nombre, precio, departamento}) => {
      return(
        <Card 
          key={codigo}
          codigo={codigo}
          nombre={nombre}
          precio={precio}
          departamento={departamento}
        />
      );
    });

  const pageCount = Math.ceil(productos.length / usersPerPage);
  
  const changePage = ({selected}) => {
      setPageNumber(selected);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
  }

  const handleClickOpen = (event) => {
    setOpen(!open)
    // setSelectDepartamento(event.target.dataset.depto)
}

  return (
    <>
    {
        load ? 
        <Loading />
        : 
        <>
            <Menu />
            <div className='wrap'>
                <section className='wrap-productos'>
                    <aside className='menu-departamentos'>
                        <button className='btn-departamentos' onClick={handleClickOpen}>
                            {familia}<span>{selectDepartamento!= null ? ` / ${selectDepartamento} ` : ''}</span><VscChevronDown />
                        </button>
                        <div>
                            <h3>{familia}</h3>
                            <ul className='list-departamentos view-desktop' data-aos="fade-up">
                                {
                                    arrayMenu.filter((item) => item.familia === familia)[0].departamentos.map((item) =>{
                                        return(
                                            <li><Link to='' onClick={handleClick} data-depto={item} className={`${item === selectDepartamento ? 'depto-active': ''}`}>{item}</Link></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        
                        {
                            open ? (
                                <ul className='list-departamentos' data-aos="fade-up">
                                    {
                                        arrayMenu.filter((item) => item.familia === familia)[0].departamentos.map((item) =>{
                                            return(
                                                <li><Link to='' onClick={handleClick} data-depto={item} className={`${item === selectDepartamento ? 'depto-active': ''}`} name="item-departamento">{item}</Link></li>
                                            )
                                        })
                                    }
                                </ul>
                            ):('')
                        }
                    </aside>
                    <section className='container-card-productos'>
                        
                        <div className='container-cards'>
                            {displayUsers}
                        </div>

                        <ReactPaginateProps 
                            previousLabel={"Anterior"}
                            nextLabel={"Siguiente"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previusBtn"}
                            nextLinkClassName={"nextBtn"}
                            disabledClassName={"paginatioDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </section>
                </section>
            </div>
            <Footer />
        </>

    }
    </>

  )
}
