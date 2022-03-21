const server = require('./src/app');
const {conn} = require('./src/db');

conn.sync({force: true}).then(()=>{
    server.listen(3001, ()=>{
        console.log('Listening at 3001')
    })
})