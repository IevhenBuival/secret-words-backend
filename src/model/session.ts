import { InferSchemaType, model, Schema } from "mongoose";

const sessionSchema = new Schema({
    game:{type: Schema.Types.ObjectId},
    user:{type: Schema.Types.ObjectId, required: true},
    state:{type:String}
},{
    timestamps: true
});
type Sessions = InferSchemaType<typeof sessionSchema>;
export default model<Sessions>("Session",sessionSchema);