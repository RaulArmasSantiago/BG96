import pubsub from '../pubsub';
import {withFilter} from 'graphql-subscriptions'

export default {
    gpsAdded: {
        subscribe: withFilter(
            () => pubsub.asyncIterator(['gpsAdded']),
            (params, variable) => true
        ),
    },

    gpsUpdated: {
        subscribe: withFilter(
            () => pubsub.asyncIterator(['gpsUpdated']),
            (params, variable) => true
        )
    }
}