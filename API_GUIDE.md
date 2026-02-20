# 📱 Dyagnoz API - Documentation

This guide explains how to interact with your new Phone Diagnostics API.

## 🚀 Base URL
`http://localhost:3000`

---

## 📥 Store Test Results
**Endpoint:** `POST /results`

Use this endpoint to save a diagnostic result from a phone.

### **Request Body (JSON)**
| Field | Type | Description |
| :--- | :--- | :--- |
| `deviceName` | String | e.g., "iPhone 15 Pro Max" |
| `model` | String | e.g., "A3106" |
| `color` | String | e.g., "Natural Titanium" |
| `storage` | String | e.g., "256GB" |
| `serial` | String | Device Serial Number |
| `imei` | String | 15-digit IMEI |
| `icloud` | String | "ON", "OFF", or "LOCKED" |
| `fmip` | String | Find My iPhone status |
| `sim` | String | SIM Lock status |
| `mdm` | String | MDM status (Enrolled/Not Enrolled) |
| `batteryHealth` | String | Percentage (e.g., "98%") |
| `batteryCycles` | String | Number of cycles |
| `kernelTests` | Object | JSON object of hardware/sensor tests |
| `appTests` | Object | JSON object of specific app checks |
| `comments` | String | Manual notes from technician |
| `iosVersion` | String | e.g., "17.4.1" |
| `region` | String | e.g., "LL/A" |
| `dateTime` | String | ISO string (Optional, defaults to now) |

### **Example `curl` Request**
```bash
curl -X POST http://localhost:3000/results \
  -H "Content-Type: application/json" \
  -d '{
    "deviceName": "iPhone 13",
    "model": "A2633",
    "color": "Midnight",
    "storage": "128GB",
    "serial": "F2LGX0VQPL",
    "imei": "350000000000001",
    "icloud": "OFF",
    "fmip": "OFF",
    "sim": "Unlocked",
    "mdm": "NO",
    "batteryHealth": "91%",
    "batteryCycles": "420",
    "kernelTests": {
      "wifi": "pass",
      "bluetooth": "pass",
      "faceId": "fail",
      "sensors": "pass"
    },
    "appTests": {
      "cameraApp": "pass",
      "audioRecording": "pass"
    },
    "comments": "FaceID module needs replacement.",
    "iosVersion": "17.2",
    "region": "ZP/A"
  }'
```

---

## 📤 Retrieve History
### **1. Get All Results**
**Endpoint:** `GET /results`  
Returns a list of all tests, sorted by latest first.

### **2. Get Specific Device History**
**Endpoint:** `GET /results/:serial`  
Example: `GET /results/F2LGX0VQPL`  
Returns all tests performed specifically on that serial number.

---

## ⚡ Quick Start Commands
1. **Start Infrastructure (DB & pgAdmin):** 
   ```bash
   cd infrastructure
   docker-compose up -d
   ```
2. **Setup Tables:** 
   ```bash
   bun run db:push
   ```
3. **Run API Manually:** 
   ```bash
   bun run dev
   ```

---

## 🛠️ Managing Database (pgAdmin)
You can now manage your database via a web interface:
* **URL:** `http://localhost:5050`
* **Login Email:** `admin@dyagnoz.com`
* **Login Password:** `admin`

**To connect pgAdmin to the database:**
1. Click "Add New Server".
2. Name: `Dyagnoz DB`.
3. Connection Tab -> Host: `db` (or your VPS IP if accessing remotely).
4. Port: `5432`.
5. Maintenance database/Username: `user`.
6. Password: `password`.
