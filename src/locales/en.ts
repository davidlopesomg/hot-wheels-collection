export const en = {
  // Navigation
  nav: {
    brand: "Hot Wheels Collection",
    dashboard: "Dashboard",
    collection: "Collection",
    scanner: "Scanner"
  },
  
  // Dashboard
  dashboard: {
    title: "My Collection",
    subtitle: "Hot Wheels collection statistics",
    totalCars: "Total Cars",
    differentBrands: "Different Brands",
    differentYears: "Different Years",
    differentColors: "Different Colours",
    topBrands: "Top 5 Brands",
    topColors: "Top 5 Colours",
    byManufacturer: "By Manufacturer",
    loading: "Loading..."
  },
  
  // Collection
  collection: {
    title: "Complete Collection",
    search: "Search...",
    importCSV: "Import CSV",
    resultsCount: "{{filtered}} of {{total}} cars",
    headers: {
      brand: "Brand",
      model: "Model",
      year: "Year",
      primaryColor: "Primary Colour",
      secondaryColors: "Secondary Colours",
      code: "Code",
      manufacturer: "Manufacturer",
      notesTheme: "Notes/Theme"
    },
    empty: {
      noResults: "No cars found.",
      noData: "Load a CSV file to get started!"
    },
    alerts: {
      importSuccess: "{{count}} cars loaded successfully!",
      importError: "Error loading CSV file"
    }
  },
  
  // Scanner
  scanner: {
    title: "Scan Code",
    subtitle: "Scan the barcode to check if you already have the car",
    startScanner: "Start Scanner",
    cancel: "Cancel",
    manualInput: "or enter the code manually:",
    enterCode: "Enter the code",
    search: "Search",
    scanAnother: "Scan Another",
    found: {
      title: "I ALREADY HAVE THIS CAR!",
      brand: "Brand:",
      model: "Model:",
      year: "Year:",
      color: "Colour:",
      secondaryColors: "Secondary Colours:",
      code: "Code:",
      notes: "Notes:"
    },
    notFound: {
      title: "I DON'T HAVE THIS CAR",
      message: "This car is not in your collection. You can buy it!"
    },
    errors: {
      camera: "Error accessing camera. Check permissions."
    }
  }
};
