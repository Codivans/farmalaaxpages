import { db } from './firebaseConfig';
import { doc, setDoc, deleteDoc  } from "firebase/firestore";

const cargarCatalogo = async (catalogo) => {

    await deleteDoc(doc(db, "catalogo", 'volante'));

    const data = await catalogo.map(({codigo, nombre, precio, sustancia, oferta, departamento}) => {
        return (
            {
                codigo: codigo,
                nombre: nombre,
                precio: precio,
                oferta: oferta,
                sustancia: sustancia,
                departamento: departamento
            }
        )
    });

    await setDoc(doc(db, "catalogo", 'volante'), {
        catalogo
      });
}

export default cargarCatalogo;
