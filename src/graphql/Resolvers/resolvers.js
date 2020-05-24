require("babel-polyfill");
import { PubSub, withFilter} from 'apollo-server-express';
import GPS from '../../models/Gps';
import USER from '../../models/User';

//UTILS
import createToken from '../../utils/createToken'
import comparePassword from '../../utils/comparePasswords'

const GPS_CREATED = 'GPS_CREATED';
const GPS_UPDATED = 'gps_updated';

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
            await pubsub.publish(GPS_CREATED, {gpsCreated: gps});
            return gps
        },

        async updateGps(_, input) {
            const gps = await GPS.findOneAndUpdate({IMEI: input.IMEI},{ $set:{ latitud: input.latitud, longitud: input.longitud}}, { new:true })
            await pubsub.publish(GPS_UPDATED, {gpsUpdated: gps})
            return gps
            
        },

        // USER
        async createUser(_, input){
            const user = await USER.create(input)
            return user
        },

        async login(_, input){
            return await comparePassword(input.email, input.password)
            .then(token => { return token })
            .catch(err => { throw err  })
        }

    },

    Subscription: {
        gpsCreated: {
            subscribe:  () => pubsub.asyncIterator(GPS_CREATED)
        },

        gpsUpdated: {
            subscribe: () => pubsub.asyncIterator(GPS_UPDATED),
        }


    }
}

export default resolvers;