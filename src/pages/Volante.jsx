import React,{ useState, useEffect } from 'react';
import './../App.css';
import { IoCart } from "react-icons/io5";
import { MdClose, MdDelete, MdKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdMenu, MdArrowBack, MdOutlineKeyboardArrowUp   } from "react-icons/md";
import { CardProduct } from '../components/CardProduct';
import { Link } from 'react-router-dom';
import useObtenerCatalogo from '../hooks/useObtenerCatalogo';
import imglogo from '../assets/img/farmalaaxwhite.png'


export const Volante = () => {
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);
    const [showProducts, setShowProducts] = useState(true);
    const [filtro, setFiltro] = useState('')
    const catalogo = useObtenerCatalogo();
    const [openMenu, setOpenMenu] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [nombre, setNombre] = useState('');
    const [calle, setCalle] = useState('');
    const [colonia, setColonia] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');

    const imagenDefault = (e) =>{
      e.target.src =  'https://farmaprontoneza.com/image/farmalaax.jpg' 
    }


    const cleanData = () => {
      setNombre('');
      setCalle('');
      setColonia('');
      setMunicipio('');
      setCodigoPostal('');
    }
  
    const addToCart = (product) => {
        const existingCartItem = cart.find((item) => item.codigo === product.codigo);
    
        if (existingCartItem) {
          // Si el producto ya está en el carrito, incrementa la cantidad
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.codigo === product.codigo
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } else {
          // Si el producto no está en el carrito, agrégalo
          setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
        }
      };
    
      const removeFromCart = (product) => {
        const existingCartItem = cart.find((item) => item.codigo === product.codigo);
    
        if (existingCartItem.quantity > 1) {
          // Si la cantidad es mayor que 1, simplemente decrementa la cantidad
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.codigo === product.codigo
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          );
        } else {
          // Si la cantidad es 1, elimina el elemento del carrito
          setCart((prevCart) =>
            prevCart.filter((item) => item.codigo !== product.codigo)
          );
        }
      };

      const countCarrito = cart.reduce((acc,val) => acc + val.quantity,0)

      const importe = cart.reduce((acc, val) => acc + val.quantity * (val.oferta != 'NULL' ? val.oferta : val.precio),0)

      const showCart = () => {
        setShow(!show)
      }
      const showProductsCart = () => {
        setShowProducts(!showProducts)
      }

    const enviarPedido = () => {
      if(nombre === ''){
        setMessageAlert('*Necesitas colocar tu nombre')
      }else if(calle === ''){
        setMessageAlert('*Necesitas colocar tu calle y numero')
      }else if(colonia === ''){
        setMessageAlert('*Necesitas colocar tu colonia')
      }else if(municipio === ''){
        setMessageAlert('*Necesitas colocar el Municipio')
      }else if(codigoPostal === ''){
        setMessageAlert('*Necesitas colocar tu Codigo Postal')
      }else{

        const mensajePedido = generarMensajePedido();
        const numeroWhatsApp = '5518369947';  // Reemplaza con el número de WhatsApp deseado
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajePedido)}`;
        window.open(urlWhatsApp, '_blank');
        setCart([]);
        setShow(false);
        setShowProducts(false);
        cleanData();
      }
    }

    const generarMensajePedido = () => {
        let mensaje = `
          \nHola me interesaron estos productos, ¿me puedes tomar mi pedido por favor?\n
          \n*Nombre:* ${nombre}
          \nMi Dirección:
          \n*Calle:* ${calle}
          \n*Colonia:* ${colonia}
          \n*Municipio o Delegación:* ${municipio}
          \n*Código Postal:* ${codigoPostal}
          \n*Detalle de mi pedido:*
        `;

        cart.forEach(item => {
        mensaje += `\n${item.quantity} ${item.quantity > 1 ? "Pzs - " : "Pza - "} ${item.codigo} \n ${item.nombre}\n Precio: $ ${item.oferta != 'NULL' ? item.oferta.toFixed(2) : item.precio.toFixed(2)}\n\n`;
        });

        const importeTotal = cart.reduce((total, item) => total + (item.oferta != 'NULL' ? item.oferta : item.precio) * item.quantity, 0);
        mensaje += `*Importe Total:* $${importeTotal.toFixed(2)}`;

        return mensaje;
    }

    const handleChangeNombre = (event) => {
      setNombre(event.target.value)
    }

    const handleChangeCalle = (event) => {
      setCalle(event.target.value)
    }

    const handleChangeColonia = (event) => {
      setColonia(event.target.value)
    }

    const handleChangeMunicipio = (event) => {
      setMunicipio(event.target.value)
    }

    const handleChangeCodigoPostal = (event) => {
      setCodigoPostal(event.target.value)
    }

    const catalogoVolante = catalogo.length > 0 ? catalogo[0].catalogo : []

    const handleChangeSearch = (event) => {
      setFiltro(event.target.value);
    }
    const handleClick = (valor) => {
      setFiltro(valor);
      setOpenMenu(!openMenu)
    }

    const catalogoFiltrado = catalogoVolante.filter(item => {
      return item.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
        item.sustancia.toLowerCase().includes(filtro.toLowerCase()) ||
        item.departamento.toLowerCase().includes(filtro.toLowerCase()) ;
    })

    const handleClickOpen = () => {
      setOpenMenu(!openMenu)
    }

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <>
        <header className='header-volante'>
            <img src={imglogo} title="Farmalaax" />
            <div>
              <button className='btn-menu' onClick={handleClickOpen}><MdMenu /></button>
              <input className='input-search' type='search' placeholder='Buscar producto' onChange={handleChangeSearch}/>

              <button id="btnOpenPopup" className="btn-cart" onClick={showCart}>
                  <IoCart />
                  <span id="cantidadCarrito">{countCarrito}</span>
              </button>
            </div>
        </header>
        <section className='content-cards'>
            {
                catalogoFiltrado.map((product) => (
                  <CardProduct product={product} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}/>
                ))
            }               
        </section>

        <div className={`menu ${openMenu === true ? 'open': ''}`}>
            <div className='header-menu-pop'>
              <MdArrowBack onClick={handleClickOpen}/>
              <h2>Menu</h2>
            </div>
            <nav>
              <ul>
                <label>Medicamentos</label>
                <li><Link to="#" onClick={() => handleClick('ETICO')}>Etico</Link></li>
                <li><Link to="#" onClick={() => handleClick('OTC')}>Otc</Link></li>
                <li><Link to="#" onClick={() => handleClick('GENERICOS')}>Genericos</Link></li>
                <li><Link to="#" onClick={() => handleClick('DERMOCOSMETICOS')}>Dermocosmetico</Link></li>

                <label>Perfumeria</label>
                <li><Link to="#" onClick={() => handleClick('BEBES')}>Bebes</Link></li>
                <li><Link to="#" onClick={() => handleClick('DESODORANTES')}>Desodorantes</Link></li>
                <li><Link to="#" onClick={() => handleClick('USO DIARIO')}>Uso diario</Link></li>
                <li><Link to="#" onClick={() => handleClick('CREMAS')}>Cremas</Link></li>
                <li><Link to="#" onClick={() => handleClick('SHAMPOO')}>Shampoo</Link></li>
                <li><Link to="#" onClick={() => handleClick('ANTIMICOTICOS')}>Antimicoticos</Link></li>
                <li><Link to="#" onClick={() => handleClick('TOALLAS FEMENINAS')}>Cuidado femenino</Link></li>

                <label>Incontinencia</label>
                <li><Link to="#" onClick={() => handleClick('INCONTINENCIA')}>Incontinencia</Link></li>

                <label>Diabetes</label>
                <li><Link to="#" onClick={() => handleClick('DIABETICOS')}>Equipo de medición</Link></li>

                <label>Material de Curación</label>
                <li><Link to="#" onClick={() => handleClick('MATERIAL DE CURACION')}>Incontinencia</Link></li>

                <label>Salud Sexual</label>
                <li><Link to="#" onClick={() => handleClick('CONDONES')}>Condones</Link></li>
                  
              </ul>
            </nav>
        </div>
        {
          showButton &&(
            <button className='scroll-button' onClick={() => window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            })}>
              <MdOutlineKeyboardArrowUp />
            </button>
          )
        }
        
        

        {
          show&&
            <div id="popup" class="popup">
              <div class="popup-content">
                  <span className="close" id="btnClosePopup" onClick={showCart}><MdClose /></span>
                  <h2>Carrito de Compras</h2>
                  <div id="carrito" className={showProducts ? '' : 'ocultar-cart'}>
                    {
                      cart.map((item) => {
                        return(
                          <div className="product-cart">
                              <div className="img-product-cart">
                                  <img  loading="lazy" onError={imagenDefault} src={'https://farmaprontoneza.com/image/'+ parseInt(item.codigo) + '.jpg'} />
                              </div>
                              <div className="info-product">
                                  <h4>{item.nombre}</h4>
                                  <p>{item.quantity} {item.quantity > 1 ? 'Pzas': 'Pza'} x $ {item.oferta != 'NULL' ? item.oferta.toFixed(2) :  item.precio.toFixed(2)}</p>
                                  <p>$ { ((item.oferta != 'NULL' ? item.oferta : item.precio) * item.quantity).toFixed(2)}</p>
                              </div>
                              <div className='content-delete'>
                                <button onClick={() => removeFromCart(item)}>
                                  <MdDelete />
                                </button>
                              </div>
                          </div>
                        )
                      })
                    }
                  </div>

                  <div className="importeTotal">
                    <Link to="#" class="btn-delete-cart" onClick={() => setCart([])}>Vaciar carrito</Link>
                    <p>Total: $ {importe.toFixed(2)}</p>
                  </div>

                  <button className='btn-addres' onClick={showProductsCart}>
                    <p>
                      {showProducts ? 'Necesito mi pedido' : 'Ver detalle del carrito'}
                      {showProducts ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown  />}
                    </p>
                  </button>

                  <div className={showProducts ? 'content-addres' : 'content-addres-show'}>
                    <div className='control-inputs'>
                      <label>Nombre: </label>
                      <input type="text" placeholder='Escribe tu nombre' name="nombre" onChange={handleChangeNombre}/>
                    </div>
                    <div className='control-inputs'>
                      <label>Calle y numero: </label>
                      <input type="text" placeholder='Ej. Horacio Nelson #3' name="calle" onChange={handleChangeCalle}/>
                    </div>
                    <div className='control-inputs'>
                      <label>Colonia: </label>
                      <input type="text" placeholder='Ej. Moderna' name="colonia" onChange={handleChangeColonia}/>
                    </div>
                    <div className='control-inputs'>
                      <label>Municipio o  Delegacion: </label>
                      <input type="text" placeholder='Benito Juarez' name="municipio" onChange={handleChangeMunicipio}/>
                    </div>
                    <div className='control-inputs'>
                      <label>Codigo Postal: </label>
                      <input type="text" placeholder='03510' name="cp" onChange={handleChangeCodigoPostal}/>
                    </div>
                    <div class="botones-cart">
                        <p className='message-alert'>{messageAlert}</p>                        
                        <button class="btn-send" onClick={enviarPedido}>Enviar pedido por WhatsApp</button>
                    </div>
                  </div>
              </div>
            </div>
        }
    </>
  )
}
