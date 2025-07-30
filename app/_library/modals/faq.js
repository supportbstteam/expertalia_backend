import { Schema, model, models } from "mongoose";

const FaqSchema = new Schema(
  {    
    question: { 
      type: String, 
      required: [true, "Question is required"],
    },
    answer: { 
      type: String, 
      required: [true, "Answer is required"],
    },
    sort_order: { 
      type: Number, 
      required: false,
      default: 0
    },
    status: { 
      type: Number, 
      required: false,
      default: 0
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Faq = models.Faq || model('Faq', FaqSchema);
export default Faq;