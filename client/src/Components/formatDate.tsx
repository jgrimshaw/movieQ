// @ts-nocheck

export default function formatDate(d) {

    const releaseDate = new Date(d * 1);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return releaseDate.toLocaleString("en-US", dateOptions);

}