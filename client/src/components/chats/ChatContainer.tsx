import React from 'react'
import ChatHeader from './ChatHeader'
import { SendIcon } from '@/icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'


const ChatContainer = () => {
    const [inputValue, setInputValue] = useState("");
    const handleSend = (event: any) => {
        event.preventDefault();

        console.log(inputValue)
        setInputValue("")
    }
    const handleInput = (event: any) => {
        setInputValue(event.target.value);
    }
    return (
        <div className="flex-1 flex flex-col">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[65%]">
                        Hey, how's it going?
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-muted rounded-lg px-4 py-2 max-w-[65%]">I'm doing great, thanks for asking!</div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[65%]">
                        Awesome, we should catch up soon.
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-muted rounded-lg px-4 py-2 max-w-[65%]">
                        Definitely, let's plan something for this weekend.
                    </div>
                </div>
            </div>
            <div className="border-t p-4 flex items-center">
                <Input type="text" placeholder="Type your message..." onChange={handleInput} value={inputValue} className="flex-1 mr-2" />
                <Button onClick={handleSend}>
                    <SendIcon className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
        </div>
    )
}

export default ChatContainer
