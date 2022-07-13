
const url = "http://localhost:8080/api/usuarios";

export const getUsuarioById = async (datos) =>{
    const {tokenAcceso, id} = datos;
    const data = await fetch(url+"/"+id);
    const resp = await data.json();
    return resp;
}

export const updateUsuario = async (datos, token) =>{
    const data = await fetch(url + ('/'+datos.idUsuario), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.tipoToken} ${token.tokenAcceso}`,
        },
        body: JSON.stringify(datos),
    });
    return data;
}

