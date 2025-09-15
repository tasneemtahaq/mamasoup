// src/app/api/revalidate/route.ts

import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // A secret token to verify that the request is coming from your webhook service
  const secret = searchParams.get("secret");
  if (secret !== process.env.MY_REVALIDATION_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
    });
  }

  try {
    // Revalidate the homepage (or another page)
    revalidatePath("/");

    return new Response(JSON.stringify({ revalidated: true }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error revalidating", err }),
      { status: 500 }
    );
  }
}
