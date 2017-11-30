const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLEnumType
} = require('graphql');

const RhymeType = new GraphQLObjectType({
    name: 'Rhyme',
    fields: {
        id: {
            type: GraphQLString,
            resolve: obj => obj._id
        },
        text: { type: GraphQLString },
        song: { type: GraphQLString }
    }
}); //fragment for pulling single Thug Rhyme.

const rhymesLibrary = {}; //I think this is essentially functioning as state.


const RhymesLibraryType = new GraphQLObjectType({
    name: 'RhymesLibrary',
    fields: {
        allRhymes: {
            type: new GraphQLList(RhymeType),
            description: 'A list of Thuggish rhymes in the database (db).',
            resolve: (_, args, { db }) =>
                db.collection('rhymes').find.toArray()
        }
    }
}); //fragment for pulling Thug Rhyme Library.

const QueryType = new GraphQLString({
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
    query: QueryType
});

module.exports = mySchema; // this is exported to index.js, where it's connted to mongodb.

