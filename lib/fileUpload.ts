import fs from "fs"
import path from "path"

export async function uploadFile(file: Buffer, fileName: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads")

  // Create the uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  const filePath = path.join(uploadsDir, fileName)

  // Write the file
  await fs.promises.writeFile(filePath, file)

  // Return the relative path
  return `/uploads/${fileName}`
}

