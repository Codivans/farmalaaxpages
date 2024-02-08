import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

const useObtenerCatalogo = () => {
    const [catalogo, setCatalogo] = useState([]);
  
    useEffect(() => {
        const consultarDocumento = () => {
            const consultarCatalogo = query(
                collection(db, 'catalogo')
            );
            const unsuscribe = onSnapshot(
                consultarCatalogo,
                (QuerySnapshot) => {
                    setCatalogo(QuerySnapshot.docs.map((documento) => {
                        return { ...documento.data()}
                    }))
                }
            );
            return unsuscribe
        }
        consultarDocumento();
    },[])

    return catalogo;    
}

export default useObtenerCatalogo;