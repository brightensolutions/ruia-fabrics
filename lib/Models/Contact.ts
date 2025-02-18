import mongoose from "mongoose"

const contactSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Contact = mongoose.models["Contact"] || mongoose.model("Contact",contactSchema);
export default Contact


