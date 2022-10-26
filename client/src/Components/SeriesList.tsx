// @ts-nocheck

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import formatDate from "./formatDate";




export default function SeriesList(props: any) {
    const { slug } = useParams();
    // console.log(slug)

    //console.log(props.series)

    useEffect(() => {
        props.setCurrentVideo(null);
    }, [slug]);

    const handleVideoClick = (event, id) => {
        props.setCurrentVideo(id)
        // load movie info into form under videos
    }

    const currentSerie = props.series.find((serie) => {
        return serie.slug === slug
    })
    // console.log(currentSerie)

    // onClick render movies that belong to the clicked serie
    return (
        <>
            <div className="list-container">
                <h2>Your MovieQ</h2>
                <ul>
                    {currentSerie.videos.map((video, i) => {
                        const selectedVideo = (props.currentVideo === null && i === 0) || props.currentVideo === video.id
                        return (
                            <li
                                key={video.id}
                                className={selectedVideo ? "selected" : ""}
                                onClick={event => handleVideoClick(event, video.id)}
                            >
                                <h3>{video.title}</h3>
                                <div>{formatDate(video.release)}</div>

                                <div className="btn-container">
                                    <button className={selectedVideo ? "btn" : "btn-hide"}>Edit</button>
                                    <button className={selectedVideo ? "btn" : "btn-hide"}>Delete</button>
                                </div>

                            </li>
                        )
                    }
                    )}
                </ul>
            </div>

            <div className="list-container">
                <h2>Your Series</h2>
                <ul>
                    {props.series.map((serie, i) =>
                        <li key={i} >
                            <Link to={`/${serie.slug}/edit`}>
                                <h3 className={serie.slug === slug ? "selected" : ""}>{serie.title}</h3>
                            </Link>

                            <div className="btn-container">
                                <button className={serie.slug === slug ? "btn" : "btn-hide"}>Edit</button>
                                <button className={serie.slug === slug ? "btn" : "btn-hide"}>Delete</button>
                            </div>
                        </li>
                    )}
                </ul>

            </div>
        </>
    )
};


