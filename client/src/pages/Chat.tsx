
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AllChats from "@/components/chats/AllChats";
import ChatContainer from "@/components/chats/ChatContainer";
export default function Chat() {
  const userInfo = useSelector((state: any) => state.userInfo.userInfo);
  
  const navigate = useNavigate();
  const selectedChatData = useSelector((state: any) => state.selectedChat.selectedChatData)
 
  
  useEffect(() => {
    console.log('User Info:', userInfo); // Log userInfo for debugging
    if (userInfo && !userInfo.profileSetup) {
      // Only navigate if profileSetup is false
      toast("Please setup profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-screen w-full mx-auto">
      <AllChats />
      <div>
        {selectedChatData === undefined ? <div className="flex w-full h-full justify-center items-center">
          <p className="text-center">Please select the contact or message to chat</p>
        </div>:<ChatContainer/> }
      </div>
    </div>
  )
}











