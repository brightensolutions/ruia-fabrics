import mongoose from "mongoose"

const fabricPhotoSchema = new mongoose.Schema({
  imageUrls: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const FabricPhoto = mongoose.models["FabricPhoto"] || mongoose.model("FabricPhoto",fabricPhotoSchema);
export default FabricPhoto

