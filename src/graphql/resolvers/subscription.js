import pubsub from '../pubsub';
import {withFilter} from 'graphql-subscriptions'

export default {
    gpsAdded: {
        subscribe: () => pubsub.asyncIterator(['gpsAdded']),
    },

    gpsUpdated: {
        subscribe: () => pubsub.asyncIterator(['gpsUpdated']),
    }
}