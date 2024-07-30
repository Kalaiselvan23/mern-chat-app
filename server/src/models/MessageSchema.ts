import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  messageType: "text" | "file";
  content?: string;
  fileUrl?: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    required: function (this: IMessage) {
      return this.messageType === "text";
    },
  },
  fileUrl: {
    type: String,
    required: function (this: IMessage) {
      return this.messageType === "file";
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message=mongoose.model("Messages",messageSchema);
export default Message
