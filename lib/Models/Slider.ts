import mongoose, { Schema } from "mongoose"

const SliderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
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

export default mongoose.models.Slider || mongoose.model("Slider", SliderSchema)
