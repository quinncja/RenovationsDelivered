import Select from "react-dropdown-select";
import { useProjectContext } from "context/ProjectContext";
import useIsAdmin from "utils/hooks/useIsAdmin";

function ClientSelector() {
  const { getAllClients, projectQuery, updateProjectQuery } =
    useProjectContext();
  const isAdmin = useIsAdmin();

  const selectedClient = projectQuery.client;
  const clientList = getAllClients();

  const active = projectQuery.client;

  const handlePMChange = (value) => {
    const client = value.length > 0 ? value[0].id : null;

    const newMods = {
      client: client,
    };

    updateProjectQuery(newMods);
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
      className={`project-select-wrapper  ${active && "project-select-wrapper-active"} ${!isAdmin && "inactive-project-select-wrapper"}`}
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
      {isAdmin ? (
        <>
          <h4> Client </h4>
          <Select
            labelField="name"
            valueField="id"
            options={clientList}
            values={
              selectedClient
                ? [
                    clientList.find((client) => client.id === selectedClient),
                  ].filter(Boolean)
                : []
            }
            placeholder={"-"}
            className="project-select-dropdown"
            dropdownGap={-3}
            dropdownHandle={false}
            searchBy="name"
            sortBy="name"
            onChange={handlePMChange}
          />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            gap: "5px",
          }}
        >
          <h4> Client </h4>
          <h2 style={{ paddingBottom: "1px", height: "30px" }}>
            {(clientList &&
              selectedClient &&
              clientList.find((client) => client.id === selectedClient).name) ||
              "-"}
          </h2>
        </div>
      )}
    </div>
  );
}

export default ClientSelector;
