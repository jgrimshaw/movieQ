
// @ts-nocheck

import { useQuery, useMutation, gql } from "@apollo/client";
import Form from '../Components/Form';
import SeriesList from "../Components/SeriesList";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SERIES_QUERY = gql`
    query GetSeries {
        series {
            id
            title
            link
            button
            slug
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
    const { slug } = useParams();

    const [videoId, setVideoId] = useState(null);

    const { loading, error, data } = useQuery(SERIES_QUERY);
    const [createSerie] = useMutation(CREATE_SERIES_MUTATION);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : </p>;


    const currentSerie = data.series.find((serie) => {
        return serie.slug === slug
    })

    // console.log(data);
    console.log(currentSerie)

    return (
        <div className="edit-main-container">
            <Form key={slug} defaultValue={{ serieTitle: currentSerie.title, btnUrl: currentSerie.button, btnText: currentSerie.link }} handleSubmit={(values: any) => createSerie({
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

            {/* {JSON.stringify(data)} */}
            <SeriesList series={data.series} currentVideo={videoId} setCurrentVideo={setVideoId} />

        </div>
    )
}