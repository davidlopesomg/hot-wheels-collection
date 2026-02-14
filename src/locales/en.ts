export const en = {
  // Navigation
  nav: {
    brand: "Hot Wheels Collection",
    dashboard: "Dashboard",
    collection: "Collection",
    scanner: "Scanner",
    admin: "Admin"
  },
  
  // Dashboard
  dashboard: {
    title: "My Collection",
    subtitle: "Hot Wheels collection statistics",
    totalCars: "Total Cars",
    differentBrands: "Different Brands",
    differentModels: "Different Models",
    differentYears: "Different Years",
    differentColors: "Different Colours",
    topBrands: "Top 5 Brands",
    topModels: "Top 5 Models",
    topColors: "Top 5 Colours",
    byManufacturer: "By Manufacturer",
    colorDistribution: "Colour Distribution",
    filterByManufacturer: "Filter by Manufacturer",
    allManufacturers: "All Manufacturers",
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
    upcBarcode: "UPC Barcode",
    upcPlaceholder: "12-13 digit barcode",
    scanUPC: "Scan UPC Barcode",
    scanProductCode: "Scan Product Code with OCR",
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
      importError: "Error loading CSV file",
      validationError: "CSV Validation Failed",
      deleteSuccess: "Successfully deleted {{count}} car(s)!"
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
    },
    ocr: {
      title: "Scan Product Code",
      instructions: "Photograph the red product code on the package (e.g., JBC17-N521 21A)",
      useCamera: "Use Camera",
      uploadImage: "Upload Image",
      alignCode: "Align product code in frame",
      capture: "Capture",
      processing: "Processing image...",
      detectedText: "Detected Text:",
      noCodeFound: "No product code found. Please try again.",
      error: "Failed to process image",
      retry: "Try Again",
      manualEntry: "Or enter the code manually:",
      scanUpcFirst: "Scan UPC Barcode First",
      notFoundPrompt: "Not found? Let's scan the product code on the package",
      scanProductCode: "Scan Product Code"
    }
  },

  // Footer
  footer: {
    supportedBrands: "Supported Brands",
    more: "more",
    developedBy: "Developed by",
    withAssistance: "with the assistance of",
    version: "Version"
  },

  // Admin
  admin: {
    title: "Administration",
    subtitle: "Manage brands, manufacturers, colors, and data import",
    comingSoon: "Coming Soon",
    tabs: {
      brands: "Brands",
      manufacturers: "Manufacturers",
      colors: "Colors",
      import: "Import Data"
    },
    brands: {
      title: "Brand Management",
      description: "Add, edit, or remove brands from your collection. Upload brand logos and associate them with cars.",
      comingSoonDetails: "Brand management interface is under development. You'll be able to manage brand logos and information here."
    },
    manufacturers: {
      title: "Manufacturer Management",
      description: "Manage manufacturers like Hot Wheels, Matchbox, Majorette, etc. Add logos and UPC prefixes.",
      comingSoonDetails: "Manufacturer management interface is under development. You'll be able to manage manufacturer details and UPC prefixes here."
    },
    colors: {
      title: "Color System Management",
      description: "Manage the color system used in your collection. Add, edit, or remove colors and translations.",
      comingSoonDetails: "Color management interface is under development. You'll be able to customize your color system here."
    },
    import: {
      title: "Data Import",
      description: "Import your collection from a CSV file. Download a template to get started.",
      uploadCSV: "Upload CSV File",
      uploadDescription: "Select a CSV file to import cars into your collection. The file will be validated before import.",
      selectFile: "Select CSV File",
      downloadTemplate: "Download Template",
      templateDescription: "Download a CSV template with the correct format and example data.",
      downloadButton: "Download Template.csv",
      requiredColumns: "Required Columns",
      brandColumn: "Car brand name (required)",
      modelColumn: "Car model name (required)",
      codeColumn: "Product code (required)",
      manufacturerColumn: "Manufacturer name (must match from list)",
      yearColumn: "Model year (optional)",
      primaryColorColumn: "Primary color (optional)",
      secondaryColorsColumn: "Secondary colors, comma-separated (optional)",
      notesColumn: "Notes or theme (optional)"
    }
  }
};
