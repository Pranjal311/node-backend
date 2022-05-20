import { Schema, model } from 'mongoose';



const userSchema = new Schema<IUser.User>({
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    phoneNumber: { type: String, required: false, default: "" }
}, {
    timestamps: true
});

// 3. Create a Model.
export const User = model<IUser.User>('User', userSchema);