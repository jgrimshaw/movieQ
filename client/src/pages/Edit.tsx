
import { useQuery, useMutation, gql } from "@apollo/client";
import Form from '../Components/Form';
import SeriesList from "../Components/SeriesList";

const SERIES_QUERY = gql`
    query GetSeries {
        series {
            id
            title
            link
            button
            videos {
                id
                title
                description
                release
            }
        }
    }
`;

const CREATE_SERIES_MUTATION = gql`
    mutation Mutation($title: String!, $link: String!, $button: String!) {
        createSerie(title: $title, link: $link, button: $button) {
            id
        }
    }
`;

export default function Edit() {

    const { loading, error, data } = useQuery(SERIES_QUERY);
    const [createSerie] = useMutation(CREATE_SERIES_MUTATION);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : </p>;

    // console.log(data);

    return (
        <>
            <Form handleSubmit={(values: any) => createSerie({
                variables: {
                    title: values.serieTitle,
                    link: values.btnUrl,
                    button: values.btnText
                },
                update(cache, update) {
                    console.log(update)
                    cache.updateQuery({ query: SERIES_QUERY }, (data) => ({
                        series: data.series.concat([{
                            title: values.serieTitle,
                            link: values.btnUrl,
                            button: values.btnText,
                            id: update.data.createSerie.id,
                            videos: []
                        },])
                    }))
                }
            })}
            />
            <div>
                {/* {JSON.stringify(data)} */}
                <SeriesList series={data.series} />
            </div>
        </>
    )
}