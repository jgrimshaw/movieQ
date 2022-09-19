import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

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
                description
            }
        }
    }
`;

export default function Published() {
    const { series } = useParams();
    const { loading, error, data } = useQuery(SERIE_QUERY, {
        variables: { slug: series },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : </p>;

    console.log(data.serie.title);

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

                <h2>Now playing: {data.serie.title}</h2>
            </div>

            <ul className='video-list'>
                {data.serie.videos.map((video: { id: number, title: string, description: string }) => (
                    <div key={video.id}>
                        {video.title} <div>{video.description}</div> <br></br>
                    </div>
                )
                )}
            </ul>
        </div>
    );
}
