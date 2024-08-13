import { Outlet } from "react-router-dom";
import "./App.css";
import SideNavigation from "./components/side-bar";
import useUserRole from "./hooks/useUserRole";

function App() {
  const { isNurse, isPatient } = useUserRole();

  return (
    <>
      <div className="w-screen">
          <div className="">
            {(isNurse ||isPatient) &&
              <SideNavigation />
            }
          </div>
          <div className={`flex-grow overflow-hidden  ${(isNurse ||isPatient) ? 'lg:ml-[15rem]' : ''}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
