import mongoose, { Schema } from "mongoose"

const CompanyVisionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Our Vision",
    },
    paragraph1: {
      type: String,
      required: true,
      default:
        "To be recognized as one of the leading textile producers in the country, committed to quality, sustainability, and innovation. We aim to establish a strong global presence in the textile industry while upholding the highest standards of craftsmanship.",
    },
    paragraph2: {
      type: String,
      required: true,
      default:
        "Our goal is to exceed customer expectations by delivering premium, sustainable fabrics and to be among the most esteemed textile companies by maintaining integrity, transparency, and excellence in all our stakeholder relationships.",
    },
    image: {
      type: String,
      default: "/company/OurVision.jpg",
    },
    mobileTitle: {
      type: String,
      default: "Crafting Tomorrow's Textiles",
    },
    blobUrl: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.CompanyVision || mongoose.model("CompanyVision", CompanyVisionSchema)
