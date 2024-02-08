import React from 'react';
import data from './../data/carrusel1';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export const CarruselModelosNegocio = () => {
  return (
    <div className='contenido-modelos'>
        <Swiper
        slidesPerView={"auto"}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        spaceBetween={10}
        modules={[Pagination, Autoplay]}
        className="swiper-modelo"
        >
             <SwiperSlide className='wrap-modelo'>
                <div className='card-inversion'>
                    <div className='card-header-inversion'>Micro</div>
                    <div className='triangulo'></div>
                    <div className='card-body-inversion'>
                        <ul>
                        <li><p>Mobiliario y Equipos</p><span>$90,000</span></li>
                        <li><p>Inventario Patente</p><span>$180,000</span></li>
                        <li><p>Inventario Genérico</p><span>$50,000</span></li>
                        <li><p>Inventario Perfumería</p><span>$30,000</span></li>
                        <li><p>Uso de marca</p><span>$50,000</span></li>
                        </ul>
                    </div>
                    <div className='card-footer-inversion'><h4>$400,000</h4></div>
                </div>
            </SwiperSlide>

            <SwiperSlide className='wrap-modelo'>
                <div className='card-inversion'>
                  <div className='card-header-inversion bg-card-green'>Estandar</div>
                  <div className='triangulo triangulo-green'></div>
                  <div className='card-body-inversion'>
                    <ul>
                      <li><p>Mobiliario y Equipos</p><span>$120,000</span></li>
                      <li><p>Inventario Patente</p><span>$300,000</span></li>
                      <li><p>Inventario Genérico</p><span>$80,000</span></li>
                      <li><p>Inventario Perfumería</p><span>$50,000</span></li>
                      <li><p>Uso de marca</p><span>$50,000</span></li>
                    </ul>
                  </div>
                  <div className='card-footer-inversion bg-card-green'><h4>$600,000</h4></div>
                </div>
            </SwiperSlide>

            <SwiperSlide className='wrap-modelo'>
                <div className='card-inversion'>
                  <div className='card-header-inversion bg-card-yellow'>Premium</div>
                  <div className='triangulo triangulo-yellow'></div>
                  <div className='card-body-inversion'>
                    <ul>
                      <li><p>Mobiliario y Equipos</p><span>$160,000</span></li>
                      <li><p>Inventario Patente</p><span>$400,000</span></li>
                      <li><p>Inventario Genérico</p><span>$100,000</span></li>
                      <li><p>Inventario Perfumería</p><span>$90,000</span></li>
                      <li><p>Uso de marca</p><span>$50,000</span></li>
                    </ul>
                  </div>
                  <div className='card-footer-inversion bg-card-yellow'><h4>$800,000</h4></div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}
