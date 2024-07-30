import { Avatar, AvatarImage,AvatarFallback} from '@/components/ui/avatar'
import { NewMessageDialog } from './NewMessageDialog'
import { Input } from '../ui/input'

import { SearchIcon } from '@/icons'
import UserDropDown from './UserDropDown'
const AllChats = () => {
  return (
    <div className="bg-muted/20 border-r w-96 p-4">
        <div className="flex items-center justify-between mb-4">
         <UserDropDown/>
          <div className="font-bold text-lg">Messenger</div>
          <NewMessageDialog/>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search contacts..." className="pl-8 w-full" />
        </div>
        <div className="mt-4 space-y-2">
          {
            ['kalaiselvan',"selvan"].map((chats)=>{
                return <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted" >
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground truncate">Hey, how's it going?</div>
                </div>
                <div className="text-xs text-muted-foreground">2h</div>
              </a>
            })
          }
          
        
          
        </div>
      </div>
  )
}

export default AllChats
