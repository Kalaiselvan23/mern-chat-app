import Message from "../models/MessageSchema";

export const getMessages=async(req:any,res:any)=>{
    try{
        const user1=req.body.userId;
        const user2=req.body.id;
        if(!user1 || !user2)
        {
            return res.status(400).json({
                msg:"User 1 and user 2 are required",
            })
        }
        const messages=await Message.find({
            $or:[
                {sender:user1,recipient:user2},
                {sender:user2,recipient:user1},
            ]
        }).sort({timestamp:1})
        return res.status(200).json({messages})

    }
    catch(err)
    {
        return res.status(500).json({
            err:"Unable to fetch messages"
        })
    }
}