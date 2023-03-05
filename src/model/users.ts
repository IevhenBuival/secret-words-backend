import { InferSchemaType, Schema, model} from "mongoose";

const UserSchema = new Schema({
    username:{type:String, required: true, unique: true},
    password:{type:String, required: true, select: false},
    email:{type:String, required: true, select: false},
    rights:{type:String,required: true }
});

type Users = InferSchemaType<typeof UserSchema>;

export default model<Users>("User",UserSchema);