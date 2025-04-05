import app from './app.js'
import { createServer } from 'http'
import config from './config/config.js'
import AppDataSource from './config/db.js'
const server = createServer(app)
const port: number = parseInt(config.PORT)

AppDataSource.initialize().then(()=>{
    server.listen(port, ()=>{
        console.log(`server is running on port ${port}`)
    })

})
