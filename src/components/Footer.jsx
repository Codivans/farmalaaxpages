import React from 'react'
import logotipo from './../assets/img/farmalaax.svg';
import facebook from './../assets/img/facebook.png'
import whatsapp from './../assets/img/whatsapp.png'
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa'

export const Footer = () => {
  return (
        <footer>
            <div className='wrap wrap-footer'>
                <div>
                    <h2>Información</h2>
                    <ul>
                        <li><Link to='/nosotros'>¿Quienes somos?</Link></li>
                        <li><Link to='/nosotros'>Misión y Visión</Link></li>
                        <li><Link to='/franquicias'>Franquicias</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Navegación</h2>
                    <ul>
                        <li><Link to='/productos/MEDICAMENTO'>Medicamento</Link></li>
                        <li><Link to='/productos/PERFUMERIA'>Perfumeria</Link></li>
                        <li><Link to='/productos/ABARROTES'>Abarrotes</Link></li>
                        <li><Link to='/productos/EQUIPOS Y BOTIQUIN'>Curación</Link></li>
                        <li><Link to='/productos/SUEROS ORALES'>Sueros Orales</Link></li>
                        <li><Link to='/productos/SALUD SEXUAL'>Salud Sexual</Link></li>
                    </ul>
                </div>
                <div>
                    <h2>Contacto</h2>
                    <div className='container-img-social'>
                        <Link to="https://www.facebook.com/profile.php?id=61550733921151" target="_blank"><FaFacebook className='icon-facebook'/></Link>
                        <Link to="/"><FaWhatsapp className='icon-whatsapp'/></Link>
                    </div>

                    <p><b>Domicilio:</b> Calle 17 #8, Col. Las Aguilas, Ciudad Nezahualcoyotl, EdoMex</p>
                    <p><b>Cel:</b> 55 3455 8149</p>
                </div>
            </div>
            <div className='copyright-text'>
                <span>Todos los derechos reservados 2023 © - FarmaLAAX</span>
                <span>website created by @codivans</span>
            </div>
        </footer>
  )
}
