function GameTimer({state}){

    let message="Kattints a start gombra"

    if(state==="waiting") message="Várj..."
    if(state==="ready") message="MOST!"

    return(

        <p>

            Állapot: {message}

        </p>

    )

}

export default GameTimer