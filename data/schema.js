import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'; //from reference implementation

import moment from 'moment-timezone';

import { GraphQLDate} from 'graphql-scalars'

/*
resolve() {
  return 'world';
}
can also be written as
resolve: () => 'world'

*/

//we need to deport this object
var schema = new GraphQLSchema({

  query: new GraphQLObjectType({
    name: 'RootQueryType', //required

    fields: { //required

        hello: {
          type: GraphQLString,
          description: "This is an awesome answer",
          args: {
            printName : {type:GraphQLString }
          },
          resolve(_, args) {
            return `Hello ${args.printName}`;
          }
        },
        counter: {
          type: GraphQLInt,
          description: "This is a silly number",
          resolve() {
            return 43;
          }
        },
        hktime: {
          type: GraphQLDate,
          description: "Need to know the time in HK",
          resolve() {
            // Resolver can return an integer, string or date value.
          // The following return values all resolve to the same date.
          // `return 262915200000`
          // `return '1978-05-02'`
          // `return '1978-05-02T00:00:00.000Z'`
            return moment.utc().add(8,'hours').format();
          }
        },
        hkjcresult: {
          type: GraphQLString,
          description: "Needs 3 arguments: racedate-racecourse-racenumber - returns first 4 horsecodes in order plus URL",
          args: {
            racedate : {type:GraphQLString },
            racecourse : {type:GraphQLString },
            racenumber : {type:GraphQLInt }
          },
          resolve (_, args){
            return `nothing here yet for ${args.racedate} - ${args.racecourse} - ${args.racenumber}`;
          }
        },
      random: {
        type: GraphQLFloat,
        resolve() {
          return Math.random();
        }
      },


    }
  })
});

export default schema;
