import { InferSchemaType, Schema, model } from "mongoose"

const CharSetSchema = new Schema({
  name: { type: String, required: true, unique: true },
})

type CharSets = InferSchemaType<typeof CharSetSchema>

export default model<CharSets>("CharSets", CharSetSchema)
