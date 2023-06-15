/**
 * Bot para whatsapp
 * web: https://kuatroestrellas.github.io/blog/
 * responde al hola mundo con un mensaje
 * requiere nodejs v12 o superior y las librerias qrcode-terminal y whatsapp-web.js
 * npm i qrcode-terminal whatsapp-web.js
**/

const qrcode = require('qrcode-terminal');

//Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

//Genera el código qr para conectarse a whatsapp-web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//Si la conexión es exitosa muestra el mensaje de conexión exitosa
client.on('ready', () => {
    console.log('Conexion exitosa nenes');
});


//Aquí sucede la magia, escucha los mensajes y aquí es donde se manipula lo que queremos que haga el bot
const makePrompt = require('./API')
client.on('message', message => {
    console.log(message)
    const match = true ///^-p\s/.test(message.body)

    if(match) {
        console.log('RECIBIDO')
       // client.sendMessage(message.from, 'Hace matchhh')
        makePrompt(message.body).then((res) => {
            client.sendMessage(message.from, res)
            console.log(res)
       })
    }
});

client.initialize();