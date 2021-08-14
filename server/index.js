import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import postsRoutes from './routes/posts.js'

const app = express();

app.use('/posts', postsRoutes)



app.use(bodyParser.json({limit: "30mb", extended: "true"})); //this tells the system u want the json to be used, returns middleware that only parses json
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true"})); //tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
app.use(cors())


const CONNECTION_URL = 'mongodb://marcela-admin:secretcrowds3@tests-shard-00-00.7givf.mongodb.net:27017,tests-shard-00-01.7givf.mongodb.net:27017,tests-shard-00-02.7givf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-9zc7n7-shard-0&authSource=admin&retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)