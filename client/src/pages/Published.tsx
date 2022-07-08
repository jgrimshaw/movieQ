import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const SERIES_QUERY = gql`
    query GetSeries($slug: String) {
        serie(slug: $slug) {
            id
            title
            link
            button
            slug
            videos {
                id
                title
            }
        }
    }
`;

export default function Published() {
    const { series } = useParams();
    const { loading, error, data } = useQuery(SERIES_QUERY, {
        variables: { slug: series },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : </p>;

    console.log(data.serie.title)

    return <div>{JSON.stringify(data, null, 2)}</div>;
    
}
