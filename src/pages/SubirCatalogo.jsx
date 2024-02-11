import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import cargarCatalogo from '../firebase/cargarCatalogo';
import { MdDeleteOutline } from "react-icons/md";
import { FaCloudArrowUp } from "react-icons/fa6";

export const SubirCatalogo = () => {
    const [catalogo, setCatalogo] = useState([]);

    const readExcel = (file) =>{
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const buffeArray = e.target.result;
                const wb = XLSX.read(buffeArray, {type: 'buffer'});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data=XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error)
            };
        });
        promise.then((d) => {
            setCatalogo(d);
        });
    };

    const handleSend = (e) =>{
        cargarCatalogo(catalogo)
        setCatalogo([])
        toast.success('Se subio satisfactoriamente!', {
            position: "bottom-right",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
        });          
    }
    const handleDelete = () =>{
        setCatalogo([]);
        readExcel('')
    }

  return (
    <div>
        <header className='header-admin'>
            <h2>Admin</h2>
        </header>
        <section className='container-admin'>
            {
                catalogo.length > 0 ? (
                    <div>
                        <div className='botonera-table'>
                            <button onClick={handleSend} className='btn-table'>
                               <FaCloudArrowUp /> Subir
                            </button>
                            <button onClick={handleDelete} className='btn-table btn-delete'>
                                <MdDeleteOutline /> Borrar
                            </button>
                        </div>
                        
                        <table className='table-datos'>
                            <thead>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Sustancia</th>
                                <th>Departamento</th>
                            </thead>
                            <tbody>
                                {
                                    catalogo.map(({codigo, nombre, precio, sustancia, departamento}) => {
                                        return(
                                            <tr key={codigo}>
                                                <td>{codigo}</td>
                                                <td>{nombre}</td>
                                                <td>{precio}</td>
                                                <td>{sustancia}</td>
                                                <td>{departamento}</td>
                                            </tr>
                                        )
                                    })
                                
                                }
                            </tbody>
                        </table>
                    
                    </div>
                    
                ) : (
                    <label onChange={(e) => {const file = e.target.files[0]; readExcel(file);}} className='btn-file'>
                        <div>
                            {/* <SiMicrosoftexcel /> <br/> */}
                            <span>Da click y sube tu archivo aqui</span>
                            <input hidden accept=".xlsx" multiple type="file" />
                        </div>
                    </label>
                )
            }
            
        </section>      
    </div>
  )
}
