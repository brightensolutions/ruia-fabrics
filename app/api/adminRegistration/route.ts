import ConnectDb from "@/lib/db/db";

export async function POST(req:any){
  await ConnectDb();

  try {
    const data = {
        email: "admin@gmail.com",
        password: "123456"
    }


  } catch (error) {
    
  }
}