import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'; //from reference implementation


//we need to deport this object
var schema = new GraphQLSchema({

  query: new GraphQLObjectType({
    name: 'RootQueryType', //required
    fields: { //required
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

export default schema;
