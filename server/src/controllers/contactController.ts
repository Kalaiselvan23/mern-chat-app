import mongoose from "mongoose";
import User from "../models/UserModel";
import Message from "../models/MessageSchema";

export const searchContacts = async (req: any, res: any, next: any) => {
  try {
    const { searchTerm } = req.body;
    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).send("search term is required");
    }
    const sanitizedSearchTerm = searchTerm.replace(
      /[#-.]|[[-^]|[?|{}]/g,
      "\\$&"
    );
    const regex = new RegExp(sanitizedSearchTerm, "i");
    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });
    return res.status(200).json(contacts);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};

export const getContactsForDm = async (req: any, res: any) => {
  try {
    let { email } = req;
    console.log(req.email);
    // email = new mongoose.Types.ObjectId(userId);
    const contacts = await Message.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "senderInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "recipient",
          foreignField: "_id",
          as: "recipientInfo",
        },
      },
      {
        $addFields: {
          senderEmail: { $arrayElemAt: ["$senderInfo.email", 0] },
          recipientEmail: { $arrayElemAt: ["$recipientInfo.email", 0] },
        },
      },
      {
        $match: {
          $or: [{ senderEmail: email }, { recipientEmail: email }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$senderEmail", email] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contact_info",
        },
      },
      {
        $unwind: "$contact_info",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contact_info.email",
          firstName: "$contact_info.firstName",
          lastName: "$contact_info.lastName",
          color: "$contact_info.color",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);
    console.log(contacts);
    return res.status(200).json({ contacts });
  } catch (err) {
    return res.status(500).json({
      msg: "unable to fetch contacts",
    });
  }
};
