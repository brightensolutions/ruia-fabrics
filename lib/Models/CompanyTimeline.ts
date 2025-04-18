import mongoose, { Schema } from "mongoose"

const TimelineEventSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#2c5e3f",
  },
  order: {
    type: Number,
    default: 0,
  },
})

const CompanyTimelineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Our Rich Heritage",
    },
    subtitle: {
      type: String,
      required: true,
      default: "A legacy of textile excellence rooted in innovation, craftsmanship, and a commitment to quality.",
    },
    events: [TimelineEventSchema],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.CompanyTimeline || mongoose.model("CompanyTimeline", CompanyTimelineSchema)
