//Mongo Models
import Gps from '../../models/Gps';

// Subscriptions
import pubsub from '../pubsub';

export default {
    //GPS
    async createGps(_, { input }, context) {

        return await Gps.create(input).then(gps => {
            pubsub.publish('gpsAdded', { gpsAdded: gps });
            return gps.toObject();
        }).catch(err => {
            throw err;
        });
    },

    async updateGps(root, { id, input }) {
        return await Gps.findOneAndUpdate({ IMEI: id }, { $set: input }, { new: true }).then(gps => {
            pubsub.publish('gpsUpdated', { gpsUpdated: gps });
            return gps.toObject();
        }).catch(err => {
            throw err;
        });
    }
};