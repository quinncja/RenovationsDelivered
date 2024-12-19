import {
    createContext, useContext, useEffect, useState, useRef, useCallback
} from "react"
import { useModifiers } from "./ModifierContext";
import { toast } from "sonner";
import { fetchJobData } from "utils/api";
import { modifierFormatter } from "utils/formatters";

const JobDataContext = createContext();
export const useJobDataContext = () => useContext(JobDataContext)

export const JobDataProvider = ({children}) => {
    const [jobData, setJobData] = useState(undefined);
    const { pageModifiers } = useModifiers();
    const formattedModifiers = modifierFormatter(pageModifiers, null);

    const abortControllerRef = useRef(null);
 
    useEffect(() => {
        const loadJobData = async () => {
            setJobData(undefined)
            
            try {
                if (abortControllerRef.current) {
                  abortControllerRef.current.abort();
                }
                const controller = new AbortController();
                abortControllerRef.current = controller;
                const mods = {
                    ...formattedModifiers,
                    type: "job-data"
                }
                const jobData = await fetchJobData(mods, controller.signal);
                console.log(jobData)
                setJobData(jobData)
              } catch (error) {
                toast.error("Failed to load job data")
              }
        }

        if(pageModifiers) loadJobData();

        //eslint-disable-next-line
    }, [pageModifiers])

    const typeMap = {
        "Material": 1,
        "Labor": 2,
        "Subcontractors": 4,
        "WTPM": 5,
    }

    const getYesterDate = () => {
        const now = new Date();
        const chicagoTimeString = now.toLocaleString('en-US', { timeZone: 'America/Chicago' });
        const chicagoNow = new Date(chicagoTimeString);
        chicagoNow.setHours(0, 0, 0, 0);
        chicagoNow.setDate(chicagoNow.getDate() - 1);
        const startOfYesterday = chicagoNow.getTime();
        return startOfYesterday;
    }

    const getUpdates = (postedArr, committedArr) => {
        const yesterDate = getYesterDate();
    
        const filterItems = (items) => {
            return items.filter(item => {
                const insdteTime = new Date(item.insdte).getTime();
                const upddteTime = new Date(item.upddte).getTime();
    
                if (isNaN(insdteTime) || isNaN(upddteTime)) return false;
    
                return insdteTime > yesterDate || upddteTime > yesterDate;
            });
        };
    
        const updatedPosted = filterItems(postedArr);
        const updatedCommitted = filterItems(committedArr);
    
        return {
            posted: updatedPosted,
            committed: updatedCommitted
        };
    };
    

    const getSpent = (arr1, arr2) => {
        let sum = 0;
      
        if(arr1)
        for (const obj of arr1) {
          sum += Number(obj.value) || 0;
        }
      
        if(arr2)
        for (const obj of arr2) {
          sum += Number(obj.value) || 0;
        }
      
        return sum;
    };

    const getBudget = (type) => {
        const finances = jobData.finances;
        if(type === 1) return Number(finances.Material) || 0;
        if(type === 2) return Number(finances.Labor) || 0;
        if(type === 4) return Number(finances.Subcontracts) || 0;
        if(type === 5) return Number(finances.WTPM) || 0;
    }

    const getCommittedCosts = (type) => {
        if(type === 2 || type === 5) return [];
        if(type === 1) return jobData?.committed?.costs || [];
        if(type === 4) return jobData?.committed?.subs || [];
    }

    const getPostedCosts = (type) => {
        return jobData.posted.filter((cost) => cost.costType === type)
    }

    const getDataByType = useCallback((widgetType) => {
        console.log(widgetType)
        if(!jobData) return null;
        let data = {
            updates: {},
            costItems: {},
            budget: ''
        };
        const type = typeMap[widgetType];
        data.type = widgetType;
        data.costItems.posted = getPostedCosts(type);
        data.costItems.committed = getCommittedCosts(type) || [];
        data.budget = getBudget(type);
        data.spent = getSpent(data.costItems.posted, data.costItems.committed);
        data.updates.updateItems = getUpdates(data.costItems.posted, data.costItems.committed)
        data.updates.count = data.updates.updateItems.committed.length + data.updates.updateItems.posted.length;
        return(data);
    //eslint-disable-next-line
    }, [jobData])

    return(
        <JobDataContext.Provider value={{jobData, getDataByType}}>
            {children}
        </JobDataContext.Provider>
    )

}
