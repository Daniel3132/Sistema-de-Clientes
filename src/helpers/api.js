export const url = 'https://clientes31.herokuapp.com/clientes';

const getData = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

export default getData