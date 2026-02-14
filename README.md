# 🏎️ Hot Wheels Collection Manager

A modern, mobile-first web application for managing your Hot Wheels car collection. Built with React, TypeScript, Vite, and Firebase Firestore.

## ✨ Features

- **📷 Barcode Scanner** - Quickly scan barcodes at the store to check if you already own a car
- **🚗 Collection Management** - View, sort, and search your entire collection
- **📊 Statistics Dashboard** - Track collection stats with visual charts
- **🌐 Bilingual Interface** - Switch between English and Portuguese (Portugal)
- **📱 Mobile-First Design** - Optimized for smartphones with full desktop support
- **☁️ Cloud Sync** - Your collection syncs across all your devices via Firebase Firestore
- **💾 Offline-First** - Works offline with automatic cloud sync when online
- **📂 CSV Import/Export** - Easy data management
- **📈 Google Analytics** - Optional tracking for page views, imports, and scans

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account (free tier) for cloud sync

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/hot-wheels-collection.git
cd hot-wheels-collection
```

2. Install dependencies:
```bash
npm install
```

3. **Set up Firebase Firestore** (for cloud sync):
   - Follow the complete guide: [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
   - Create a `.env` file with your Firebase credentials
   - This enables cross-device sync for your collection

4. Add your Hot Wheels logo:
   - Place your logo SVG in `public/assets/img/hot-wheels-app-icon.svg` (for favicon and mobile app icon)
   - Place your text logo SVG in `public/assets/img/hot-wheels-text-logo.svg` (for navigation)

5. Start the development server:
```bash
npm run dev
```

6. Open your browser to `http://localhost:5173`

## ☁️ Firebase Firestore Integration

This app uses Firebase Firestore for cloud storage and cross-device sync:

- **Automatic sync**: Changes on one device appear on all your devices
- **Offline-first**: Works without internet, syncs when back online
- **Free tier**: More than enough for personal collections
- **Secure**: Data stored in your own Firebase project

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete setup instructions.

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deploying to GitHub Pages

1. Update the `base` property in `vite.config.ts` to match your repository name

2. Build and deploy:
```bash
npm run deploy
```

3. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

## 📱 Usage

### Importing Your Collection

1. Prepare a CSV file with the following columns:
   - Marca (Brand)
   - Modelo (Model)
   - Ano do Modelo (Model Year)
   - Cor Principal (Primary Color)
   - Cor(es) Segundária(s) (Secondary Colors)
   - Código (Code/SKU)
   - Fabricante (Manufacturer)
   - Notas/Tema (Notes/Theme)

2. Go to the "Coleção" page and click "Importar CSV"

3. Select your CSV file

### Using the Scanner

1. Go to the "Scanner" page
2. Click "Iniciar Scanner" to open your camera
3. Point the camera at the barcode on the Hot Wheels package
4. The app will instantly tell you if you already own that car
5. Alternatively, manually enter the code and click "Pesquisar"

### Browsing Your Collection

1. Go to the "Coleção" page
2. Use the search box to filter cars
3. Click column headers to sort
4. View all details of each car in your collection

### Viewing Statistics

1. Go to the "Dashboard" page
2. See overview statistics including:
   - Total cars in collection
   - Number of different brands
   - Top brands in your collection
   - Most common colors
   - Distribution by manufacturer

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **html5-qrcode** - Barcode scanning
- **PapaParse** - CSV parsing

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👏 Acknowledgments

- Hot Wheels is a trademark of Mattel, Inc.
- This is a personal project and is not affiliated with or endorsed by Mattel
