import mongoose, { Schema } from "mongoose"

const BrandSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    blobUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Brand || mongoose.model("Brand", BrandSchema)
