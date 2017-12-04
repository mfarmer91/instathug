const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLEnumType
} = require('graphql');

const {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  connectionFromPromisedArray
} = require('graphql-relay');

const RhymeType = new GraphQLObjectType({
    name: 'Rhyme',
    fields: {
        id: {
            type: GraphQLString,
            resolve: obj => obj._id
        },
        text: { type: GraphQLString },
    }
}); //fragment for pulling single Thug rhyme.

const { connectionType: RhymesConnectionType } = 
      connectionDefinitions({
          name: 'Rhyme',
          nodeType: RhymeType
      });

const rhymesLibrary = {}; //I think this is essentially functioning as state.


const RhymesLibraryType = new GraphQLObjectType({
    name: 'RhymesLibrary',
    fields: {
        rhymesConnection: {
            type: RhymesConnectionType,
            description: 'A list of thuggish rhymes in the database',
            args: connectionArgs,
            resolve: (_, args, { db }) => connectionFromPromisedArray(
                db.collection('rhymes').find().toArray(), args
            )
        }
    }
}); //fragment for pulling Thug rhyme library.

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        rhymesLibrary: {
            type: RhymesLibraryType,
            description: 'The Rhymes Library *SKRRRR*',
            resolve: () => rhymesLibrary
        }
    }
}); //Root Query Type.

const mySchema = new GraphQLSchema({
    query: queryType
});

module.exports = mySchema; // this is exported to index.js, where it's connted to mongodb.

