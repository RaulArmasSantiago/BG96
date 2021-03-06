//Generales
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser'
import axios from 'axios';

//Apollo
import {createServer} from 'http';
import { ApolloServer} from 'apollo-server-express';

// Imports: GraphQL TypeDefs & Resolvers
import typeDefs from './src/graphql/schema';
import resolvers from './src/graphql/Resolvers/resolvers';

//MODELOS
import Gps from './src/models/Gps.js'


const app = express();

const PORT = process.env.PORT || 3001

/**
 * Aqui definimos la conexion a la base de datos MongoBD
 */
mongoose.connect('mongodb://iotaxi1:sistemasiotaxi1@ds157614.mlab.com:57614/iotaxi',{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify:false, })
//mongoose.connect('mongodb://localhost:27017/iotaxi')
const db = mongoose.connection;
db.once('error', () => console.log("Error al conectar a la BD"))
    .once('open', () => console.log("Conectado a la BD!!"))

app.use(bodyParser.json());
app.use(cors());


app.post('/upstreamCallback', (req,res) => {
  console.log("UPDATE")
  let body = req.body;
  axios({
    url:`https://gps-bg96.azurewebsites.net/graphql`,
    //url:`http://localhost:3001/graphql`,
    method:'post',
    data:{
      query:`
        mutation{
          updateGps(
            IMEI:"${body.IMEI}"
            latitud:"${body.latitud}"
            longitud:"${body.longitud}"
          ){
            IMEI,
            latitud,
            longitud
          }
        }
      `
    }
  }).then(resp => {
    res.status(200).json({
      data:{
        latitud: `${body.latitud}`, 
        longitud: `${body.longitud}`
      }, 
      imei: `${body.IMEI}`,
      sendTime: `${Date.now()}`
    })
  }).catch(error => {
    res.status(400)
  })
})

app.post('/downstreamCallback', (req,res) => {
  let body = req.body;
  axios({
    url:`https://gps-bg96.azurewebsites.net/graphql`,
    //url:`http://localhost:3001/graphql`,
    method:'post',
    data:{
      query:`
        mutation{
          updateGps(
            IMEI:"${body.IMEI}"
            latitud:"${body.latitud}"
            longitud:"${body.longitud}"
          ){
            IMEI,
            latitud,
            longitud
          }
        }
      `
    }
  })
  res.status(200).json({message: "Actualizado"})

})

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  subscriptions:{
    onConnect: () => {
      console.log("🚀 Connected 🚀")
    },
    onDisconnect: () => {
      console.log("Disconected")
    }
  },
  tracing: process.env.NODE_ENV !== "production"
});

apolloServer.applyMiddleware({ app });


const httpServer = createServer(app);

apolloServer.installSubscriptionHandlers(httpServer);



httpServer.listen({port: PORT}, () =>{
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at wss://localhost:${PORT}${apolloServer.subscriptionsPath}`)
})