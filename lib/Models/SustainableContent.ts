import mongoose, { Schema } from "mongoose"

const SustainableContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Sustainable Style, Woven With Care.",
    },
    quote: {
      type: String,
      required: true,
      default:
        "\"Sustainability for us means creating long-term value for people, the planet, and shared prosperity. It's not just about doing good—it's about making a lasting impact through every choice we make.\"",
    },
    description: {
      type: String,
      required: true,
      default:
        "Our Responsible For framework reflects our commitment to mindful sourcing, ethical production, and conscious decision-making—ensuring every fabric is crafted with purpose and care.",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.SustainableContent || mongoose.model("SustainableContent", SustainableContentSchema)
