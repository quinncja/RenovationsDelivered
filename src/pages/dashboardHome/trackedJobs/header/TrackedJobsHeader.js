import MarginFilters from "./MarginFilters";
import OpenPhases from "./OpenPhases";
import OpenProjects from "./OpenProjects";
import Searchbar from "./Searchbar";


function TrackedJobsHeader(props){
    const {filteredJobsToShow} = props;
    
    return(
        <div className="tracked-jobs-header">
            <div style={{display: "flex", gap: "10px", width: "100%"}}>
                <OpenProjects filteredJobsToShow={filteredJobsToShow}/>
                <OpenPhases filteredJobsToShow={filteredJobsToShow}/>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px", width: "100%"}}>
                <MarginFilters/>
                <Searchbar/>
             </div>
            </div>
        </div>
    )
}

export default TrackedJobsHeader;