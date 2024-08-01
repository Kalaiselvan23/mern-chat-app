import { Avatar, AvatarImage,AvatarFallback} from '@/components/ui/avatar'
import { NewMessageDialog } from './NewMessageDialog'
import { Input } from '../ui/input'

import { SearchIcon } from '@/icons'
import UserDropDown from './UserDropDown'
import ContactContainer from './ContactContainer'
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
       <ContactContainer/>
      </div>
  )
}

export default AllChats
