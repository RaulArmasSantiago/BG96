require("babel-polyfill");
import {PubSub, withFilter} from 'apollo-server-express';
import GPS from '../../models/Gps';
import USER from '../../models/User';
import asyncify from 'callback-to-async-iterator'

//UTILS
import createToken from '../../utils/createToken'
import comparePassword from '../../utils/comparePasswords'

const pubsub = new PubSub()

const resolvers = {
    Query: {
        
        //GPS
        async allGps() {
            return await GPS.find().exec()
        },
        async fetchGps(_, {IMEI}){
            return await GPS.findOne(IMEI)
        },

        //USER
        async allUsers(){
            return await USER.find().exec()
        },

        async singleUser(_, {id}){
            return await USER.findOne(id)
        }
    },

    Mutation: {
        // GPS
        async createGps(_, input){
            const gps = await GPS.create(input);
            await pubsub.publish('gpsCreated', {gpsCreated: gps});
            return gps
        },

        async updateGps(_, input) {
            console.log(input)
            const gps = await GPS.findOneAndUpdate({IMEI: input.IMEI},{ $set:{ latitud: input.latitud, longitud: input.longitud}}, { new:true })
            await pubsub.publish('gpsUpdated', {gpsUpdated: gps})
            return gps
            
        },

        // USER
        async createUser(_, input){
            const user = await USER.create(input)
            return user
        },

        async login(_, input){
            return await comparePassword(input.email, input.password)
            .then(token => { return { token } })
            .catch(err => { throw err  })
        }

    },

    Subscription: {
        gpsCreated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('gpsCreated'),
                (params, variables) => true 
            )
        },

        gpsUpdated: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('gpsUpdated'),
                (params,variables) => true
            )
        }


    }
}

export default resolvers;