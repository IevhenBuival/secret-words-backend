import { InferSchemaType, model, Schema } from "mongoose";

const wordSchema = new Schema({
    title:{type: String, required: true ,unique: true},
    language:{type: Schema.Types.ObjectId},
    author:{type: Schema.Types.ObjectId, required: true},
    number:{type:Number}
},{
    timestamps: true
});
type Words = InferSchemaType<typeof wordSchema>;
export default model<Words>("Word",wordSchema);
