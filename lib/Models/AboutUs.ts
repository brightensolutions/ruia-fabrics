import mongoose, { Schema } from "mongoose"

const AboutUsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "About Us",
    },
    description: {
      type: String,
      required: true,
      default:
        "Ruia Fabrics is a leading name in the textile industry, specializing in high-quality Velvet, Linen, and Viscose fabrics. With a legacy built on innovation, craftsmanship, and sustainability, we proudly cater to both domestic and international markets—offering competitive, world-class textile solutions that meet the evolving demands of fashion and lifestyle industries.",
    },
    image: {
      type: String,
      default: "/company/about-us-images.jpg",
    },
    linkHref: {
      type: String,
      default: "/compnay/contact-us",
    },
    linkLabel: {
      type: String,
      default: "Contact Us",
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

export default mongoose.models.AboutUs || mongoose.model("AboutUs", AboutUsSchema)
