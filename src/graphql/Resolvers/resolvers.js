import { PubSub, withFilter} from 'apollo-server-express';
import GPS from '../../models/Gps';

const GPS_CREATED = 'GPS_CREATED';
const GPS_UPDATED = 'GPS_UPDATED';

const pubsub = new PubSub()

const resolvers = {
    Query: {
        async allGps() {
            return await GPS.find().exec()
        },
        async fetchGps(_, {IMEI}){
            return await GPS.findOne(IMEI)
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

    },

    Subscription: {
        gpsCreated: {
            subscribe: () => pubsub.asyncIterator([GPS_CREATED]),
        },

        gpsUpdated: {
            subscribe: () => pubsub.asyncIterator('GPS_UPDATED'),
        }


    }
}

export default resolvers;