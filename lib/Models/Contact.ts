import mongoose, { Schema } from "mongoose"

const ContactSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      default: "+91 7021418483",
    },
    email: {
      type: String,
      required: true,
      default: "admin@ruiafabrics.com",
    },
    headOfficeAddress: {
      type: String,
      required: true,
      default: "Ruia Fabrics Pvt Ltd, A2/187 Shah & Nahar Ind Est, Lower Parel- West, Mumbai : 400013",
    },
    factoryAddress: {
      type: String,
      required: true,
      default:
        "Govindji Industrial Park-3, Plot No: 0-168/ 0-171, Near Hotel Sabar, Palsana Road, Surat : 394315, Gujarat",
    },
    title: {
      type: String,
      default: "Contact Us",
    },
    subtitle: {
      type: String,
      default: "We'd love to hear from you! Reach out using the contact information below.",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema)
