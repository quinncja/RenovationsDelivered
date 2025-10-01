import { buildingSvg, homeSvg, jobcostSvg, usersSvg, UserSvg } from "business/svg";
import Logo from "./Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { getBreakdownIconByType } from "utils/funcs";
import useIsAdmin from "utils/hooks/useIsAdmin";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isAdmin = useIsAdmin();
  
  const navOptions = [
    {
      id: "Home",
      path: "/dashboard",
      svg: homeSvg(),
    },
    {
      id: "Job Costing",
      path: "/jobcost",
      svg: jobcostSvg(),
      subItems: [
        {
          id: "Material",
          path: "/jobcost/breakdown/material",
          svg: getBreakdownIconByType("Material")
        },
        {
          id: "Labor",
          path: "/jobcost/breakdown/labor",
          svg: getBreakdownIconByType("Labor")
        },
        {
          id: "Subcontractors",
          path: "/jobcost/breakdown/subcontractors",
          svg: getBreakdownIconByType("Subcontractors")
        },
        {
          id: "WTPM",
          path: "/jobcost/breakdown/wtpm",
          svg: getBreakdownIconByType("WTPM")
        },
      ]
    },
    // {
    //   id: "Project Library",
    //   path: "/projects",
    //   svg: buildingSvg(),
    // },
    ...(isAdmin ? [{
      id: "Users",
      path: "/users",
      svg: usersSvg(),
    }] : [])
  ];

  function NavButton({obj, sub = false, height, last = false}){
    const active = currentPath.startsWith(obj.path);
    
    const handleClick = (obj) => {
      if(active) {
        if (obj.subItems) navigate(obj.path);
        else return;
      }
      else navigate(obj.path);
    }
    
    return(
      <div style={{width: '43px', position: "absolute", display: "flex", gap: '0px', flexDirection: "column", height: height ? `${height}px` : 'auto'}}> 
      <div style={{height: '43px', position: "relative", flexShrink: 0}}> 
      <div className={`nav-grouping ${active ? "active-nav-grouping" : ""} ${obj.subItems ? `active-nav-w-subs-${active}` : ""}`}
           onClick={() => handleClick(obj)}
      >
        <div style={{display: 'flex', flexDirection: "row", alignItems: 'center'}}>
          <div
            className={`nav-button ${active ? obj.subItems ? "active-nav-w-subs active-nav-button" : "active-nav-button" : ""} ${sub ? "sub-nav-button" : ""} ${last ? "last-sub-item" : ""}`}
          >
            {obj.svg}
          </div>
          <div className="nav-extra" style={{width: "max-content", textAlign: "left", paddingRight: "20px"}}>
            {obj.id}
          </div>
        </div>
        </div>
        </div>
        {active && obj.subItems && (
        <div 
        className="sub-items"
        style={{display: 'flex', flexDirection: "column", gap: "0px", height: '100%', width: "100%"}}>
                    {obj.subItems.map((item, index) =>
                      <div 
                        key={index} 
                          style={{
                          position: "relative", 
                          height: "43px", 
                          width: '43px',
                          transition: 'min-height 0.3s ease-in-out'
                        }}
                      >
                        <NavButton key={index} obj={item} sub={true} last={index === obj.subItems.length - 1}/>
                      </div>
                    )}
                  </div>
                )
              }
        </div>
    );
  }

  const calculateNavItemHeight = (option) => {
    const baseHeight = 43;
    const active = currentPath.startsWith(option.path);
    
    if (!active || !option.subItems) {
      return baseHeight;
    }

    const subItemsGap = 0; 
    const subItemHeight = 43; 
    const gapBetweenSubItems = 5;
    const numSubItems = option.subItems.length;
    
    const totalHeight = baseHeight + subItemsGap + (numSubItems * subItemHeight) + ((numSubItems - 1) * gapBetweenSubItems) ;
    
    return totalHeight - 15;
  };

  return (
    <div className="top-left-container">
      <Logo />
      <div style={{
        paddingTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: '5px',
        marginInline: "auto"
      }}>
        {navOptions.map((option, index) => {
          const dynamicHeight = calculateNavItemHeight(option);
          
          return (
            <div 
              key={index} 
              style={{
                position: "relative", 
                minHeight: `${dynamicHeight}px`, 
                width: '43px',
              }}
            >
              <NavButton obj={option} height={dynamicHeight} minHeight={43}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;