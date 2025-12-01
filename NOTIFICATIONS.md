# Notification Troubleshooting Guide

## Problem: Notifications Show as "Denied" or "Blocked"

This happens when your browser has previously blocked notifications for the site.

## Solutions:

### Quick Fix (Chrome/Edge/Brave):

1. **Click the lock icon (🔒)** or info icon in the address bar (left side of URL)
2. Look for **"Notifications"** in the dropdown menu
3. **Change from "Block" to "Allow"**
4. **Refresh the page** (Press Ctrl + Shift + R)

### Chrome Settings Fix:

1. Go to: `chrome://settings/content/notifications`
2. Under **"Not allowed to send notifications"**, find `localhost:8000`
3. Click the **trash/delete icon** next to it
4. Return to your app and refresh

### Firefox Fix:

1. Click the **🔒 icon** in address bar
2. Click **"More information"** or the arrow
3. Go to **"Permissions"** tab
4. Find **"Notifications"** and select **"Allow"**
5. Refresh the page

### Safari Fix:

1. Go to **Safari → Settings → Websites → Notifications**
2. Find your site in the list
3. Change to **"Allow"**
4. Refresh the page

### Alternative: Use Different Port

If localhost:8000 is permanently blocked:

```bash
# Try a different port
python3 -m http.server 3000

# Then open
http://localhost:3000
```

## Testing Notifications:

1. Open your app
2. Click the **⚙️ Settings** icon
3. Click **"Enable Notifications"**
4. Browser should show a popup asking for permission
5. Click **"Allow"**
6. Button should change to **"Disable"**
7. Status should show **"✅ Enabled and active"**

## Browser-Specific Notes:

- **Chrome/Edge**: Notifications work on localhost
- **Firefox**: Notifications work on localhost  
- **Safari**: May require HTTPS (use GitHub Pages instead)
- **Brave**: Check if "Block scripts" is enabled

## For Production/Sharing:

When you deploy to GitHub Pages, Netlify, or Vercel, notifications will work more reliably because:
- They use HTTPS
- No previous permission history
- Proper domain names

Deploy URL example: `https://louis-mozart.github.io/Todolist-app/`

## Still Not Working?

Check browser console (F12) for errors and share them for debugging.
