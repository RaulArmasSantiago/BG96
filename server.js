//Generales
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import express from 'express';
import bodyParser from 'body-parser'
import axios from 'axios';

//Manejador de eentos IotHub Azure
import EventHub from '@azure/event-hubs'

//Apollo
import {createServer} from 'http';
import { ApolloServer} from 'apollo-server-express';

// Imports: GraphQL TypeDefs & Resolvers
import typeDefs from './src/graphql/schema';
import resolvers from './src/graphql/Resolvers/resolvers';

//Middleware: GrapgQL


//MODELOS
import Gps from './src/models/Gps.js'
import { posix } from 'path';

const PORT = process.env.PORT || 3001
const app = express();

/**
 * Aqui definimos la conexion a la base de datos MongoBD
 */
mongoose.connect('mongodb://iotaxi1:sistemasiotaxi1@ds157614.mlab.com:57614/iotaxi',{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify:false})
//mongoose.connect('mongodb://localhost:27017/iotaxi')
const db = mongoose.connection;
db.on('error', () => console.log("Error al conectar a la BD"))
    .once('open', () => console.log("Conectado a la BD!!"))

app.use(bodyParser.json());
app.use(cors());

/**
 * Aqui definimos los end-point de API Rest Libres
 */
// app.get('/allDevices', (req,res) => {
//     DataAzure.find().then(rep => {
//         console.log(rep)
//         return res.status(201).json(rep)
//     }).catch(err => {
//         console.log(err)
//     })
// })

// app.post('/newDev', (req,res) => {
//     let body = req.body;
//     DataAzure.create(body).then((data) => {
//         console.log("Guardado: " + data)
//         res.status(200).send(`Guardado ${data}`)
//     }).catch((err) => {
//         console.log(err);
//     })
// })

// app.post('/updateDev', (req,res) => {
//     let body = req.body;
//     DataAzure.findOneAndUpdate({IMEI:body.IMEI},{$set: body}, {new:true, useFindAndModify: false}).then(dev => {
//         console.log(dev)
//         res.status(200).send(dev)
//     }).catch(err => res.status(304).send(err))
// })

// app.get('/', (req, res) => {
//     res.send("Estoy funcionando :)")
// })

/*app.listen(PORT, () => {
    console.log("Magic Happens in port: " + PORT)
})*/

/**
 * Wrap the Express server
 */

app.post('/upstreamCallback', (req,res) => {
  let body = req.body;
  axios({
    url:`http://localhost:${PORT}${apolloServer.graphqlPath}`,
    method:'post',
    data:{
      query:`
        mutation{
          updateGps(
            IMEI:${body.IMEI}
            latitud:${body.latitud}
            longitud:${body.longitud}
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
  playground: {
    endpoint: `https://azureiothub-bg9596.herokuapp.com/graphql`,
    subscriptionEndpoint: `wss://azureiothub-bg9596.herokuapp.com/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});

apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({port: PORT}, () =>{
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at wss://localhost:${PORT}${apolloServer.subscriptionsPath}`)
})


/*Cliente de Azure IoTHub
var connectionString = 'HostName=breackout9695.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=l5/wjib3d9hb9xBM0oCcdJak9x4vWttECN4c/bf2B8s=';
                       //'HostName=breackout9695.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=l5/wjib3d9hb9xBM0oCcdJak9x4vWttECN4c/bf2B8s=';
var printError = (err) => {
    console.log(err)
}

var printMessage = (message) => {
    console.log('Telemetry received: ')
    let body = message.body
    console.log(`Message ${message}`)
    console.log(`BODY ${JSON.stringify(body)}`)
    DataAzure.findOneAndUpdate({IMEI:body.IMEI},{$set: body}, {new:true, useFindAndModify: false}).then(dev => {
        console.log(dev)
        res.status(200).send(dev)
    }).catch(err => res.status(304).send(err))
    console.log('Application properties (set by device): ')
    console.log(JSON.stringify(message.applicationProperties));
    console.log('System properties (set by IoT Hub): ')
    console.log(JSON.stringify(message.annotations));
    console.log('');
}

var ehClient;
EventHub.EventHubClient.createFromIotHubConnectionString(connectionString).then(function (client) {
  console.log("Successfully created the EventHub Client from iothub connection string.");
  ehClient = client;
  return ehClient.getPartitionIds();
}).then(function (ids) {
  console.log("The partition ids are: ", ids);  
  return ids.map(function (id) {
    return ehClient.receive(id, printMessage, printError, { eventPosition: EventHub.EventPosition.fromEnqueuedTime(Date.now()) });
  });
}).catch(printError);*/