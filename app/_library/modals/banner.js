import { Schema, model, models } from "mongoose";

const BannerSchema = new Schema(
  {    
    banner_image: { 
      type: String, 
      required: [true, "Banner image is required"],
    },
    banner_text: { 
      type: String, 
      required: false,
    },
    bannercat_id: { 
      type: String, 
      required: true,
    },
    banner_category: { type: Schema.Types.ObjectId, ref: "BannerCategory" },
    url_type: { 
      type: String, 
      required: false,
    },
    url: { 
      type: String, 
      required: false,
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

const Banner = models.Banner || model('Banner', BannerSchema);
export default Banner;