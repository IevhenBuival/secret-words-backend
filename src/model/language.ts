import { InferSchemaType, Schema, model } from "mongoose"

const languageSchema = new Schema({
  name: { type: String, required: true, unique: true },
  charset: { type: Schema.Types.ObjectId, required: true },
})

type Languages = InferSchemaType<typeof languageSchema>

export default model<Languages>("Languages", languageSchema)
