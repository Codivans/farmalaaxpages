import React,{ useEffect } from 'react';

import banner from './../assets/Banners/banner1.png';
import imgGenericos from './../assets/img/genericos.png'
import imgDesodorantes from './../assets/img/desodorante.png'
import imgCuracion from './../assets/img/curacion.png'
import imgFormulas from './../assets/img/formulas.png'
import imgSueros from './../assets/img/sueros.png'
import imgSaludSexual from './../assets/img/salud-sexual.png'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { CarruselUno } from '../components/CarruselUno';
import { CarruselDos } from '../components/CarruselDos';
import { Menu } from '../components/Menu';
import { Footer } from '../components/Footer';
import { useLoad } from '../context/LoadContext';
import { Loading } from '../components/Loading';
import { Link } from 'react-router-dom';

export  function Home() {
    const { load } = useLoad()

    useEffect(() => {
        AOS.init();
      }, [])


  return (
    
    <>
        {
            load ? <Loading />
            :(
                <>
                    <Menu />
                    <div className='banner'>
                        <img src={banner} />
                    </div>
                    <CarruselUno />
                    <div className='wrap'>
                        <div className='row-columns'>
                            <Link to='/productos/MEDICAMENTO' className='column-2 bg-grey' data-aos="fade-up">
                                <div className='header-card-ofer' data-aos="fade-up">
                                    <h3 className='color-green'>Genéricos</h3>
                                    <h2 className='color-orange'>3x2</h2>
                                </div>
                                <img src={imgGenericos} className='image-menu-cards'/>
                            </Link>
                            <Link  to='/productos/PERFUMERIA' className='column-1 bg-orangeDark' data-aos="fade-up">
                                <div className='header-card-ofer' data-aos="fade-up">
                                    <h3 className='color-white'>Desodorantes</h3>
                                </div>
                                <img src={imgDesodorantes} className='image-menu-cards'/>
                            </Link>
                            <Link  to='/productos/EQUIPOS Y BOTIQUIN' className='column-1 bg-blueDark' data-aos="fade-up">
                                <div className='header-card-ofer' data-aos="fade-up">
                                    <h3 className='color-white'>Curación</h3>
                                </div>
                                <img src={imgCuracion} className='image-menu-cards'/>
                            </Link>
                        </div>

                        <div className='row-columns'>
                            <Link  to='/productos/BEBES' className='column-1 bg-blueLight' data-aos="fade-up">
                                <div className='header-card-ofer' data-aos="fade-up">
                                    <h3 className='color-white'>Formulas Infantiles</h3>
                                </div>
                                <img src={imgFormulas} className='image-menu-cards'/>
                            </Link>
                            <Link  to='/productos/SUEROS ORALES' className='column-1 bg-purple' data-aos="fade-up">
                                <div className='header-card-ofer' data-aos="fade-up">
                                    <h3 className='color-white'>Sueros Orales</h3>
                                </div>
                                <img src={imgSueros} className='image-menu-cards'/>
                            </Link>
                            <Link  to='/productos/SALUD SEXUAL' className='column-2 bg-pink' data-aos="fade-up">
                                <div className='header-card-ofer' data-aos="fade-up">
                                    <h3 className='color-purple'>Salud</h3>
                                    <h3 className='color-purple'>Sexual</h3>
                                </div>
                                <img src={imgSaludSexual} className='image-menu-cards'/>
                            </Link>
                        </div>
                    </div>
                    <CarruselDos />
                    <Footer />
                </>
            )
        }
        
        
    </>
  )
}
