const router = require('express').Router();
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: process.env.DEV_ACCESS_TOKEN
})
//----> DEV_ACCESS_TOKEN = TEST-6493413234713799-032915-ecbe1d24b7ba19bc2819dcaa33ef00ee-535186645


router.post('/mercadoPago', async(req, res, next) => {
    try{
    const {email,items}=req.body
    //const {orderDetails, orderId} = req.body;
    //const {payer, items} = orderDetails;
    //const {email, ...} = payer;
    //----estructura de los items......
    // const item = {
    //   id: 'itemId',
    //   title: 'Producto',
    //   description: 'Descripcion del producto',
    //   picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
    //   category_id: 'categoryId',
    //   quantity: 1,
    //   currency_id: 'COP',
    //   unit_price: 100
    // }
    const preference = {
        auto_return: "approved",
        external_reference: 'orderId',
        items: items,
        payer: {
            name: "user-name",
            surname: "user-surname",
            email: email,
            date_created: "",
            phone: {
                area_code: '11',
                number: 4444-4444
            },
            identification: {
                type: "RUT", 
                number: '12345678'
            },
            address: {
                street_name: "Street",
                street_number: 123,
                zip_code: '5700'
            }
        },
        //notification_url: 'https://e2d1-190-107-20-98.ngrok.io/success',
        back_urls: {
            success: "http://localhost:3000/",
        }, 
        shipments: {
            receiver_address: { 
                zip_code: "5700",
                street_number: 123,
                street_name: "Street",
                floor: '4',
                apartment: "C"
            }
        },
    }
    const urlAccess = await mercadopago.preferences.create(preference)
    res.send({url: `https://sandbox.mercadopago.com.co/checkout/v1/modal?pref_id=${urlAccess.body.id}`})
    }catch(error){
        next(error)
    }
})

module.exports = router;