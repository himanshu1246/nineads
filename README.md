# The Nine Ads

A modern, fast, and responsive static website for **The Nine Ads** agency. Built with HTML, CSS, and Vanilla JavaScript.

## Features

- **Modern UI**: Smooth animations, premium cream/gold theme, glassmorphism elements.
- **Fully Responsive**: Works on desktop, tablet, and mobile without any horizontal scrolling.
- **Fast Performance**: No heavy external libraries used. Lazy loading and optimized assets.
- **Contact Form**: Integrated with Google Apps Script to save leads directly to a Google Sheet. WhatsApp fallback available.
- **Security**: Basic frontend protection (disables right-click, F12, text selection).

## Deployment

1. **Hostinger**: Upload the contents of the `the-nine-ads/` folder directly to the `public_html` directory via File Manager or FTP.
2. **Vercel**: Push the code to a GitHub repository, link the repo in Vercel, and deploy the root directory as a static site.

## Google Apps Script Setup (For Form Submissions)

The form submits to a Google Sheet via a POST request.

1. Go to Google Sheets and create a new sheet with headers: `Timestamp`, `name`, `phone`, `email`, `service`, `message`.
2. Click **Extensions > Apps Script**.
3. Paste the following code:
```javascript
const sheetName = 'Sheet1';
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    
    const newRow = headers.map(function(header) {
      return header === 'Timestamp' ? new Date() : e.parameter[header];
    });
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  finally {
    lock.releaseLock();
  }
}
```
4. Click **Deploy > New Deployment**.
5. Select type **Web app**. Set access to **Anyone**.
6. Copy the Web App URL and update it in `js/enquiry.js`. (Note: The URL provided `https://script.google.com/macros/s/AKfycbwQ3lf1Gf4dpdYYmvUB3RG63C7XucRdf2Bir5rk74U4RjSgjB7Xnb7y95vWDt3HNRkt/exec` has already been integrated).
