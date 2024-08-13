import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export function ModeToggle() {
  const { setTheme } = useTheme()
    const handleClick = () => {
        if (localStorage.getItem('vite-ui-theme') === 'light') {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }
  return (
    <div className="flex items-center space-x-2">
        <Switch
            checked={localStorage.getItem('vite-ui-theme') === 'dark'}
            onCheckedChange={() => handleClick()}
            
        />
        <MdDarkMode />
    </div>
  )
}
