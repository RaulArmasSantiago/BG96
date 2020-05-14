//Imports: GraphQL Apollo Server
import {ApolloServer} from 'apollo-server-express';

//Imports: GraphQL TypeDef & Resolvers
import TypeDef from './typedefs/types';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation'
import Subscription from './resolvers/subscription';

// Imports: Utilities
import verifyToken from '../utils/verifyToken';
const PORT = process.env.PORT || 3001

// GraphQL: Schema
const SERVER = new ApolloServer({
    typeDefs: TypeDef,
    resolvers: { Query, Mutation, Subscription },
    context:   async context => ({
        ...context,
        user: await verifyToken(context)
      }),
    playground: {
        endpoint: `https://azureiothub-bg9596.herokuapp.com/graphql`,
        subscriptionEndpoint: `wss://azureiothub-bg9596.herokuapp.com/subscriptions`,
        settings:{
            'editor.editor.theme': 'light'
        }
    }
});

export default SERVER;