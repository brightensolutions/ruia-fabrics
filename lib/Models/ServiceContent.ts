import mongoose, { Schema } from "mongoose"

const ServiceContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Textile Is What We Do",
    },
    paragraph1: {
      type: String,
      required: true,
      default:
        "At Ruia Fabrics, textiles are at the core of who we are. We specialize in high-quality Velvet, Voile, Chiffon, Crepe, Georgette, and Linen fabrics, tailored for both domestic and international markets.",
    },
    paragraph2: {
      type: String,
      required: true,
      default:
        "Guided by innovation and a commitment to sustainability, we offer eco-conscious fabric solutions including BCI Cotton, European Flax, FSE Viscose, EcoLIVA, and EcoVero—delivering style with responsibility.",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.ServiceContent || mongoose.model("ServiceContent", ServiceContentSchema)
