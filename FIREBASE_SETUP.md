# Firebase Firestore Setup Guide

This guide will walk you through setting up Firebase Firestore for your Hot Wheels Collection app.

## 📋 Quick Overview

You'll need to:
1. **Create a Firebase project** (5 min) - Free Google account required
2. **Enable Firestore database** (2 min) - Choose your region
3. **Get Firebase credentials** (1 min) - Copy 6 configuration values
4. **Configure locally** (2 min) - Create `.env` file for development
5. **Configure GitHub Secrets** (5 min) - Add credentials for deployment
6. **Set security rules** (1 min) - Allow read/write access
7. **Test and deploy** (5 min) - Import data and push to GitHub

**Total time: ~20 minutes** ⏱️

---

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" (or "Create a project")
3. Enter your project name: `hot-wheels-collection` (or any name you prefer)
4. Click "Continue"
5. **Google Analytics**: You can disable it for this project (toggle off)
6. Click "Create project"
7. Wait for the project to be created, then click "Continue"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Give your app a nickname: `Hot Wheels Collection Web`
3. **Firebase Hosting**: Leave this unchecked (we're using GitHub Pages)
4. Click "Register app"
5. You'll see your Firebase configuration object. **Keep this open**, you'll need it in Step 4

## Step 3: Enable Firestore Database

1. In the left sidebar, click "**Build**" → "**Firestore Database**"
2. Click "**Create database**"
3. Choose "**Start in test mode**" (we'll secure it later)
   - This allows read/write access for 30 days
4. Click "Next"
5. Choose your **Cloud Firestore location**:
   - For best performance in Europe, choose `europe-west1` or `europe-west3`
6. Click "Enable"
7. Wait for the database to be provisioned

## Step 4: Configure Your App

1. In your project folder, create a `.env` file (copy from `.env.example`):
   ```bash
   copy .env.example .env
   ```

2. Open the `.env` file and fill in your Firebase credentials from Step 2:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyC...
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

3. **Important**: The `.env` file is already in `.gitignore` so your credentials won't be committed to Git

## Step 5: Configure GitHub Secrets (for GitHub Pages Deployment)

To deploy your app to GitHub Pages with Firebase, you need to add your credentials as GitHub Secrets:

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/hot-wheels-collection`

2. Click **Settings** (top menu)

3. In the left sidebar, click **Secrets and variables** → **Actions**

4. Click **New repository secret** button (green button on the right)

5. Add each of the following secrets one by one:

   **Secret 1:**
   - **Name**: `VITE_FIREBASE_API_KEY`
   - **Value**: Your API key from Firebase (e.g., `AIzaSyC...`)
   - Click **Add secret**

   **Secret 2:**
   - **Name**: `VITE_FIREBASE_AUTH_DOMAIN`
   - **Value**: `your-project-id.firebaseapp.com`
   - Click **Add secret**

   **Secret 3:**
   - **Name**: `VITE_FIREBASE_PROJECT_ID`
   - **Value**: Your project ID (e.g., `hot-wheels-collection-12345`)
   - Click **Add secret**

   **Secret 4:**
   - **Name**: `VITE_FIREBASE_STORAGE_BUCKET`
   - **Value**: `your-project-id.appspot.com`
   - Click **Add secret**

   **Secret 5:**
   - **Name**: `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - **Value**: Your sender ID (e.g., `123456789`)
   - Click **Add secret**

   **Secret 6:**
   - **Name**: `VITE_FIREBASE_APP_ID`
   - **Value**: Your app ID (e.g., `1:123456789:web:abcdef`)
   - Click **Add secret**

   **Secret 7 (Optional - for Google Analytics):**
   - **Name**: `VITE_FIREBASE_MEASUREMENT_ID`
   - **Value**: Your measurement ID (e.g., `G-XXXXXXXXXX`)
   - Click **Add secret**
   - This enables analytics tracking for page views, CSV imports, and barcode scans

6. **Verify**: You should now see 6-7 secrets listed in your repository secrets (7 if you added Google Analytics)

7. **Deploy**: The next time you push to `main` branch, GitHub Actions will automatically build and deploy with your Firebase credentials

### Why GitHub Secrets?
- ✅ Keeps credentials secure (never in your code)
- ✅ Automatic deployment with Firebase configured
- ✅ Works seamlessly with GitHub Pages
- ✅ No manual configuration after setup

### Testing the deployment:
```bash
git add .
git commit -m "Add Firebase integration"
git push origin main
```

Then:
- Go to **Actions** tab in your GitHub repo
- Watch the deployment workflow run
- Once complete, visit your GitHub Pages URL
- Your app should load with Firebase working!

## Step 6: Set Up Firestore Security Rules

1. In Firebase Console, go to "**Firestore Database**" → "**Rules**"
2. For testing, you can use these open rules (replace existing rules):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /cars/{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

3. Click "**Publish**"

> **Note**: These rules allow anyone to read/write. For production, consider adding authentication.

## Step 7: Test Your Setup Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173

3. Go to the "**Collection**" page and import your CSV file

4. Check Firebase Console → Firestore Database → Data
   - You should see a new collection called `cars`
   - Each car should appear as a document

5. Try opening the app on another device or browser
   - The collection should sync automatically!

## Step 8: Load Initial Data

If you already have the `collection.csv` file in `public/data/`:

1. Open the app
2. Go to "Collection" page
3. Click "Import CSV"
4. Select `public/data/collection.csv`
5. The data will be uploaded to Firestore and synced across all devices

## How It Works

### Offline-First with Fallback
- The app tries to load data from Firestore first
- If Firestore fails (no internet), it falls back to localStorage
- Data is always cached in localStorage for offline access

### Cross-Device Sync
- When you import a CSV on Device A, it uploads to Firestore
- Device B will automatically load the data from Firestore
- Changes sync across all your devices

### Data Storage
- **Firestore**: Main database in the cloud
- **localStorage**: Local backup/cache for offline use

## Troubleshooting

### "Error loading from Firestore, using localStorage"
- Check that your `.env` file has the correct Firebase credentials
- Verify your internet connection
- Check Firebase Console → Firestore Database to ensure it's enabled

### Data not syncing between devices
- Make sure both devices have internet connection
- Check Firestore security rules allow read/write access
- Try refreshing the page (Ctrl+Shift+R)

### "Permission denied" error
- Go to Firebase Console → Firestore → Rules
- Make sure the rules allow access to `/cars/{document=**}`

### GitHub Pages deployment not working
- Go to your repo → **Actions** tab
- Click on the latest workflow run to see logs
- Check if all 6 secrets are set correctly in **Settings** → **Secrets and variables** → **Actions**
- Make sure GitHub Pages is enabled: **Settings** → **Pages** → Source: "GitHub Actions"

### Firebase not loading on deployed site
- Open browser DevTools (F12) → Console tab
- Look for Firebase errors
- Verify all GitHub Secrets are added correctly (check for typos)
- Check that secret names match exactly: `VITE_FIREBASE_API_KEY`, etc.
- Try a hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### App works locally but not on GitHub Pages
- Make sure you pushed your latest changes: `git push origin main`
- Wait 2-3 minutes for GitHub Actions to complete
- Check the **Actions** tab for build errors
- Verify your GitHub Pages URL matches the `base` path in `vite.config.ts`

## Security Notes

### For Production:
1. **Add Authentication**: Use Firebase Authentication to restrict access to your data
2. **Update Security Rules**: Only allow authenticated users to read/write
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /cars/{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

### API Key Security:
- Your Firebase API key in `.env` is safe to expose in a web app
- Firebase security is enforced by Firestore security rules, not the API key
- However, keep your `.env` file out of Git (already in `.gitignore`)

## Firebase Free Tier Limits

- **Storage**: 1 GB
- **Document Reads**: 50,000/day
- **Document Writes**: 20,000/day
- **Document Deletes**: 20,000/day

For a personal Hot Wheels collection, these limits are more than enough!

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Quickstart](https://firebase.google.com/docs/firestore/quickstart)
- Check the browser console (F12) for error messages

---

**That's it!** Your Hot Wheels collection is now synced across all your devices. 🎉🏎️
