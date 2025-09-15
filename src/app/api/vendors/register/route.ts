import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { VendorRegistrationData, Vendor } from "@/types"
import { USER_ROLES } from "@/lib/constants"

// Mock database - replace with your actual database
const vendors: Array<Vendor & {
  _id: string;
  createdAt: string;
  updatedAt: string;
}> = []

export async function POST(request: NextRequest) {
  try {
    const body: VendorRegistrationData = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'email', 'password', 'vendorName', 'businessName', 
      'businessPhone', 'businessAddress'
    ]
    
    for (const field of requiredFields) {
      if (!body[field as keyof VendorRegistrationData]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate business address fields
    const addressFields = ['street', 'city', 'state', 'zipCode', 'country']
    for (const field of addressFields) {
      if (!body.businessAddress[field as keyof typeof body.businessAddress]) {
        return NextResponse.json(
          { message: `Business address ${field} is required` },
          { status: 400 }
        )
      }
    }

    // Check if vendor already exists
    const existingVendor = vendors.find(v => v.email === body.email)
    if (existingVendor) {
      return NextResponse.json(
        { message: "Vendor with this email already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 12)

    // Create vendor object
    const vendor = {
      _id: `vendor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: body.email,
      password: hashedPassword,
      vendorName: body.vendorName,
      businessName: body.businessName,
      businessPhone: body.businessPhone,
      role: USER_ROLES.VENDOR,
      businessAddress: body.businessAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to mock database
    vendors.push(vendor)

    // Return success response (don't include password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...vendorResponse } = vendor
    
    return NextResponse.json(
      {
        message: "Vendor registered successfully",
        vendor: vendorResponse,
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Vendor registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// Export vendors array for use in auth.ts (for login)
export { vendors }
