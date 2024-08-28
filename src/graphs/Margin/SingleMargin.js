export function SingleMargin(props){
    const {data} = props;
    
    let text;
    let currMargin;
    let prevMargin;
    if(data[0].data.length === 1){
        text = <> No data <br/> from last phase </>
        currMargin = data[0].data[0].y.toFixed(2)
    }
    else{
        prevMargin = data[0].data[0].y.toFixed(2)
        currMargin = data[0].data[1].y.toFixed(2)
        const diff = currMargin - prevMargin;
        text = <> {diff > 0 ? "Up" : "Down"} {diff.toFixed(2)}% <br/> from last phase </>
    }

    return(
        <div className="single-margin-container">
            <div className="big-margin-text"> 
                {currMargin}%
            </div>
            <div className="last-phase"> 
                <span> 
                    {text}
                </span>
            </div>
        </div>
    )
}