//Imports: GraphQL Apollo Server
import {ApolloServer} from 'apollo-server-express';

//Imports: GraphQL TypeDef & Resolvers
import TypeDef from './typedefs/types';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation'
import Subscription from './resolvers/subscription';

// Imports: Utilities
import verifyToken from '../utils/verifyToken';

// GraphQL: Schema
const SERVER = new ApolloServer({
    typeDefs: TypeDef,
    resolvers: { Query, Mutation, Subscription },
    context: async context => ({
        ...context,
        user: await verifyToken(context)
    }),
    playground: {
        endpoint: 'http://localhost:3001/graphql',
        subscriptionEndpoint: 'ws://localhost:3001/subscriptions',
        settings:{
            'editor.editor.theme': 'light'
        }
    }
});

export default SERVER;