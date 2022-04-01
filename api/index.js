const server = require('./src/app');
const {conn} = require('./src/db');
const preloadProducts = require('./src/preload/preload')

conn.sync({force: true}).then(()=>{
    server.listen(3001, async ()=>{
        await preloadProducts()
        console.log('Listening at 3001')
    })
})