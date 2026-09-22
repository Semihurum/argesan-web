import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Soru alani zorunludur"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Cevap alani zorunludur"],
    },
    category: {
      type: String,
      default: "Genel",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model("Faq", FaqSchema);
