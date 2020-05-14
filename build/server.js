'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _eventHubs = require('@azure/event-hubs');

var _eventHubs2 = _interopRequireDefault(_eventHubs);

var _graphql = require('graphql');

var _http = require('http');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _graphqlTools = require('graphql-tools');

var _types = require('./src/graphql/typedefs/types');

var _types2 = _interopRequireDefault(_types);

var _query = require('./src/graphql/resolvers/query');

var _query2 = _interopRequireDefault(_query);

var _mutation = require('./src/graphql/resolvers/mutation');

var _mutation2 = _interopRequireDefault(_mutation);

var _subscription = require('./src/graphql/resolvers/subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _schema = require('./src/graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

var _Gps = require('./src/models/Gps.js');

var _Gps2 = _interopRequireDefault(_Gps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Middleware: GrapgQL


// Imports: GraphQL TypeDefs & Resolvers


//GrpahQL
//Generales
var app = (0, _express2.default)();

//MODELOS


//Manejador de eentos IotHub Azure

var PORT = process.env.PORT || 3001;

_schema2.default.applyMiddleware({ app: app });
/**
 * Aqui definimos la conexion a la base de datos MongoBD
 */
_mongoose2.default.connect('mongodb://iotaxi1:sistemasiotaxi1@ds157614.mlab.com:57614/iotaxi', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
//mongoose.connect('mongodb://localhost:27017/iotaxi')
var db = _mongoose2.default.connection;
db.on('error', function () {
    return console.log("Error al conectar a la BD");
}).once('open', function () {
    return console.log("Conectado a la BD!!");
});

app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

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

var ws = (0, _http.createServer)(app);

ws.listen(PORT, function () {
    console.log('GraphQL Server is now Running on http://localhost:' + PORT);
    // Set up the WebSocket for handling GraphQL subscription
    new _subscriptionsTransportWs.SubscriptionServer({
        execute: _graphql.execute,
        subscribe: _graphql.subscribe,
        schema: (0, _graphqlTools.makeExecutableSchema)({ typeDefs: _types2.default, resolvers: { Query: _query2.default, Mutation: _mutation2.default, Subscription: _subscription2.default } })
    }, {
        server: ws,
        path: '/graphql'
    });
});

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