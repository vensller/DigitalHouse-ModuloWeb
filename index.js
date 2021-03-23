const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

const listaUsuarios = [
    'Ivens',
    'Jailson',
    'Maria',
    'Natalia',
    'Ariel',
    'Nykolle'
]

app.use(express.static(path.join(__dirname, '/src/assets/')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Query Params
// Ex: localhost:3000/usuarios?nome=Ivens
app.get('/usuarios', (req, res) => {
    const { nome } = req.query;
    let listaRetorno = listaUsuarios.filter(i => i.includes(nome || ''));
    return res.json(listaRetorno);
});

// Route Params 
// Ex: ecommer.com.br/produtos/4/detalhes
app.get('/hello/:usuario', (req, res) => {    
    const { usuario } = req.params;
    return res.send(`Hello world ${usuario}`);
});

app.get('/pokemons', async (req, res) => {
    const responseAxios = await api.get('pokemon?limit=100&offset=200');
    const { data } = responseAxios;
    const retorno = {
        ...data,
        results: data.results.map(item => {
            item.greetings = 'Olá';            
            return item;
        })
    }
    return res.json(retorno);
});

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/src/views/index.html'));
});

app.post('/enviar-mensagem', (req, res) => {
    console.log(req.body);
    
    return res.send('OK');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});