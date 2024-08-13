import  { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Card } from "./ui/card"
import { ModeToggle } from "./mode-toggle"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci";
import { logout } from "@/services/accountService"
import routes from "@/services/pages-route-btn-service"
import useUserRole from "@/hooks/useUserRole"

export default function SideNavigation() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const navigate = useNavigate();
  const [DashboardBtns] = useState(routes(20));
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { isNurse, isPatient } = useUserRole();
  useEffect(() => {
    localStorage.getItem('firstName')
    localStorage.getItem('lastName')
    
    setFirstName(localStorage.getItem('firstName') || '')
    setLastName(localStorage.getItem('lastName') || '')
  } ,[])


  return (
    <>
      <Button
        title="Side navigation"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? true : false}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </Button>

      {/*  <!-- Side Navigation --> */}
      <Card
        id="nav-menu-4"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-60 flex-col border-r transition-transform lg:translate-x-0  ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
            <>
              <div 
                  className="flex flex-col items-center gap-4 border-b border-slate-200 p-6">
                <div 
                    className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center cursor-pointer"
                    onClick={() => {
                      setIsSideNavOpen(false)
                      navigate('/profile')
                    }}
                  >
                  <Label className="w-full truncate text-base cursor-pointer">
                    {firstName} {lastName}
                  </Label>
                </div>
              </div>
              <nav
                aria-label="side navigation"
                className="flex-1 divide-y divide-slate-100 overflow-auto"
              >
                <div>
                  <ul className="flex flex-1 flex-col gap-1 py-3">
                    {DashboardBtns.map((btn:any, index:any) => (
                      <div key={index}>
                        {
                          isNurse && btn.role === 'nurse' ?
                          (
                          <li 
                             
                            className="px-3"
                          >
                            <div
                              className="flex items-center gap-3 rounded p-3 transition-colors focus:bg-stone-50 aria-[current=page]:bg-stone-50 cursor-pointer"
                              onClick={() => {
                                setIsSideNavOpen(false)
                                navigate(btn.path)
                              }}
                            >
                              <div className="flex items-center self-center ">
                                {btn.icon}
                              </div>
                              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                {btn.title}
                              </div>
                            </div>
                          </li>
                          ):
                          isPatient && btn.role === 'patient' ?
                          (<li 
                             
                            className="px-3"
                          >
                            <div
                              className="flex items-center gap-3 rounded p-3 transition-colors focus:bg-stone-50 aria-[current=page]:bg-stone-50 cursor-pointer"
                              onClick={() => {
                                setIsSideNavOpen(false)
                                navigate(btn.path)
                              }}
                            >
                              <div className="flex items-center self-center ">
                                {btn.icon}
                              </div>
                              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                {btn.title}
                              </div>
                            </div>
                          </li>)
                          :
                          btn.role === "all" &&
                          (<li 
                             
                            className="px-3"
                          >
                            <div
                              className="flex items-center gap-3 rounded p-3 transition-colors focus:bg-stone-50 aria-[current=page]:bg-stone-50 cursor-pointer"
                              onClick={() => {
                                setIsSideNavOpen(false)
                                navigate(btn.path)
                              }}
                            >
                              <div className="flex items-center self-center ">
                                {btn.icon}
                              </div>
                              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                {btn.title}
                              </div>
                            </div>
                          </li>)
                        }

                      </div>
                    ))}
                  </ul>
                </div>
              </nav>
              <footer 
                className="border-t border-slate-200 p-3 flex justify-between gap-4"
              >
                <div
                  className="flex items-center gap-3 rounded p-3  transition-colors hover:text-stone-500 cursor-pointer"
                >
                  <div className="flex items-center self-center ">
                    <CiLogout  size={20}/>

                  </div>
                  <div 
                    className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium"
                    onClick={() => {
                      logout()
                      location.reload()
                      navigate('/login')
                    }}
                  >
                    Logout
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3">
                  <ModeToggle />
                </div>
              </footer>
            </>
      </Card>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
    </>
  )
}
