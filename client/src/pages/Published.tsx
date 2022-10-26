
// @ts-nocheck
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import formatDate from "../Components/formatDate";

const SERIE_QUERY = gql`
    query GetSerie($slug: String) {
        serie(slug: $slug) {
            id
            title
            link
            button
            slug
            videos {
                id
                title
                release
                description
            }
        }
    }
`;

export default function Published() {
    // console.log(useParams());
    const { slug } = useParams();
    const { loading, error, data } = useQuery(SERIE_QUERY, {
        variables: { slug: slug },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : </p>;

    // console.log(data.serie.title);

    return (
        <div className='publish-main-container'>
            {/* <div>{JSON.stringify(data, null, 2)}</div> */}
            <div className='iframe-and-serie-title-container'>
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/j54R3P76aS4`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />

                <h3>Now playing: {data.serie.title}</h3>
            </div>

            <ul>
                {data.serie.videos.map((video: { id: number, title: string, release: string, description: string }) => (
                    <li key={video.id}>
                        <h3> {video.title}</h3>
                        <p className="date">{formatDate(video.release)}</p>
                        <p>{video.description}</p>
                    </li>
                )
                )}
            </ul>

        </div>
    );
}
