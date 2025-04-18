import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import Product from "@/lib/Models/Product"
import ConnectDb from "@/lib/db/db"

export async function GET() {
  try {
    await ConnectDb()
    const products = await Product.find().sort({ order: 1 })
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await ConnectDb()

    const formData = await request.formData()
    const title = formData.get("title") as string
    const titleColor = formData.get("titleColor") as string
    const description = formData.get("description") as string
    const paragraphColor = formData.get("paragraphColor") as string
    const imagePosition = formData.get("imagePosition") as "left" | "right"
    const connectUsLink = formData.get("connectUsLink") as string
    const bgcolor = formData.get("bgcolor") as string
    const sectioncolor = formData.get("sectioncolor") as string
    const btncolor = formData.get("btncolor") as string
    const order = Number.parseInt(formData.get("order") as string) || 0

    const mainImageFile = formData.get("mainImage") as File | null
    const overlayImageFile = formData.get("overlayImage") as File | null

    let mainImage = formData.get("mainImageUrl") as string
    let overlayImage = formData.get("overlayImageUrl") as string
    let blobMainUrl = ""
    let blobOverlayUrl = ""

    // Upload main image to Vercel Blob if provided
    if (mainImageFile && mainImageFile.size > 0) {
      const blob = await put(`products/${Date.now()}-${mainImageFile.name}`, mainImageFile, {
        access: "public",
      })
      mainImage = blob.url
      blobMainUrl = blob.url
    }

    // Upload overlay image to Vercel Blob if provided
    if (overlayImageFile && overlayImageFile.size > 0) {
      const blob = await put(`products/${Date.now()}-${overlayImageFile.name}`, overlayImageFile, {
        access: "public",
      })
      overlayImage = blob.url
      blobOverlayUrl = blob.url
    }

    const product = await Product.create({
      title,
      titleColor,
      description,
      paragraphColor,
      mainImage,
      overlayImage,
      blobMainUrl,
      blobOverlayUrl,
      imagePosition,
      connectUsLink,
      bgcolor,
      sectioncolor,
      btncolor,
      order,
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
