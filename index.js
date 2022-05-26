


const { ApolloServer, gql } = require('apollo-server');
const { Client } = require('pg');
const client = new Client();

client.connect();

const typeDefs = gql`
    type Video {
        id: ID
        title: String
        file: String
        description: String
        # todo create custom type
        release: String
    }

    type Series {
        id: ID
        title: String
        link: String
        button: String
        videos: [Video]
    }

    type User {
        id: ID
        email: String
        password: String
    }

    type Query {
        videos: [Video],
        series: [Series],
        users: [User]
    }
`

const resolvers = {
    Query: {
        videos: () => {
            return client.query('SELECT * from videos').then((result) => {
                return result.rows
            })
        },

        // videos: (parent) => {
        //     // return videos where series.id === parent.series.id
        //     return client.query('SELECT * from videos WHERE series.id = parent.series.id').then((result) => {
        //         return result.rows
        //     })
        // },


        // series: {
        //     videos: (parent) => {
        //         return client.query('SELECT * from videos', [
        //             series.id = parent.series.id
        //         ]).then((result) => {
        //             return result.videos
        //         })

        //     }
        // },

        series: () => {
            return client.query('SELECT * from series').then((result) => {
                return result.rows
            })
        },

        // series: (parent, args, context, info) => {
        //     return client.query('SELECT * from series WHERE series.id = 1').then((result) => {
        //         return result.rows
        //     })
        // },

        users: () => {
            return client.query('SELECT * from users').then((result) => {
                return result.rows
            })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true
})

server.listen().then((server) => {
    console.log(`server ready at ${server.url}`)
})