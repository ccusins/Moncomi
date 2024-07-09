require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);
app.use(express.static('public'));
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'support.html'));
});

app.get('/diffusers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusers.html'));
});

app.get('/candles', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'candles.html'));
});

app.get('/candlestpc', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'candlestpc.html'));
});

app.get('/candleshom', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'candleshom.html'));
});

app.get('/candlesore', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'candlesore.html'));
});

app.get('/diffuserstpc100', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffuserstpc100.html'));
});

app.get('/diffuserstpc200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffuserstpc200.html'));
});

app.get('/diffusershom100', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusershom100.html'));
});

app.get('/diffusershom200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusershom200.html'));
});

app.get('/diffusersore100', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusersore100.html'));
});

app.get('/diffusersore200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusersore200.html'));
});

app.get('/diffusersvro100', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusersvro100.html'));
});

app.get('/diffusersvro200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusersvro200.html'));
});

app.get('/candlesvro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'candlesvro.html'));
});

app.get('/votives', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'votives.html'));
});

app.get('/3wick', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'threewick.html'));
});
  
app.get('/moncomiapi/createorder', async(req, res) => {
    
    const name = req.query.name;
    const phone = req.query.phone;
    const email = req.query.email;
    const item = req.query.item;
    const message = req.query.text;

    const notificationMessage = `NEW ENQUIRY \n\n NAME: ${name} \n PHONE: ${phone} \n ITEM: ${item} \n MESSAGE: ${message}`
    twilioClient.messages
    .create({
        body: notificationMessage,
        from: process.env.TWILIO_NUMBER,
        to: '07976641810',
    });


    try {

        await axios.get(`https://moncomi.pythonanywhere.com/createorder/${name}/${phone}/${email}/${item}/${message}`)

        res.send(`<div class="border border-green-400 px-8 py-4 rounded text-white text-lg font-bold">Your enquiry was successfully received! Expect a text or email ASAP.</div>`)

    } catch(error) {

        res.send(`<div class="border border-red-400 px-8 py-4 rounded text-white text-lg font-bold">There was an error receiving your enquiry, please refresh and try again.</div>`)

    }

});

app.get('/moncomiapi/orderreplied', async(req, res) => {
    const id = req.query.id;

    await axios.get(`https://moncomi.pythonanywhere.com/setreplied/${id}`)

    badgeDiv = `<div class="px-4 py-2 rounded bg-green-400 text-black font-bold">Replied</div>`
    statusDiv = `
    <div class='flex flex-row gap-4'>
        ${badgeDiv}
    </div>`

    res.send(statusDiv);

});

app.get('/moncomiapi/getorders', async(req, res) => {
    const response = await axios.get(`https://moncomi.pythonanywhere.com/getorders`)
    const data = response.data;

    const orders = data.orders;

    const ordersHTML = orders.map(order => {

        let statusDiv = '';
        if (order.replied === 0) {
            badgeDiv = `<div class="px-4 py-2 rounded bg-orange-400 text-black font-bold">Not Replied</div>`
            statusDiv = `
            <div class='flex flex-row gap-4'>
            ${badgeDiv}
            <button hx-get='/moncomiapi/orderreplied' hx-trigger='click' hx-target='#status${order.id}' hx-swap="innerHTML" hx-vals='{"id": "${order.id}"}' class="flex flex-row gap-4 items-center rounded p-2 bg-white text-black font-bold text-lg transition-transform duration-300 hover:scale-[102%] hover:bg-gray-100">I've Contacted Them<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg></button>
            </div>
            `
        } else {
            badgeDiv = `<div class="px-4 py-2 rounded bg-green-400 text-black font-bold">Replied</div>`
            statusDiv = `
            <div class='flex flex-row gap-4'>
                ${badgeDiv}
            </div>
            `
        }

        return `
        <div key=${order.id} class="w-[30%] flex flex-col gap-4 px-8 py-4 border border-zinc-700 bg-zinc-900 rounded items-start">
        <div class='w-[100%]' id='status${order.id}'>
        ${statusDiv}
        </div>
        
    
        <div class="flex flex-row gap-4">
            <div class="text-white text-lg font-bold">Name:</div>
            <div class="text-white text-lg">${order.name}</div>
        </div>
        
        <div class="flex flex-row gap-4">
            <div class="text-white text-lg font-bold">Email:</div>
            <div class="text-white text-lg">${order.email}</div>
        </div>

        <div class="flex flex-row gap-4">
            <div class="text-white text-lg font-bold">Phone:</div>
            <div class="text-white text-lg">${order.phone}</div>
        </div>

        <div class="flex flex-row gap-4">
            <div class="text-white text-lg font-bold">Product:</div>
            <div class="text-white text-lg">${order.item}</div>
        </div>

        <div class="flex flex-row gap-4">
            <div class="text-white text-lg font-bold">Message:</div>
            <div class="text-white text-lg">${order.message}</div>
        </div>
    </div>
        `
    }).join('');

    res.send(ordersHTML);

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});



