function ScoreDisplay({time}){

    if(!time) return null

    return(

        <h3>

            Reakcióidő: {time} ms

        </h3>

    )

}

export default ScoreDisplay