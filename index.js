require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'order_processing.html'));
});

app.get('/roomSprays', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'roomsprays.html'));
});

app.get('/roomSprayVRO', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'roomsprayvro.html'));
});

app.get('/roomSprayTPC', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'roomSprayTPC.html'));
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

app.get('/diffusersspirit200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusersspirit200.html'));
});

app.get('/diffusersot200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusersot200.html'));
});

app.get('/diffusersocc200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusersocc200.html'));
});

app.get('/diffuserspaf200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffuserspaf200.html'));
});

app.get('/diffusersgl200', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'diffusersgl200.html'));
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

app.post('/moncomiapi/createorder', async(req, res) => {
    
    const { name, phone, email, item, text: message } = req.body;

    const notificationMessage = `NEW ENQUIRY \n\n NAME: ${name} \n PHONE: ${phone} \n ITEM: ${item} \n MESSAGE: ${message}`
    twilioClient.messages
    .create({
        body: notificationMessage,
        from: process.env.TWILIO_NUMBER,
        to: '07976641810',
    });


    try {

        await axios.post('https://moncomi.pythonanywhere.com/createorder', {
            name,
            phone,
            email,
            item,
            message
        });

        res.send(`<div class="border border-green-400 px-8 py-4 rounded text-white text-lg font-bold">Your enquiry was successfully received! Expect a text or email ASAP.</div>`)

    } catch(error) {
        const errorMessage = error.response.data.message;
        if (errorMessage === 'Duplicate enquiry detected. Please check your records.') {
            res.send(`<div class="border border-red-400 px-8 py-4 rounded text-white text-lg font-bold">You have already submitted this enquiry for this item!</div>`)    
        } else {
            res.send(`<div class="border border-red-400 px-8 py-4 rounded text-white text-lg font-bold">There was an error receiving your enquiry, please refresh and try again.</div>`)
        }
        

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

app.delete('/moncomiapi/deleteorder', async (req, res) => {
    const id = req.body.id; 

    try {
        
        await axios.delete(`https://moncomi.pythonanywhere.com/deleteorder/${id}`);
        res.send('');

    } catch (error) {
        console.error('Error deleting order:', error);
        res.send('')
    }
});

app.get('/moncomiapi/getorders', async(req, res) => {

    const status = req.query.status || 'all';
    let apiEndpoint = '';

    if (status === 'replied') {
        apiEndpoint = 'https://moncomi.pythonanywhere.com/getorders/replied';
    } else if (status === 'unreplied') {
        apiEndpoint = 'https://moncomi.pythonanywhere.com/getorders/unreplied';
    } else {
        apiEndpoint = 'https://moncomi.pythonanywhere.com/getorders/all';
    }

    const response = await axios.get(apiEndpoint);

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
                <button hx-get='/moncomiapi/deleteorder' hx-trigger='click' hx-target='#status${order.id}' hx-swap="outerHTML" hx-vals='{"id": "${order.id}"}' class="flex flex-row gap-4 items-center rounded p-2 bg-red-400 text-black font-bold text-lg transition-transform duration-300 hover:scale-[102%] hover:bg-gray-100">Delete<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg></button>
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



