import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {  SearchIcon } from "@/icons"
import apiClient from "@/lib/apiClient"
import { SEARCH_CONTACT_ROUTE } from "@/lib/constants"
import { setSelectedChatData, setSelectedChatType } from "@/slices/chatSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SquarePen } from "lucide-react"

export function NewMessageDialog() {
    const [searchTerm, setSearchTerm] = useState("");
    const [contacts, setContacts] = useState([]);
    const dispatch=useDispatch();
    const handleChange = (event: any) => {
        searchContact(event.target.value)
    }
    const searchContact = async (searchTerm: string) => {
        try {
            if (searchTerm.length > 1) {
                const res = await apiClient.post(SEARCH_CONTACT_ROUTE, { searchTerm }, { withCredentials: true });
                console.log(res);

                if (res.status === 200) {
                    setContacts(res.data);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    const handleNewContact=(contact:any)=>{
        //close dialog
        //update the selected contact in the redux
        console.log(JSON.stringify(contact))
         dispatch(setSelectedChatData(contact))
         dispatch(setSelectedChatType("contact"))
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                <SquarePen />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription>
                        Search contact to send message
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center items-center gap-2">
                        <Input
                            id="searchTerm"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                            onChange={handleChange}
                        />
                        <SearchIcon />
                    </div>
                    <div>
                        {contacts && contacts.length > 0 ? contacts.map((contact: any) => {
                            return <div onClick={()=>handleNewContact(contact)}>
                                {contact.firstname && contact.lastname ? `${contact.firstname} ${contact.lastname}`:contact.email}
                            </div>
                        }) : null}
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
