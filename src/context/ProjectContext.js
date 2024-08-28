import { createContext, useContext, useEffect, useState } from "react";
import { fetchJobList } from "utils/api";

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        const loadJobs = async () => {
            try {
               const jobs = await fetchJobList();
               setProjects(jobs);
            }  catch(error){
                console.log(error)
            }
        }
        if(!projects) loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProjNum = (projName) => {
        const job = projects.find(job => job.name === projName);
        if (job) {
            return job.num
        } 
        return null
    }

    return(
        <ProjectContext.Provider
            value={{
                projects,
                getProjNum,
            }}>
                {children}
        </ProjectContext.Provider>
    )
}



