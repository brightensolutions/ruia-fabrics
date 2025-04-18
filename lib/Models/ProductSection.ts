import mongoose, { Schema, type Document } from "mongoose"

export interface IProductSection extends Document {
  title: string
  description: string
  image: string
  blobUrl?: string
  linkHref: string
  linkLabel: string
}

const ProductSectionSchema: Schema = new Schema(
  {
    title: { type: String, required: true, default: "Our Products" },
    description: { type: String, required: true },
    image: { type: String, required: true },
    blobUrl: { type: String },
    linkHref: { type: String, default: "/compnay/contact-us" },
    linkLabel: { type: String, default: "Contact Us" },
  },
  { timestamps: true },
)

export default mongoose.models.ProductSection || mongoose.model<IProductSection>("ProductSection", ProductSectionSchema)
