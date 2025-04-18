import mongoose, { Schema } from "mongoose"

const ServiceSchema = new Schema(
  {
    imageUrl: {
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

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema)
