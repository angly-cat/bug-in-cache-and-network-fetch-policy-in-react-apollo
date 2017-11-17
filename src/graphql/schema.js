import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

export const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
  { id: 4, name: 'James Williams' },
  { id: 5, name: 'Maria Garcia' }
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: (unused, { first, skip }) => peopleData.slice(skip, skip + first),
      args: {
        first: {
          type: GraphQLInt,
          defaultValue: 1
        },
        skip: {
          type: GraphQLInt,
          defaultValue: 0
        }
      }
    },
    _peopleCount: {
      type: GraphQLInt,
      resolve: () => peopleData.length
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
