import { InferSchemaType, model, Schema } from "mongoose";

const gameSchema = new Schema({
    title:{type: String, required: true },
    language:{type: Schema.Types.ObjectId},
    author:{type: Schema.Types.ObjectId, required: true},
    state:{type:String}
},{
    timestamps: true
});
type Games = InferSchemaType<typeof gameSchema>;
export default model<Games>("Game",gameSchema);