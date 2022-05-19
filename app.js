import express from "express";
import config from "config";
import mongoose from "mongoose";
import router from "./routes/auth.routes.js";
import routerLinks from "./routes/link.routes.js";
import redirRout from "./routes/redirect.routes.js";
import path from "path";
import cors from 'cors'
import { fileURLToPath} from 'url'

const app = express()


__dirname = path.dirname(fileURLToPath(process.env.url))

// app.use(router)
app.use(cors())
app.use(express.json({extended:true}))
app.use('/t', redirRout)
app.use('/api/auth', router)
app.use('/api/link', routerLinks)

if(process.env.NODE_ENV === 'prodaction') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    } )
}


const PORT = config.get('port') || 5000

async function start(){
    try {
       await mongoose.connect(config.get('mongoUri'))
       app.listen(PORT, ()=>{
        console.log(`App has been started ${PORT}`)})
    } catch (error) {
        console.log('Server Error', error)
        process.exit(1)
    }
}

start()




