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
    const [data, setData] = useState({
      nombre: '',
      calle: '',
      colonia: '',
      municipio: '',
      cp: ''
    })
    const [filtro, setFiltro] = useState('')
    const catalogo = useObtenerCatalogo();
    const [openMenu, setOpenMenu] = useState(false);
    const [showButton, setShowButton] = useState(false);
  

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

      const importe = cart.reduce((acc, val) => acc + val.quantity * val.precio,0)

      const showCart = () => {
        setShow(!show)
      }
      const showProductsCart = () => {
        setShowProducts(!showProducts)
      }

    const enviarPedido = () => {
      const mensajePedido = generarMensajePedido();
      const numeroWhatsApp = '5518369947';  // Reemplaza con el número de WhatsApp deseado
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajePedido)}`;
      
      window.open(urlWhatsApp, '_blank');
      setCart([]);
      setShow(false);
      setShowProducts(false);
      setData({
        nombre: '',
        calle: '',
        colonia: '',
        municipio: '',
        cp: ''
      });
    }

    const generarMensajePedido = () => {
        let mensaje = `
          Hola me interesaron estos productos, ¿me puedes tomar mi pedido por favor?\n\n
          *Nombre:* ${data.nombre}\n\n
          Mi Dirección:
          *Calle:* ${data.calle}, *Colonia:* ${data.colonia}, *Municipio o Delegación:* ${data.municipio}, *Código Postal:* ${data.cp}\n\n
          *Detalle de mi pedido:*\n
        `;

        cart.forEach(item => {
        mensaje += `${item.quantity} ${item.quantity > 1 ? "Pzs" : "Pza"} ${item.codigo} \n ${item.nombre}\n Precio: $${item.precio.toFixed(2)}\n\n`;
        });

        const importeTotal = cart.reduce((total, item) => total + item.precio * item.quantity, 0);
        mensaje += `*Importe Total:* $${importeTotal.toFixed(2)}`;

        return mensaje;
        // vaciarCarrito();
    }


    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    };

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

    console.log(filtro)



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

                <label>Medicamentos</label>
                <li><Link to="#" onClick={() => handleClick('BEBES')}>Bebes</Link></li>
                <li><Link to="#" onClick={() => handleClick('DERMATOLOGIA')}>Dermatologia</Link></li>
                <li><Link to="#" onClick={() => handleClick('USO DIARIO')}>Uso diario</Link></li>

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
                                  <img src={'https://farmaprontoneza.com/image/'+ parseInt(item.codigo) + '.jpg'} />
                              </div>
                              <div className="info-product">
                                  <h4>{item.nombre}</h4>
                                  <p>{item.quantity} {item.quantity > 1 ? 'Pzas': 'Pza'} x $ {item.precio.toFixed(2)}</p>
                                  <p>$ { (item.precio * item.quantity).toFixed(2)}</p>
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
                    <Link to="#" class="btn-delete" onClick={() => setCart([])}>Vaciar carrito</Link>
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
                      <input type="text" placeholder='Escribe tu nombre' name="nombre" onChange={handleChange}/>
                    </div>
                    <div className='control-inputs'>
                      <label>Calle y numero: </label>
                      <input type="text" placeholder='Ej. Horacio Nelson #3' name="calle" onChange={handleChange}/>
                    </div>
                    <div className='control-inputs'>
                      <label>Colonia: </label>
                      <input type="text" placeholder='Ej. Moderna' name="colonia" onChange={handleChange}/>
                    </div>
                    <div className='control-inputs'>
                      <label>Municipio o  Delegacion: </label>
                      <input type="text" placeholder='Benito Juarez' name="municipio" onChange={handleChange}/>
                    </div>
                    <div className='control-inputs'>
                      <label>Codigo Postal: </label>
                      <input type="text" placeholder='03510' name="cp" onChange={handleChange}/>
                    </div>
                    <div class="botones-cart">
                        
                        <button class="btn-send" onClick={enviarPedido}>Enviar pedido por WhatsApp</button>
                    </div>
                  </div>
              </div>
            </div>
        }
    </>
  )
}
