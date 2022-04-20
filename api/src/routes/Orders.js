const { Router } = require('express');
const {Products, Orders, Product_Line} = require('../db')
const {Op} = require('sequelize');
const router = Router();

router.get('/users/:email/cart', async (req, res) => {
    const {email} = req.params

    const cart = await Orders.findOne({where: 
        { UserEmail: email, status: 'Cart' }, attributes: ['total'],
        include: { model: Products, attributes: ['name', 'image']}
    })

    if(cart) res.send(cart)
    else res.status(404).send('Cart not found')
})
router.get('/users/orders', async (req, res) => {

    const history = await Orders.findAll({where: 
        { status: { [Op.ne]: 'Cart' } }, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('No hay ordenes creadas')
})
router.get('/users/orders/InProgress', async (req, res) => {

    const history = await Orders.findAll({where: 
        { status: 'In progress'}, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('No hay ordenes en progreso')
})
router.get('/users/orders/Complete', async (req, res) => {
    const history = await Orders.findAll({where: 
        { status: 'Complete'}, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('No hay ordenes completadas')
})

router.get('/orders', async (req, res, next)=> {
    try{
        const orders = await Orders.findAll({
            include: {model: Products}
        })
        res.send(orders)
    }catch(err){
        next(err);
    }
})



router.get('/users/:email/orders', async (req, res) => {
    const {email} = req.params

    const history = await Orders.findAll({where:  
        { UserEmail: {
            [Op.iLike]:`%${email}%`
            }
        }, 
        include: {model: Products}
    })
    if(history.length) res.send(history)
    else res.status(404).send('History not found')
})

router.get('/users/:email/order', async (req, res) => {
    const {email} = req.params

    const history = await Orders.findAll({where: 
        { UserEmail: email, status: { [Op.ne]: 'Cart' } }, 
        include: {model: Products}
    })

    if(history.length) res.send(history)
    else res.status(404).send('History not found')
})


router.post('/users/:email/cart', async (req, res) => {
    const {productId, amount} = req.body, {email} = req.params
    
    try {
        const [cart, created] = await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart'}})

        if(!created){
            const relation = await Product_Line.findOne({where: {ProductId: productId, OrderId: cart.id}})

            if(relation){
                relation.amount += amount
                await relation.save()
            }
            else {
                const product = await Products.findOne({where: {id: productId}})
                await cart.addProduct(product, {through: {amount, price: product.price}})   
            }
        }

        res.send(cart)
    }
    catch(e) {
        res.status(500).send(`${e}`)
    }
})


router.put('/users/:email/cart', async (req, res) => {
    const {productId, amount} = req.body, {email} = req.params

    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})
        const productLine = await Product_Line.findOne({where:{ProductId: productId}})
        console.log(productId)
        console.log(amount)
        if(productLine){
            switch(amount){
                case 'Increment':
                    console.log('entre')
                    productLine.amount+=1
                    break;
                case 'Decrement':
                    productLine.amount-=1
                    break;
                default: return res.status(500).send('An unknown value was entered')
            }
        await productLine.save()
        res.send(productLine)
        } else res.status(404).send('Relation not Found')

    //     if(amount>0){
    //         productLine.amount+=1
    //     }else {
    //         if(productLine.amount>1){
    //         productLine.amount-=1
    //     }
    //     }
    //         await productLine.save()
    //         res.send(productLine)
    }
    catch(e){
        res.status(500).send(`${e}`)
    }

})
router.put('/users/:email/changeStatusCart', async (req, res) => {
    const {email} = req.params
    const {name,lastname,direction,total} = req.body
    

    try {
        const cart = await Orders.findOne({
            where: {UserEmail: email, status: 'Cart'},
            include:{model: Products}
            })
        

            if(cart){
                cart.Products.map( async product => {
                    product.stock = product.stock - product.Product_Line.amount
                    await product.save()
                })
                cart.status = 'In progress'
                cart.total=total
                cart.direction=direction
                await cart.save()
                await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart',name:name,lastname:lastname}})
                return res.send('El status ha cambiado correctamente')
            } else res.status(404).send('Cart not found')
        }
        catch(e){
            res.status(500).send(`${e}`)
        }
    
    })
    router.put('/users/:email/changeToComplete', async (req, res) => {
        const {email} = req.params
        const {orderId}=req.body
        console.log(orderId)
        try {
            const cart = await Orders.findOne({
                where: {UserEmail: email, status: 'In progress',id:orderId},
                include:{model: Products}
                })
            
    
                if(cart){
                    cart.status = 'Complete'
                    await cart.save()
                    res.send('El status ha cambiado correctamente')
                    await transporter.sendMail({
                        from: "Latcom",
                        to: email,
                        subject: "Tu pedido ya salió",
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                        <head>
                        <meta charset="UTF-8">
                        <meta content="width=device-width, initial-scale=1" name="viewport">
                        <meta name="x-apple-disable-message-reformatting">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta content="telephone=no" name="format-detection">
                        <title>Nueva plantilla de correo electrC3B3nico 2022-04-18</title><!--[if (mso 16)]>
                        <style type="text/css">
                        a {text-decoration: none;}
                        </style>
                        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
                        <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG></o:AllowPNG>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                        </xml>
                        <![endif]-->
                        <style type="text/css">
                        #outlook a {
                        padding:0;
                        }
                        .ExternalClass {
                        width:100%;
                        }
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                        line-height:100%;
                        }
                        .es-button {
                        mso-style-priority:100!important;
                        text-decoration:none!important;
                        }
                        a[x-apple-data-detectors] {
                        color:inherit!important;
                        text-decoration:none!important;
                        font-size:inherit!important;
                        font-family:inherit!important;
                        font-weight:inherit!important;
                        line-height:inherit!important;
                        }
                        .es-desk-hidden {
                        display:none;
                        float:left;
                        overflow:hidden;
                        width:0;
                        max-height:0;
                        line-height:0;
                        mso-hide:all;
                        }
                        [data-ogsb] .es-button {
                        border-width:0!important;
                        padding:10px 20px 10px 20px!important;
                        }
                        @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-menu td a { font-size:16px!important } }
                        </style>
                        </head>
                        <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                        <div class="es-wrapper-color" style="background-color:#EFEFEF"><!--[if gte mso 9]>
                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile" color="#efefef"></v:fill>
                        </v:background>
                        <![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
                        <tr style="border-collapse:collapse">
                        <td valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr style="border-collapse:collapse">
                        <td class="es-adaptive" align="center" style="padding:0;Margin:0">
                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#efefef;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:270px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                        <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:270px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td></tr></table><![endif]--></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                        <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fef5e4;width:600px" cellspacing="0" cellpadding="0" bgcolor="#fef5e4" align="center">
                        <tr style="border-collapse:collapse">
                        <td align="left" bgcolor="#efefef" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;background-color:#efefef"><!--[if mso]><table style="width:570px" cellpadding="0" cellspacing="0"><tr><td style="width:275px" valign="top"><![endif]-->
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                        <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:275px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://ecommerce-app-fawn.vercel.app/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#999999;font-size:14px"><img class="adapt-img" src="https://vcwnhh.stripocdn.email/content/guids/879c7a69-ff2c-4325-baa9-bcb21f8254e7/images/latcom1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="275"></a></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:275px" valign="top"><![endif]-->
                        <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:275px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td></tr></table><![endif]--></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                        <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:0px" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:15px"><h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#333333">Gracias por tu compra!</h1></td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Tu pago&nbsp;fue aprobado y pronto estaremos enviando tu pedido!</p></td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:15px"><span class="es-button-border" style="border-style:solid;border-color:#2cb543;background:#3483fa;border-width:0px;display:inline-block;border-radius:5px;width:auto;border-top-width:0px;border-bottom-width:0px"><a href="https://ecommerce-app-fawn.vercel.app/user/myShop" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:underline;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:16px;border-style:solid;border-color:#3483fa;border-width:10px 20px 10px 20px;display:inline-block;background:#3483fa;border-radius:5px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;border-top-width:10px;border-bottom-width:10px">Ver estado de mi pedido</a></span></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                        <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:30px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]-->
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:280px">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#fef9ef;border-color:#efefef;border-width:1px 0px 1px 1px;border-style:solid" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fef9ef" role="presentation">
                        <tr style="border-collapse:collapse">
                        <td align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif">COMPRA:</h4></td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Orden #:</td>
                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">945645546</td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Fecha de la orden</td>
                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${cart.updatedAt}</td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Total de la orden</td>
                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${cart.total}</td>
                        </tr>
                        </table><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]-->
                        <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:280px">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#fef9ef;border-width:1px;border-style:solid;border-color:#efefef" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fef9ef" role="presentation">
                        <tr style="border-collapse:collapse">
                        <td align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif">DIRECCION ENVIO:</h4></td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${cart.direction}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${cart.direction}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${cart.direction}</p></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td></tr></table><![endif]--></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                        <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                        <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:270px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;padding-left:20px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif">ITEMS</h4></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                        <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:270px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" role="presentation">
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;font-size:13px">DESCRIPCION</td>
                        <td style="padding:0;Margin:0;width:60px;font-size:13px;line-height:13px;text-align:center">CANT.</td>
                        <td style="padding:0;Margin:0;width:100px;font-size:13px;line-height:13px;text-align:center">PRECIO</td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table>
                        
                        
                        <!--[if mso]></td></tr></table><![endif]--></td>
                        </tr>
                        
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0">
                        <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;border-bottom:1px solid #efefef;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        ${cart.Products.map(product => 
                            `
                        <tr style="border-collapse:collapse">
                        <td align="left" style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:178px" valign="top"><![endif]-->
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                        <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:178px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;font-size:0"><img src=${product.image}" alt=${product.name} class="adapt-img" title="Natural Balance L.I.D., sale 30%" width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td>
                        <td style="width:20px"></td><td style="width:362px" valign="top"><![endif]-->
                        <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:362px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p>
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" role="presentation">
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0">${product.name}</td>
                        <td style="padding:0;Margin:0;width:60px;text-align:center">${product.Product_Line.amount}</td>
                        <td style="padding:0;Margin:0;width:100px;text-align:center">${product.price}</td>
                        </tr>
                        </table><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td></tr></table><![endif]--></td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0">
                        <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;border-bottom:1px solid #efefef;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        `)}
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;display:none"></td>
                        
                        </tr>
                        </table></td>
                        
                        </tr>
                        </table></td>
                        </tr>
                        



                        
                        <tr style="border-collapse:collapse">
                        <td align="left" style="Margin:0;padding-top:5px;padding-left:20px;padding-bottom:30px;padding-right:40px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:540px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="right" style="padding:0;Margin:0">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="right" role="presentation">
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">Subtotal:</td>
                        <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">$${cart.total}</td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">PRECIO DE ENVIO:</td>
                        <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;color:#3483fa"><strong>GRATIS</strong></td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">DESCUENTO:</td>
                        <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">$0.00</td>
                        </tr>
                        <tr style="border-collapse:collapse">
                        <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px"><strong>TOTAL DE LA ORDEN:</strong></td>
                        <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;color:#3483fa"><strong>$${cart.total}</strong></td>
                        </tr>
                        </table><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table>


                        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                        <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FEF5E4;width:600px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:20px;Margin:0"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:178px" valign="top"><![endif]-->
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                        <tr style="border-collapse:collapse">
                        <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:178px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:362px" valign="top"><![endif]-->
                        <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:362px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table><!--[if mso]></td></tr></table><![endif]--></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0">
                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
                        <tr style="border-collapse:collapse">
                        <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                        <td align="center" style="padding:0;Margin:0;display:none"></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table></td>
                        </tr>
                        </table>
                        </div>
                        </body>
                        </html> `
                    })
                } else res.status(404).send('Cart not found')
            }
            catch(e){
                res.status(500).send(`${e}`)
            }
        
})
router.delete('/users/:email/cart', async (req, res) => {
    const {productId} = req.body, {email} = req.params

    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})
        const productLine = await Product_Line.findOne({ProductId: productId, OrderId: cart.id})
    
        if(productLine) {
            await productLine.destroy()
            res.send('The product was removed from cart')
        }
        else res.send('Relation not found')
    }
    catch(e){
        res.status(500).send(`${e}`)
    }
})

router.delete('/users/:email/emptycart', async (req, res) => {
    const {email} = req.params
    try {
        const cart = await Orders.findOne({where: {UserEmail: email, status: 'Cart'}})

        if(cart){
            // const items = await Product_Line.findAll({where: {OrderId: cart.id}})

            // if(items.length) {
                await cart.destroy()
                await Orders.findOrCreate({where: {UserEmail: email, status: 'Cart'}})
                res.send('The cart has been emptied')

            // }
            // else res.send('The cart is currently empty')
        }
        else res.status(404).send('Cart not found')
    }
    catch(e) {
        res.status(500).send(`${e}`)
    }
})


module.exports = router;