import Select from "react-dropdown-select";
import { useJobCostContext } from "context/JobCostContext";
import { useProjectContext } from "context/ProjectContext";
import useIsAdmin from "utils/hooks/useIsAdmin";

function ClientSelector() {
  const { modTimeout, pageModifiers, updatePageModifiers } =
    useJobCostContext();
  const { getAllClients, getClientByJob } = useProjectContext();
  const isAdmin = useIsAdmin(); 

  const selectedClient = pageModifiers.client || getClientByJob(pageModifiers?.jobNum)?.id;
  const clientList = getAllClients();

  const active = pageModifiers.client;
  
  const handlePMChange = (value) => {
    if (modTimeout) return;
    const client = value.length > 0 ? value[0].id : null;

    const newMods = {
      client: client,
    };

    updatePageModifiers(newMods);
  };

  const handleWrapperClick = (e) => {
    if (e.target.closest(".react-dropdown-select")) return;

    const control = e.currentTarget.querySelector(".react-dropdown-select");

    if (control) {
      control.click();
    }
  };

  return (
    <div
     className={`project-select-wrapper  ${active && 'project-select-wrapper-active'} ${!isAdmin && "inactive-project-select-wrapper"} psd-left`}
      title="Change Client"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "flex-start",
        borderRadius: "0px",
      }}
      onClick={handleWrapperClick}
    >
      {isAdmin ?
            <>
            <h4> Client </h4>
      <Select
        labelField="name"
        valueField="id"
        options={clientList}
        values={
          selectedClient
                ? [clientList.find((client) => client.id === selectedClient)].filter(Boolean)
                : []
        }
        placeholder={'-'}
        className="project-select-dropdown"
        dropdownGap={-3}
        dropdownHandle={false}
        searchBy="name"
        sortBy="name"
        onChange={handlePMChange}
      /> 
        </>
          : 
          <div style={{display: "flex", flexDirection: "column", textAlign: 'left', gap: "5px"}}> 
          <h4> Client </h4>
          <h2 style={{ paddingBottom: "1px", height: "30px"}}>
            {clientList && selectedClient && clientList.find((client) => client.id === selectedClient).name || '-'}
          </h2>
          </div>
      }
    </div>
  );
}

export default ClientSelector;
