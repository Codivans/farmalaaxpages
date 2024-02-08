import React from 'react'

export const Card = ({codigo, nombre}) => {
    const imagenDefault = (e) =>{
        e.target.src =  'https://farmaprontoneza.com/image/farmalaax.jpg' 
    }
  return (
    <div className='card-product' data-aos="flip-left">
        <div className='imagen-product'>
            <img loading="lazy" onError={imagenDefault} src={'https://farmaprontoneza.com/image/' + parseInt(codigo, 10) + '.jpg'} alt={nombre} />
        </div>
        <div className='container-info'>
            <h4>{nombre}</h4>
        </div>
    </div>
  )
}
