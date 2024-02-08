import React from 'react';
import data from './../data/carrusel2';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export const CarruselDos = () => {
    const imagenDefault = (e) =>{
        e.target.src =  'https://farmaprontoneza.com/image/predeterminada.jpg' 
    }
  return (
        <div className='carrusel-products'>
            <Swiper
            slidesPerView={"auto"}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            spaceBetween={10}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            >
                {
                data.map(({codigo, nombre}) => {
                    return(
                        <SwiperSlide  key={codigo}>
                            <div className='card-product' data-aos="flip-left">
                                <div className='imagen-product'>
                                    <img loading="lazy" onError={imagenDefault} src={'https://farmaprontoneza.com/image/' + parseInt(codigo, 10) + '.jpg'} alt={nombre} />
                                </div>
                                <div className='container-info'>
                                    <h4>{nombre}</h4>
                                </div>
                            </div>
                        </SwiperSlide>

                    )
                })
            }
            </Swiper>
            
            
        </div>
  )
}
