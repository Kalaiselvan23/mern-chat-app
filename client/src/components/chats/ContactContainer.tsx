import React, { useEffect } from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '../ui/avatar'
import apiClient from '@/lib/apiClient'
import { GET_CONTACTS_FOR_DM } from '@/lib/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setDirectMessageContacts, setSelectedChatData, setSelectedChatType } from '@/slices/chatSlice';
const ContactContainer = () => {
    useEffect(()=>{
        const getContacts=async()=>{
            const res=await apiClient.get(GET_CONTACTS_FOR_DM,{
                withCredentials:true,
            })
            if(res.data)
            {
                console.log(res.data.contacts);
                dispatch(setDirectMessageContacts(res.data.contacts))
            }
        }
        getContacts()
        
    },[])
    const {selectedChatData,directMessageContacts}=useSelector((state:any)=>state.selectedChat)
    const dispatch=useDispatch();
    const handleClick=(contact)=>{
        console.log("Chat clicked")
        console.log(contact)
        dispatch(setSelectedChatType('contact'))
        if(selectedChatData && selectedChatData._id !== contact._id)
        {
            dispatch(setSelectedChatData(null));
            dispatch(setSelectedChatData(contact))
        }
        
    }
  return (
    <div className="mt-4 space-y-2">
    {
     directMessageContacts.map((contact:any)=>{
          return <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted" onClick={()=>handleClick(contact)} >
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <div className="font-medium">{contact.firsName && contact.lastName ? `${contact.firstName} ${contact.lastName}`:`${contact.email}`}</div>
            <div className="text-sm text-muted-foreground truncate">Hey, how's it going?</div>
          </div>
          <div className="text-xs text-muted-foreground">2h</div>
        </div>
      })
    }
    
  
    
  </div>
  )
}

export default ContactContainer
