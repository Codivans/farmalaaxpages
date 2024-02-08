import React from 'react'
import { Menu } from '../components/Menu'
import { Footer } from '../components/Footer'
import imgRound from './../assets/img/image-round.png'
import { useLoad } from '../context/LoadContext'
import { Loading } from '../components/Loading'

export const Nosotros = () => {

  const { load } = useLoad()
  return (
    <>
      {load ?(<Loading />):(
        <>
        <Menu />
        <div className='wrap article-about'>
          <div className='historia-txt'>
            <div className='txt-column' data-aos="flip-up">
              <h2 className='title-brand'>Nuestra Historia.</h2>
              <p><span className='txt-brand'>Farma<span>LAAX</span></span> se originó a partir de la visión de un equipo comprometido que comprendía las necesidades locales.
                Con experiencia en cadenas de farmacias y una cuidadosa selección de medicamentos y artículos de perfumería, 
                la primera sucursal se convirtió en un símbolo de calidad y comodidad, 
                marcando el inicio de nuestro compromiso inquebrantable con la comunidad y la atención al cliente.</p>
            </div>
            <div className='image-column' data-aos="fade-down-left">
              <img src={imgRound}/>
            </div>
          </div>
          
          <div className='container-mision-vision' id="mision">
            <div data-aos="zoom-in-down">
              <h2 className='title-brand'>Misión.</h2>
              <p>En <span className='txt-brand'>Farma<span>LAAX</span></span>, nuestra misión es brindar productos farmacéuticos de alta calidad a precios accesibles, siendo un socio confiable en la salud y el bienestar de las comunidades. Ofrecemos productos esenciales en un ambiente cercano y amigable, priorizando la comodidad y la atención personalizada.</p>
            </div>
  
            <div data-aos="zoom-in-down">
              <h2 className='title-brand'>Visión.</h2>
              <p><span className='txt-brand'>Farma<span>LAAX</span></span> aspira a ser la cadena de farmacias líder en México, reconocida por su accesibilidad, calidad y contribución a la salud y el bienestar de las comunidades.</p>
            </div>
          </div>
          <div className='valores' data-aos="fade-right">
            <h2 className='title-brand'>Valores de FarmaLAAX:</h2>
            <ul>
              <li><b>Compromiso con la Comunidad</b>: Valoramos y comprendemos las necesidades de nuestras comunidades locales en México. Estamos comprometidos a ser un recurso confiable en salud y bienestar.</li>
              <li><b>Calidad en la Selección:</b> Nos esforzamos por ofrecer una cuidadosa selección de medicamentos de alta calidad y artículos de perfumería, brindando a nuestros clientes productos confiables.</li>
              <li><b>Conveniencia y Accesibilidad:</b> Priorizamos la comodidad y la accesibilidad para nuestros clientes, asegurando que puedan acceder rápidamente a lo que necesitan en nuestras ubicaciones estratégicas.</li>
              <li><b>Dedicación a la Excelencia:</b> Buscamos la excelencia en cada aspecto de nuestro servicio al cliente, desde la atención personalizada hasta la calidad de nuestros productos.</li>
              <li><b>Innovación Constante:</b> Abrazamos la innovación para mantenernos a la vanguardia de la industria farmacéutica, brindando soluciones eficientes y efectivas a nuestros clientes.</li>
              <li><b>Ética y Responsabilidad:</b> Operamos con integridad y responsabilidad en todas nuestras acciones y decisiones, asegurando que nuestra comunidad confíe en nosotros.</li>
            </ul>  
          </div>
          
        </div>
        <Footer />
      </>
      )
      
    }
    </>
  )
}
