import mongoose, { Schema, type Document } from "mongoose"

export interface IBusiness extends Document {
  title: string
  description: string
  imageUrl: string
  imagePosition: "left" | "right"
  titleColor: string
  paragraphColor: string
  order: number
  slug: string
  createdAt: Date
  updatedAt: Date
}

const BusinessSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePosition: { type: String, enum: ["left", "right"], default: "left" },
    titleColor: { type: String, default: "text-custom-green" },
    paragraphColor: { type: String, default: "text-custom-black/80" },
    order: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

export default mongoose.models.Business || mongoose.model<IBusiness>("Business", BusinessSchema)
