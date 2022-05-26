import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import cors from "@/lib/pludo-api/cors";

export function middleware(req: NextRequest) {
    if (req.credentials === "same-origin") {
        return NextResponse.next();
    }
    if (process.env.PLUDO_CLIENT_SECRET === req.headers.get("X-API-KEY")) {
        return cors(req, NextResponse.next());
    } else {
        return new Response("Unauthorized", {
            status: 401,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
}
