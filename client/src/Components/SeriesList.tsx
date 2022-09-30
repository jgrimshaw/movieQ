// @ts-nocheck

import React, { useState } from "react";

export default function SeriesList(props: any) {
    //console.log(props.series)
    const [selected, setSelected] = useState();
    const [serieIndex, setSerieIndex] = useState(0);

    const handleClick = (event, i) => {
        setSelected(event.target);
        setSerieIndex(i)
        // console.log(typeof serieIndex);
    }

    // onClick render movies that belong to the clicked serie
    return (
        <>
            <div className="list-container">
                <h2>Your MovieQ</h2>
                <ul>
                    {props.series[serieIndex].videos.map((video, i) =>
                        <li key={i}>{video.title}</li>
                    )}
                </ul>
            </div>
            <div className="list-container">
                <h2>Your Series</h2>
                <ul>
                    {props.series.map((serie, i) =>
                        <li key={i} onClick={event => handleClick(event, i)}>{serie.title}</li>)
                    }
                </ul>
            </div>
        </>
    )
};


