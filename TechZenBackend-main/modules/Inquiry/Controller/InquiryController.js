import InquiryModel from "../Models/InquiryModel.js";
import { sendOutsourcingNotification } from "../Services/emailService.js";






// ============================================
// Get Single Inquiri By id
// ============================================
const GetSingleInquiry = async (req, res) => {
    try {
        const { id } = req.params;

        const Inquiry = await InquiryModel.findById(id);

        if (!Inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
                data: null,
                error: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inquiry fetched successfully",
            data: Inquiry,
            error: null,
        });
    }
    catch (error) {
        console.log("Failed to handle GetSingleInquiry", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};




// ============================================
// Get All Inquiries
// ============================================

const GetAllInquiry = async (req, res) => {
    try {

        const AllInquiry = await InquiryModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Inquiries fetched successfully",
            data: AllInquiry,
            error: null,
        });
    } 
    catch (error) {
        console.log("Failed to handle GetAllInquiry", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};




// ============================================
// Register Inquiry
// ============================================
const RegisterInquiry = async (req, res) => {
    try {
        console.log('Hit RegisterInquiry Api....')
        const commingData = req.body;

        const RequiredFields = [
            "name",
            "email",
            "phone",
            "service",
            "contactMethod",
            "message",
        ];

        const MissingFields = RequiredFields.filter((item) => {
            return (
                commingData[item] === null ||
                commingData[item] === undefined ||
                commingData[item] === ""
            );
        });

        if (MissingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
                data: null,
                error: MissingFields,
            });
        }

        if(commingData.phone.length !== 10){
            return res.status(400).json({success:false,message:"Phone number must contain exactly 10 digits",data:null,error:"Phone number must contain exactly 10 digits" ,})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(commingData.email.trim())){
            return res.status(400).json({success:false,message:"Invalid email address",data:null,error:"Invalid email address" ,})
        }


        commingData['status'] = 'pending'
        commingData.company = commingData.company === "" ? "private" : commingData.company;

        const NewInquiry = await InquiryModel.create(commingData);

        return res.status(201).json({
            success: true,
            message: "Inquiry registered successfully",
            data: NewInquiry,
            error: null,
        });
    } 
    catch (error) {
        console.log("Failed to handle RegesterInquiry", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};




// ============================================
// Update Inquiry
// ============================================
const UpdateInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const allowedStatuses = ["new", "pending", "contacted", "in-progress", "completed", "rejected"];
        const { status } = req.body;

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid inquiry status",
                data: null,
                error: "INVALID_STATUS",
            });
        }

        const UpdatedInquiry = await InquiryModel.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!UpdatedInquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
                data: null,
                error: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inquiry updated successfully",
            data: UpdatedInquiry,
            error: null,
        });
    } 
    catch (error) {
        console.log("Failed to handle UpdateInquiry", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};


// ============================================
// Delete Inquiry
// ============================================
const DeleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;

        const DeletedInquiry = await InquiryModel.findByIdAndDelete(id);

        if (!DeletedInquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
                data: null,
                error: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully",
            data: DeletedInquiry,
            error: null,
        });
    } 
    catch (error) {
        console.log("Failed to handle DeleteInquiry", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
            error: error.message,
        });
    }
};


// ============================================
// Register Software Development Outsourcing Inquiry
// ============================================
const RegisterOutsourcingInquiry = async (req, res) => {
    try {
        console.log("Hit RegisterOutsourcingInquiry Api....");
        const body = req.body || {};

        const {
            name,
            email,
            company,
            website,
            country,
            phone,
            partnershipType,
            requiredServices,
            budget,
            message,
            preferredEngagement,
            consent
        } = body;

        // 1. Validate required fields
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Full Name is required.",
                error: "MISSING_NAME"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "A valid business email address is required.",
                error: "INVALID_EMAIL"
            });
        }

        if (!company || typeof company !== "string" || !company.trim()) {
            return res.status(400).json({
                success: false,
                message: "Company Name is required.",
                error: "MISSING_COMPANY"
            });
        }

        if (!country || typeof country !== "string" || !country.trim()) {
            return res.status(400).json({
                success: false,
                message: "Country is required.",
                error: "MISSING_COUNTRY"
            });
        }

        if (!partnershipType || typeof partnershipType !== "string" || !partnershipType.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please select a Partnership Type.",
                error: "MISSING_PARTNERSHIP_TYPE"
            });
        }

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Project or requirement description is required.",
                error: "MISSING_MESSAGE"
            });
        }

        if (consent !== true && consent !== "true") {
            return res.status(400).json({
                success: false,
                message: "Please accept the consent terms to proceed.",
                error: "MISSING_CONSENT"
            });
        }

        // Clean values
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanCompany = company.trim();
        const cleanCountry = country.trim();
        const cleanWebsite = (website && typeof website === "string") ? website.trim() : "";
        const cleanPhone = (phone && typeof phone === "string") ? phone.trim() : "";
        const cleanPartnershipType = partnershipType.trim();
        const cleanBudget = (budget && typeof budget === "string") ? budget.trim() : "Not Decided";
        const cleanPreferredEngagement = (preferredEngagement && typeof preferredEngagement === "string") ? preferredEngagement.trim() : "Not Decided";
        const cleanServices = Array.isArray(requiredServices) ? requiredServices.filter(Boolean) : [];
        const rawMessage = message.trim();

        // Formatted combined message for universal admin inspection
        const formattedOverview = `[Outsourcing Partner: ${cleanCompany} (${cleanCountry})] [Type: ${cleanPartnershipType}] [Budget: ${cleanBudget}] [Engagement: ${cleanPreferredEngagement}] [Services: ${cleanServices.length > 0 ? cleanServices.join(", ") : "General Tech Outsourcing"}]${cleanWebsite ? ` [Website: ${cleanWebsite}]` : ""}\n\n${rawMessage}`;

        // 2. Persist to MongoDB Inquiry collection
        const newInquiry = await InquiryModel.create({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            company: cleanCompany,
            country: cleanCountry,
            website: cleanWebsite,
            service: `Outsourcing - ${cleanPartnershipType}`,
            partnershipType: cleanPartnershipType,
            requiredServices: cleanServices,
            budget: cleanBudget,
            preferredEngagement: cleanPreferredEngagement,
            message: formattedOverview,
            contactMethod: cleanPhone ? "Phone" : "Email",
            status: "pending",
            source: "software-outsourcing-page"
        });

        // 3. Dispatch Email Notification asynchronously
        sendOutsourcingNotification({
            id: newInquiry._id,
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            company: cleanCompany,
            country: cleanCountry,
            website: cleanWebsite,
            partnershipType: cleanPartnershipType,
            requiredServices: cleanServices,
            budget: cleanBudget,
            preferredEngagement: cleanPreferredEngagement,
            message: rawMessage
        }).catch((err) => {
            console.error("Non-fatal error in sendOutsourcingNotification:", err.message);
        });

        return res.status(201).json({
            success: true,
            message: "Partnership enquiry submitted successfully! Our technology leadership team will review your requirements and connect with you within 24 hours.",
            data: {
                id: newInquiry._id,
                name: newInquiry.name,
                company: newInquiry.company,
                partnershipType: newInquiry.partnershipType,
                createdAt: newInquiry.createdAt
            },
            error: null
        });
    } catch (error) {
        console.error("Failed to handle RegisterOutsourcingInquiry", error);
        return res.status(500).json({
            success: false,
            message: "Could not submit your partnership enquiry. Please reach out directly to techzen432@gmail.com.",
            data: null,
            error: error.message
        });
    }
};

export {
    GetSingleInquiry,
    GetAllInquiry,
    RegisterInquiry,
    RegisterOutsourcingInquiry,
    UpdateInquiry,
    DeleteInquiry,
};