import mongoose, { Schema, type Document } from "mongoose"

export interface IProduct extends Document {
  title: string
  titleColor: string
  description: string
  paragraphColor: string
  mainImage: string
  overlayImage?: string
  blobMainUrl?: string
  blobOverlayUrl?: string
  imagePosition: "left" | "right"
  connectUsLink: string
  bgcolor: string
  sectioncolor?: string
  btncolor: string
  order: number
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    titleColor: { type: String, default: "text-custom-green" },
    description: { type: String, required: true },
    paragraphColor: { type: String, default: "text-custom-black/80" },
    mainImage: { type: String, required: true },
    overlayImage: { type: String },
    blobMainUrl: { type: String },
    blobOverlayUrl: { type: String },
    imagePosition: { type: String, enum: ["left", "right"], default: "right" },
    connectUsLink: { type: String, default: "/compnay/contact-us" },
    bgcolor: { type: String, default: "bg-custom-white" },
    sectioncolor: { type: String },
    btncolor: { type: String, default: "bg-custom-green" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
