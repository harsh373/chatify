import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    image: { type: String },
    seen: { type: Boolean, default: false },
     
}, { timestamps: true })


const Message = mongoose.model("Message", messageSchema);

export default Message;



//this code defines a mongoose schema for messages in a chat application it has all the components needed to store messages between users, including sender and receiver IDs, text content, image content, and a seen status. The schema also includes timestamps for when the message was created and updated. The model is then exported for use in other parts of the application.