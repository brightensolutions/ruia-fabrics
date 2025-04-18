import mongoose, { Schema } from "mongoose"

const SustainableFabricSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    icon: {
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
    blobImageUrl: {
      type: String,
      required: true,
    },
    blobIconUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.SustainableFabric || mongoose.model("SustainableFabric", SustainableFabricSchema)
