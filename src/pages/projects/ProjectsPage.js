import WidgetSection from "pages/dashboardHome/widgets/WidgetSection";
import Header from "./header/Header";

function ProjectsPage(){

    return(
        <div className="job-cost-dashboard">
            <WidgetSection title={`Project Library`} color={'none'} /> 
            <Header/>
        </div>
    )
}

export default ProjectsPage;