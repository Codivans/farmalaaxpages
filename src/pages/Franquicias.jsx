import React from 'react'
import { Menu } from '../components/Menu'
import { Footer } from '../components/Footer'
import { VscVmOutline, VscLocation, VscPackage, VscFolderActive } from 'react-icons/vsc';
import { useLoad } from '../context/LoadContext';
import { Loading } from '../components/Loading';
import { CarruselModelosNegocio } from '../components/CarruselModelosNegocio';

export const Franquicias = () => {

  const {load } = useLoad()

  return (
    <>
      {
        load ? (<Loading />):
        (
          <>
          <Menu />
            <div>
              <div className='wrap wrap-franquicias'>
                <h2>Modelos de negocios <span className='txt-brand'>Farma<span>LAAX</span></span></h2>
              </div>
              <div className='contenido-cards-inversion'>
                <CarruselModelosNegocio data-aos="fade-up" />
                <div className='container-margen' data-aos="fade-left">
                  <p>Margen de ganancia <b>25%</b> y retorno de inversión en <b>24 meses</b></p>
                </div>
              </div>

              <div className='container-ventajas' >
                <div className='wrap wrap-txt-ventajas'>
                  <h2>Ventajas</h2>
                  <p>Al adquirir tu franquicia obtendras estos beneficios.</p>
                </div>

                <div className='container-services'>
                  <div className='column-services' data-aos="fade-right">
                    <div className='icon-service'>
                      <VscVmOutline />
                    </div>
                    <div className='info-services'>
                      <h3>Servicios Integrales</h3>
                      <p>Al adquirir una farmacia FARMALAAX, se 
                      proporcionará el mobiliario y equipo de cómputo necesarios 
                      para la operación.</p>
                    </div>
                  </div>

                  <div className='column-services' data-aos="fade-right">
                    <div className='icon-service'>
                      <VscLocation />
                    </div>
                    <div className='info-services'>
                      <h3>Ubicación Estratégica</h3>
                      <p>Ayudaremos a encontrar la ubicación 
                      óptima o revisaremos la viabilidad del lugar existente en función 
                      de la rentabilidad.</p>
                    </div>
                  </div>

                  <div className='column-services' data-aos="fade-left">
                    <div className='icon-service'>
                      <VscPackage />
                    </div>
                    <div className='info-services'>
                      <h3>Suministro Eficiente</h3>
                      <p>Como proveedores, ofreceremos precios 
                      competitivos y existencias aseguradas gracias a nuestro CEDIS y 
                      distribuidoras oficiales.</p>
                    </div>
                  </div>

                  <div className='column-services' data-aos="fade-left">
                    <div className='icon-service'>
                      <VscFolderActive />
                    </div>
                    <div className='info-services'>
                      <h3>Experiencia y Soporte</h3>
                      <p>Con más de 50 años de experiencia en 
                      otro proyecto de farmacias, brindaremos asesoramiento en 
                      documentación, permisos, apertura y operación..</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          <Footer />
          </>
        )
      }
    </>
  )
}
