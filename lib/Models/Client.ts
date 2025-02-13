import mongoose from "mongoose"

const ClientSchema = new mongoose.Schema({
  logoUrls: [{ type: String, required: true }],
  })



const Client = mongoose.models["Client"] || mongoose.model("Client", ClientSchema)

export default Client

