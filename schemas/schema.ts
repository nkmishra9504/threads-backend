import { Schema, model } from "mongoose";
import { Gender, IUser } from "../types/types";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Gender,
        required: true
    },
    mobile: {
        type: String,
        required: false,
    },
    profile_image: {
        type: String,
        required: false,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },
    soft_delete: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });


const User = model<IUser>("User", userSchema);
export {
    User,
}

