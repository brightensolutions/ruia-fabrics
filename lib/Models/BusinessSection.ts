import mongoose, { Schema, type Document } from "mongoose"

export interface IBusinessSection extends Document {
  title: string
  description: string
  imageUrl: string
  buttonText: string
  buttonLink: string
  createdAt: Date
  updatedAt: Date
}

const BusinessSectionSchema: Schema = new Schema(
  {
    title: { type: String, required: true, default: "Business" },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    buttonText: { type: String, default: "Contact Us" },
    buttonLink: { type: String, default: "/compnay/contact-us" },
  },
  { timestamps: true },
)

export default mongoose.models.BusinessSection ||
  mongoose.model<IBusinessSection>("BusinessSection", BusinessSectionSchema)
