import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import UserModel from '../modules/user/models/UserModel.js'
import CompanyModel from '../modules/cms/company/CompanyModel.js'

const seed = async () => {
  try {
    console.log("Connecting to MongoDB for seeding...")
    const mongoUri = process.env.MONGO_DB || "mongodb://127.0.0.1:27017/techzen"
    await mongoose.connect(mongoUri)
    console.log("Connected to MongoDB.")

    // 1. Seed or verify Admin User
    const existingAdmin = await UserModel.findOne({ email: "admin@techzen.io" })
    if (!existingAdmin) {
      console.log("Creating default Admin user (admin@techzen.io)...")
      const hashedPassword = await bcrypt.hash("Admin@123456", 10)
      const admin = await UserModel.create({
        firstName: "TechZen",
        lastName: "Admin",
        email: "admin@techzen.io",
        phone: "9999999999",
        password: hashedPassword,
        role: "admin",
        roles: ["admin"],
        isActive: true,
        address: {
          country: "India",
          state: "Madhya Pradesh",
          city: "Chhatarpur",
          pinCode: "471001",
          addressLine1: "TechZen HQ",
        },
      })
      console.log("✅ Admin user created successfully:", admin.email)
    } else {
      console.log("ℹ️ Admin user already exists:", existingAdmin.email)
    }

    // 2. Seed Company Information if empty
    const existingCompany = await CompanyModel.findOne({ key: "main" })
    if (!existingCompany) {
      console.log("Seeding initial company information...")
      await CompanyModel.create({
        key: "main",
        name: "TechZen",
        descriptor: "Consulting & Software Development",
        email: "techzen@gmail.com",
        phone: "9302039953",
        location: "Chhatarpur, MP, India",
        hours: "Monday - Saturday, 10:00 AM - 6:00 PM",
        linkedin: "https://www.linkedin.com/company/techzen",
        facebook: "https://www.facebook.com/techzen",
        whatsapp: "https://wa.me/919302039953",
        instagram: "https://www.instagram.com/techzen",
        github: "https://github.com/ArshlanSheikh",
        introduction: "TechZen is a technology solutions company focused on building modern websites, web applications, software solutions, and digital services for businesses.",
        about: "We combine modern technologies, practical solutions, and user-focused design to help businesses establish and grow their digital presence.",
        mission: "To deliver reliable, scalable, and practical technology solutions that solve real business challenges.",
        vision: "To become a trusted technology partner for businesses through innovation, quality, and continuous improvement.",
        statistics: [
          { label: "Services", value: "10+" },
          { label: "Technology Solutions", value: "Custom" },
          { label: "Support", value: "Ongoing" },
        ],
        whyChooseUs: [
          {
            title: "Modern Technology",
            description: "We use current and proven technologies to build reliable digital solutions.",
          },
          {
            title: "Business-Focused Solutions",
            description: "We develop solutions around real business requirements and workflows.",
          },
          {
            title: "Scalable Architecture",
            description: "Our applications are designed with future growth and maintainability in mind.",
          },
        ],
      })
      console.log("✅ Initial company info created.")
    } else {
      console.log("ℹ️ Company info already exists.")
    }

    console.log("Seeding completed successfully.")
    process.exit(0)
  } catch (err) {
    console.error("❌ Seeding error:", err)
    process.exit(1)
  }
}

seed()
