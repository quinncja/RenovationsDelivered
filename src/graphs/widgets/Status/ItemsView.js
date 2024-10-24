function ItemsView({itemView, clearItemView}){
    const {items, tag, job, itemClick} = itemView

    const handleClick = (item) =>{
        itemClick(item)
        clearItemView()
    }
    return(
        <div className="job-display job-display-single job-display-all job-display-back" onClick={() => clearItemView()}>
        <strong>{job}</strong>
        <div className="item-background"> 
        {items.map((item) => 
            {
                return(
                    <button className="item-button" onClick={() => handleClick(item)}>
                        {item[tag]}
                    </button>
                )  
        })}
        </div>
    </div>
    )
}

export default ItemsView;