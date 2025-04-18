import mongoose, { Schema } from "mongoose"

const WelcomeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Welcome To Ruia Fabrics",
    },
    paragraph1: {
      type: String,
      required: true,
      default:
        "Ruia Fabrics is a premier textile solutions provider based in Western India, specializing in the manufacturing and trading of a diverse range of high-quality fabrics. With over a decade of industry expertise, we are committed to delivering value-added textile solutions while building a strong and distinguished presence in the Indian textile market.",
    },
    paragraph2: {
      type: String,
      required: true,
      default:
        "Our core expertise lies in producing premium resort wear fabrics, including 100% Cotton, 100% Linen, and Blends with Lyocell, Modal, and Viscose. We also offer luxurious fabrics such as Chiffon, Crepe, and Georgette, catering to the evolving needs of the fashion industry. With our expansion into luxury textiles—particularly Velvet—Ruia Fabrics continues to set new benchmarks in quality, innovation, and craftsmanship.",
    },
    button1Text: {
      type: String,
      default: "About Us",
    },
    button1Link: {
      type: String,
      default: "/compnay/about-us",
    },
    button2Text: {
      type: String,
      default: "Contact Us",
    },
    button2Link: {
      type: String,
      default: "/compnay/contact-us",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Welcome || mongoose.model("Welcome", WelcomeSchema)
