const url = "http://localhost:8080/api/auth";

const login = async (credentials) => {
    const data = await fetch(url+"/authenticate" ,{
        method: "POST" ,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
    });
    return data;
}

export default login;