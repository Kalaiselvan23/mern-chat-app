import React from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { VideoIcon } from '@/icons'
import { PhoneIcon } from '@/icons'
import { useSelector } from 'react-redux'
const ChatHeader = () => {
    const contact=useSelector((state:any)=>state.selectedChat.selectedChatData)
    console.log(contact)
  return (
    <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">
                {contact?.firstName && contact?.lastName ? `${contact?.firstName} ${contact?.lastName}` : contact?.email}
              </div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <PhoneIcon className="h-5 w-5" />
              <span className="sr-only">Call</span>
            </Button>
            <Button variant="ghost" size="icon">
              <VideoIcon className="h-5 w-5" />
              <span className="sr-only">Video Call</span>
            </Button>
          </div>
        </div>
  )
}

export default ChatHeader
