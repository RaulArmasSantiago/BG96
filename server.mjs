
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import DataAzure from './src/models/datosAzure.mjs'
import bodyParser from 'body-parser'
import EventHub from '@azure/event-hubs'
import express from 'express';


const app = express();
const PORT = process.env.PORT || 3001

mongoose.connect('mongodb://iotaxi1:sistemasiotaxi1@ds157614.mlab.com:57614/iotaxi',{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true})
//mongoose.connect('mongodb://localhost:27017/iotaxi')
const db = mongoose.connection;
db.on('error', () => console.log("Error al conectar a la BD"))
    .once('open', () => console.log("Conectado a la BD!!"))

app.use(bodyParser.json());
app.use(cors());

app.get('/allDevices', (req,res) => {
    DataAzure.find().then(rep => {
        console.log(rep)
        return res.status(201).json(rep)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/newDev', (req,res) => {
    let body = req.body;
    DataAzure.create(body).then((data) => {
        console.log("Guardado: " + data)
    }).catch((err) => {
        console.log(err);
    })
})

app.get('/', (req, res) => {
    res.send("Estoy funcionando :)")
})

app.listen(PORT, () => {
    console.log("Magic Happens in port: " + PORT)
})

var connectionString = 'HostName=breackout9695.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=l5/wjib3d9hb9xBM0oCcdJak9x4vWttECN4c/bf2B8s=';
                       //'HostName=breackout9695.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=l5/wjib3d9hb9xBM0oCcdJak9x4vWttECN4c/bf2B8s=';
var printError = (err) => {
    console.log(err)
}

var printMessage = (message) => {
    console.log('Telemetry received: ')
    let body = message.body
    console.log(`BODY ${body}`)
    DataAzure.findOneAndUpdate({IMEI:body.IMEI}, {$set: {body}}, {new:true}, (err,dev) => {
        console.log(`Datos ${dev}`)
        console.log(`Error ${err}`)
    })
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
}).catch(printError);