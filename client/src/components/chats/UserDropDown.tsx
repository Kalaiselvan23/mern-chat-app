import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { LOGOUT_ROUTE } from "@/lib/constants"
import apiClient from "@/lib/apiClient"
import { toast } from "sonner"

const UserDropDown = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await apiClient.post(LOGOUT_ROUTE, {})
            if (res.status === 200) {
                toast("Successfully logged out")
                navigate("/auth")
            }
            else{
                toast.error("Unable to logout")
            }

        }

        catch (err) {
            console.log(err)
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link to={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserDropDown
