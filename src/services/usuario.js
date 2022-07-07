
const url = "http://localhost:8080/api/usuarios";

const getUsuarioById = async (datos) =>{
    const {tokenAcceso, id} = datos;
    const data = await fetch(url+"/"+id);
    const resp = await data.json();
    return resp;
}

export default getUsuarioById;