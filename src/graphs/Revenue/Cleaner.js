
const RevenueCleaner = (data) => {
    const budgetedSums = {};
    const cogsSums = {};
    const cntrctSums = {};

    data.forEach(item => {
        const year = item.RECNUM.substring(0,2);
        const phase = item.phase + "_" + year;
    
        if (budgetedSums[phase]) {
            budgetedSums[phase] += item.BudgetedAmount;
        } else {
            budgetedSums[phase] = item.BudgetedAmount;
        }
    
        if (cogsSums[phase]) {
            cogsSums[phase] += item.TotalCost;
        } else {
            cogsSums[phase] = item.TotalCost;
        }

        if (cntrctSums[phase]) {
            cntrctSums[phase] += item.cntrct;
        } else {
            cntrctSums[phase] = item.cntrct;
        }
    });

    const sortByPhaseAndYear = (a, b) => {
        const [phaseA, yearA] = a.x.split('_');
        const [phaseB, yearB] = b.x.split('_');
        
        if (yearA !== yearB) {
            return yearA.localeCompare(yearB);
        }

        return phaseA.localeCompare(phaseB);
    };
    
    const budgetedResult = {
        id: "Budgeted",
        data: Object.keys(budgetedSums).map(phase => ({
            x: phase,
            y: budgetedSums[phase]
        })).sort(sortByPhaseAndYear)
    };
    
    const cogsResult = {
        id: "COGS",
        data: Object.keys(cogsSums).map(phase => ({
            x: phase,
            y: cogsSums[phase]
        })).sort(sortByPhaseAndYear)
    };

    const contractResult = {
        id: "Contracted",
        data: Object.keys(cntrctSums).map(phase => ({
            x: phase,
            y: cntrctSums[phase]
        })).sort(sortByPhaseAndYear)
    };
    
    const result = [budgetedResult, cogsResult, contractResult];
    return(result);
}


export default RevenueCleaner;