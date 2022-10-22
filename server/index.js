require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");
const { Client } = require("pg");
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
        user: User
        slug: String
    }

    type User {
        id: ID
        email: String
        password: String
        series: [Series]
    }

    type Query {
        videos: [Video]
        series: [Series]
        serie(slug: String): Series
        users: [User]
    }

    type Mutation {
        createSerie(
            title: String!, 
            link: String!, 
            button: String!
        ): Series
    }
`;

// serie(slug: String): Series

const resolvers = {
    Query: {
        videos: () => {
            return client.query("SELECT * from videos").then((result) => {
                return result.rows;
            });
        },

        series: () => {
            return client.query("SELECT * from series").then((result) => {
                return result.rows;
            });
        },

        serie: (parent, args, context) => {
            return client
                .query("SELECT * from series WHERE slug = $1", [args.slug])
                .then((result) => {
                    return result.rows[0];
                });
        },

        users: () => {
            return client
                .query("SELECT id, email from users")
                .then((result) => {
                    return result.rows;
                });
        },
    },

    Series: {
        videos: (parent, args, context) => {
            return client
                .query("SELECT * from videos WHERE series_id = $1 order by release desc", [parent.id])
                .then((result) => {
                    return result.rows;
                });
        },

        user: (parent, args, context) => {
            console.log(parent.user_id);
            return client
                .query("SELECT id, email from users WHERE id = $1", [
                    parent.user_id,
                ])
                .then((result) => {
                    return result.rows[0];
                });
        },
    },

    User: {
        series: (parent, args, context) => {
            return client
                .query("SELECT * from series WHERE user_id = $1", [parent.id])
                .then((result) => {
                    return result.rows;
                });
        },
    },

    Mutation: {

        createSerie: (parent, args, context) => {
            console.log(args);
            return client
                .query("INSERT INTO series (title, button, link) VALUES ($1, $2, $3) returning id", [args.title, args.button, args.link])
                .then((result) => {
                    return result.rows[0];
                });

        },
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
});

server.listen().then((server) => {
    console.log(`server ready at ${server.url}`);
});
