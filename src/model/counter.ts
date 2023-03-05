import { InferSchemaType, Schema, model} from "mongoose";

const NumeratorsSchema = new Schema({
    name:{type:String, required: true, unique: true},
    numerator:{type:Number, required: true},    
});

type Numerators = InferSchemaType<typeof NumeratorsSchema>;

export default model<Numerators>("Numerators",NumeratorsSchema);