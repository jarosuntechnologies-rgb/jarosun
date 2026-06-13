# Google Sheets (Google Drive) Integration Setup

Follow these steps to store your "Start Project" form submissions directly into a Google Sheet stored on your Google Drive (`jarosuntechnologies@gmail.com`).

---

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com) signed in as `jarosuntechnologies@gmail.com`.
2. Create a new blank spreadsheet.
3. Rename the spreadsheet to something like `Jarosun Project Submissions`.
4. In the first row, define the following column headers:
   - **A1**: Timestamp
   - **B1**: Name
   - **C1**: Email
   - **D1**: Company
   - **E1**: Project Type
   - **F1**: Budget Range
   - **G1**: Timeline
   - **H1**: Description

---

### Step 2: Open Apps Script Editor
1. In the spreadsheet menu, select **Extensions** > **Apps Script**.
2. Delete any default code in the editor (`Code.gs`).
3. Paste the following Google Apps Script:

```javascript
function doPost(e) {
  try {
    // Open the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with details
    sheet.appendRow([
      new Date(), // Timestamp
      data.name || "",
      data.email || "",
      data.company || "",
      data.projectType || "",
      data.budget || "",
      data.timeline || "",
      data.description || ""
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}
```

---

### Step 3: Deploy the Script as a Web App
1. Click **Deploy** (top right) > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill out the configuration:
   - **Description**: `Jarosun Web Form Webhook`
   - **Execute as**: `Me (jarosuntechnologies@gmail.com)`
   - **Who has access**: `Anyone` (this is required so the Next.js backend can post to it securely)
4. Click **Deploy**.
5. Grant authorizations if prompted (Google will warn you that the app is unverified; click *Advanced* > *Go to Untitled project (unsafe)* to proceed).
6. Copy the **Web App URL** provided under the deployment details (it will look like `https://script.google.com/macros/s/XXXXX/exec`).

---

### Step 4: Configure Next.js Env Variables
Open your `.env.local` file in the project root and add the copied Web App URL:

```env
GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/XXXXX/exec"
```

*Note: If `GOOGLE_SCRIPT_URL` is not provided, submissions will fall back to sending emails via nodemailer to `jarosuntechnologies@gmail.com`.*
