import { put, del } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import Product from "@/lib/Models/Product"
import ConnectDb from "@/lib/db/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    await ConnectDb()
    const product = await Product.findById(resolvedParams.id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    await ConnectDb()

    const product = await Product.findById(resolvedParams.id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const formData = await req.formData()
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

    let mainImage = (formData.get("mainImageUrl") as string) || product.mainImage
    let overlayImage = (formData.get("overlayImageUrl") as string) || product.overlayImage

    // Upload main image to Vercel Blob if provided
    if (mainImageFile && mainImageFile.size > 0) {
      // Delete old blob if exists
      if (product.blobMainUrl) {
        try {
          await del(product.blobMainUrl)
        } catch (error) {
          console.error("Error deleting old main image blob:", error)
        }
      }

      const blob = await put(`products/${Date.now()}-${mainImageFile.name}`, mainImageFile, {
        access: "public",
      })
      mainImage = blob.url
      product.blobMainUrl = blob.url
    }

    // Upload overlay image to Vercel Blob if provided
    if (overlayImageFile && overlayImageFile.size > 0) {
      // Delete old blob if exists
      if (product.blobOverlayUrl) {
        try {
          await del(product.blobOverlayUrl)
        } catch (error) {
          console.error("Error deleting old overlay image blob:", error)
        }
      }

      const blob = await put(`products/${Date.now()}-${overlayImageFile.name}`, overlayImageFile, {
        access: "public",
      })
      overlayImage = blob.url
      product.blobOverlayUrl = blob.url
    }

    product.title = title
    product.titleColor = titleColor
    product.description = description
    product.paragraphColor = paragraphColor
    product.mainImage = mainImage
    product.overlayImage = overlayImage
    product.imagePosition = imagePosition
    product.connectUsLink = connectUsLink
    product.bgcolor = bgcolor
    product.sectioncolor = sectioncolor
    product.btncolor = btncolor
    product.order = order

    await product.save()

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    await ConnectDb()

    const product = await Product.findById(resolvedParams.id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Delete images from Vercel Blob if they exist
    if (product.blobMainUrl) {
      try {
        await del(product.blobMainUrl)
      } catch (error) {
        console.error("Error deleting main image blob:", error)
      }
    }

    if (product.blobOverlayUrl) {
      try {
        await del(product.blobOverlayUrl)
      } catch (error) {
        console.error("Error deleting overlay image blob:", error)
      }
    }

    await Product.findByIdAndDelete(resolvedParams.id)

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
