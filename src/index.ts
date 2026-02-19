import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { db } from "./db";
import { testResults } from "./db/schema";
import { desc } from "drizzle-orm";

const app = new Elysia()
    .use(cors())
    .get("/", () => ({ status: "online", service: "Dyagnoz API" }))

    // Endpoint to store test results
    .post("/results", async ({ body }) => {
        const result = await db.insert(testResults).values({
            ...body,
            // Ensure date_time is handled if coming as string
            dateTime: body.dateTime ? new Date(body.dateTime) : new Date(),
        }).returning();

        return {
            success: true,
            data: result[0],
        };
    }, {
        body: t.Object({
            deviceName: t.Optional(t.String()),
            model: t.Optional(t.String()),
            color: t.Optional(t.String()),
            storage: t.Optional(t.String()),
            serial: t.Optional(t.String()),
            imei: t.Optional(t.String()),
            icloud: t.Optional(t.String()),
            fmip: t.Optional(t.String()),
            sim: t.Optional(t.String()),
            mdm: t.Optional(t.String()),
            batteryHealth: t.Optional(t.String()),
            batteryCycles: t.Optional(t.String()),
            kernelTests: t.Optional(t.Any()),
            appTests: t.Optional(t.Any()),
            comments: t.Optional(t.String()),
            iosVersion: t.Optional(t.String()),
            region: t.Optional(t.String()),
            dateTime: t.Optional(t.String()),
        })
    })

    // Endpoint to fetch all results
    .get("/results", async () => {
        return await db.query.testResults.findMany({
            orderBy: [desc(testResults.dateTime)]
        });
    })

    // Endpoint to fetch specific device history
    .get("/results/:serial", async ({ params: { serial } }) => {
        return await db.query.testResults.findMany({
            where: (testResults, { eq }) => eq(testResults.serial, serial),
            orderBy: [desc(testResults.dateTime)]
        });
    })

    .listen(3000);

console.log(`🚀 Dyagnoz API is running at ${app.server?.hostname}:${app.server?.port}`);
