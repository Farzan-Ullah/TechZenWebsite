import mongoose from "mongoose";

const InquiryModelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 160,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 160,
        },

        phone: {
            type: String,
            trim: true,
            maxlength: 40,
            default: "",
        },

        country: {
            type: String,
            trim: true,
            default: "",
        },

        website: {
            type: String,
            trim: true,
            default: "",
        },

        partnershipType: {
            type: String,
            trim: true,
            default: "",
        },

        requiredServices: [{
            type: String,
            trim: true,
        }],

        budget: {
            type: String,
            trim: true,
            default: "",
        },

        preferredEngagement: {
            type: String,
            trim: true,
            default: "",
        },

        source: {
            type: String,
            trim: true,
            default: "website",
        },

        company: {
            type: String,
            trim: true,
            maxlength: 160,
            default:"private"
        },

        service: {
            type: String,
            required: true,
            trim: true,
        },

        contactMethod: {
            type: String,
            enum: ["Email", "Phone", "WhatsApp", "Video call"],
            default: "Email",
        },

        message: {
            type: String,
            trim: true,
            minlength: 10,
            maxlength: 5000,
        },
        status:{
            type: String,
            required: true,
            trim: true,
            enum: ["new", "pending", "contacted", "in-progress", "completed", "rejected"],
            default: "pending",
        }

    },
    {
        timestamps:true
    }
)

const InquiryModel = mongoose.model('InquiryModel',InquiryModelSchema)

export default  InquiryModel