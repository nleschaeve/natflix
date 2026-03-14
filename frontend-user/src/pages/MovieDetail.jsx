import { useParams } from "react-router-dom";

function MovieDetail() {
    const {id} = useParams();
    // Si URL est /movie/5, alors id = "5"

    return(
        <p>Film ID : {id}</p>
    )
}

export default MovieDetail;