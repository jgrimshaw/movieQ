

export default function SeriesList(props: any) {
    return (
        <ul>{props.series.map((serie: any, id: number) => <li key={id}>{serie.title}</li>)}</ul>
    )
}
