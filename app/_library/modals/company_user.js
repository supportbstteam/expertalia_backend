import { Schema, model, models } from "mongoose";

const CompanyUserSchema = new Schema(
  {    
    first_name: { 
      type: String, 
      required: [true, "First Name is required"],
    },
    last_name: { 
      type: String, 
      required: [true, "Last Name is required"],
    },
    email: { 
      type: String, 
      required: [true, "Email is required"],
      unique: [true, "This email id is already registered"],
    }, 
    email_verified: { 
      type: Boolean, 
      default: false
    },       
    password: { 
      type: String, 
      required: false,
    },
    phone_extension:{
      type: String, 
      required: false,
    },
    phone: { 
      type: String, 
      required: false,
    },
    profile_image: { 
      type: String, 
      required: false,
    },    
    companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],    
    status: { 
      type: Number, 
      required: false,
      default: 0
    },
    login_status: { 
      type: Number, 
      required: false,
      default: 0
    },
    verify_email_token: String,
    verify_email_token_expiry: Date,
    forgot_password_token: String,
    forgot_password_token_expiry: Date,  
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const CompanyUser = models.CompanyUser || model('CompanyUser', CompanyUserSchema);
export default CompanyUser;