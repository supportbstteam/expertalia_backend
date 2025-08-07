import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {    
    first_name: { 
      type: String, 
      required: [true, "Name is required"],
    },
    last_name: { 
      type: String, 
      required: [true, "Name is required"],
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
      required: [true, "Password is required"],
    },
    phone: { 
      type: String, 
      required: false,
    },
    profile_image: { 
      type: String, 
      required: false,
    },
    // role_id: { 
    //   type: String, 
    //   required: true,
    // },
    // role: { type: Schema.Types.ObjectId, ref: "Role" },
    // company: { 
    //   type: String, 
    //   required: false,
    // },
    userType: {
      type: String,
      required: true,
    },
    country: { 
      type: String, 
      required: false,
    },
    address: { 
      type: String, 
      required: false,
    },
    about: { 
      type: String, 
      required: false,
    },
    date_of_birth: { 
      type: Date, 
      required: false,
      default: ''
    },
    social_media: { 
      type: String, 
      required: false,
    },
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

const User = models.User || model('User', UserSchema);
export default User;