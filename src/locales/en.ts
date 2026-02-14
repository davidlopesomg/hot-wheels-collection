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
    loading: "Loading...",
    addCar: "Add Car",
    deleteSelected: "Delete Selected",
    resultsCount: "{{filtered}} of {{total}} cars",
    headers: {
      brand: "Brand",
      model: "Model",
      year: "Year",
      primaryColor: "Primary Colour",
      secondaryColors: "Secondary Colours",
      code: "Code",
      manufacturer: "Manufacturer",
      notesTheme: "Notes/Theme",
      actions: "Actions"
    },
    actions: {
      edit: "Edit",
      delete: "Delete"
    },
    add: {
      success: "Car added successfully!",
      error: "Error adding car. Please try again."
    },
    edit: {
      title: "Edit Car",
      save: "Save Changes",
      success: "Car updated successfully!",
      error: "Error updating car. Please try again."
    },
    delete: {
      confirm: "Are you sure you want to delete this car?",
      success: "Car deleted successfully!",
      error: "Error deleting car. Please try again."
    },
    bulkDelete: {
      confirm: "Are you sure you want to delete {{count}} cars?",
      success: "{{count}} cars deleted successfully!",
      error: "Error deleting cars. Please try again."
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
    addManual: {
      text: "Want to add a car without scanning?",
      button: "Add Manually"
    },
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
      scannedCode: "Scanned code",
      message: "This car is not in your collection. You can buy it!",
      addButton: "Add to Collection"
    },
    addCar: {
      title: "Add New Car",
      titleScanned: "Add Scanned Car",
      scannedCode: "Scanned code",
      save: "Save Car",
      success: "Car added successfully!",
      error: "Error adding car. Please try again.",
      selectBrand: "Select a brand...",
      addNewBrand: "Add new brand",
      backToList: "Back to list",
      selectYear: "Select year...",
      selectColor: "Select a color...",
      customColor: "Custom color",
      placeholders: {
        brand: "e.g. Hot Wheels",
        model: "e.g. '67 Mustang",
        year: "e.g. 2024",
        primaryColor: "e.g. Red",
        secondaryColors: "e.g. Black, White",
        code: "e.g. HW123456",
        notes: "e.g. Fast & Furious series"
      }
    },
    errors: {
      camera: "Error accessing camera. Check permissions.",
      search: "Error searching collection"
    }
  }
};
