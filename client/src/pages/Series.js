import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const SERIES_QUERY = gql`
    query GetSeries($serieId: ID) {
        serie(id: $serieId) {
            id
            title
            link
            button
            videos {
                id
                title
            }
        }
    }
`;

export default function Series() {
    const { series } = useParams();
    const { loading, error, data } = useQuery(SERIES_QUERY, {
        variables: { serieId: series },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <div>{JSON.stringify(data, null, 2)}</div>;
}
