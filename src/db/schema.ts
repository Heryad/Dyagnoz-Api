import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const testResults = pgTable("test_results", {
    id: serial("id").primaryKey(),
    deviceName: text("device_name"),
    model: text("model"),
    color: text("color"),
    storage: text("storage"),
    serial: text("serial"),
    imei: text("imei"),
    icloud: text("icloud"),
    fmip: text("fmip"),
    sim: text("sim"),
    mdm: text("mdm"),
    batteryHealth: text("battery_health"),
    batteryCycles: text("battery_cycles"),
    kernelTests: jsonb("kernel_tests"),
    appTests: jsonb("app_tests"),
    comments: text("comments"),
    iosVersion: text("ios_version"),
    region: text("region"),
    dateTime: timestamp("date_time").defaultNow(),
});
