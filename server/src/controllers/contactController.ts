import User from "../models/UserModel";

export const searchContacts = async (req: any, res: any, next: any) => {
  try {
    const { searchTerm } = req.body;
    if (searchTerm === undefined || searchTerm === null) {
        return res.status(400).send("search term is required");
    }
    const sanitizedSearchTerm=searchTerm.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&')
    const regex=new RegExp(sanitizedSearchTerm,"i")
    const contacts=await User.find({
        $and:[
            {_id:{$ne:req.userId}},
            {
                $or:[{firstName:regex},{lastName:regex},{email:regex}]
            }
        ]
    })
    return res.status(200).json(contacts) 
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
