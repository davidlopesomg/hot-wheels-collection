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
    loading: "Loading...",
    empty: {
      title: "Your collection is empty",
      message: "Start building your Hot Wheels collection today!",
      hint: "Use the Scanner or Collection page to add cars."
    }
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
      importError: "Error loading CSV file",
      validationError: "CSV Validation Failed",
      deleteSuccess: "Successfully deleted {{count}} car(s)!"
    }
  },
  
  // Scanner
  scanner: {
    title: "Scan Base Code",
    subtitle: "Scan the base code on the back of the packaging to check if you already have it",
    startScanner: "Start Scanner",
    cancel: "Cancel",
    manualInput: "or enter the base code manually:",
    enterCode: "Enter the code (e.g., JJJ26-N521)",
    search: "Search",
    scanAnother: "Scan Another",
    addManual: {
      text: "Want to add a car without scanning?",
      button: "Add Manually"
    },
    found: {
      title: "I ALREADY HAVE THIS CAR!",
      codeBreakdown: "Base Code Breakdown",
      seriesCode: "Series Code",
      collectorNumber: "Collector Number",
      productionYear: "Production Year",
      factoryCode: "Factory Code",
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
      collectorNumber: "Collector Number",
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
      title: "Scan Base Code",
      instruction: "Scan the base code on the back of the packaging (top)",
      scanButton: "Scan Base Code (OCR)",
      instructions: "Photograph the base code on the back of the packaging at the top (e.g., JJJ26-N521 21A)",
      useCamera: "Use Camera",
      uploadImage: "Upload Image",
      alignCode: "Align base code in frame",
      capture: "Capture",
      processing: "Processing image...",
      detectedText: "Detected Text:",
      noCodeFound: "No base code found. Please try again.",
      error: "Failed to process image",
      retry: "Try Again",
      manualEntry: "Or enter the code manually:",
      scanProductCode: "Scan Base Code"
    }
  },

  // Footer
  footer: {
    supportedBrands: "Supported Manufacturers",
    more: "more",
    noManufacturers: "No manufacturers with logos yet",
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
      addNew: "Add Brand",
      addFirst: "Add Your First Brand",
      editBrand: "Edit Brand",
      searchPlaceholder: "Search brands...",
      totalBrands: "{{count}} brands",
      noBrands: "No brands yet. Seed automotive brands or add your first custom brand to get started!",
      noResults: "No brands found matching your search.",
      brandName: "Brand Name",
      brandNamePlaceholder: "e.g. Ferrari, Porsche, Lamborghini",
      iconSelect: "Brand Icon",
      noIcon: "No icon (use custom logo)",
      logoUrl: "Logo URL",
      logoUrlPlaceholder: "https://example.com/logo.png",
      logoUrlHint: "Optional: Only needed if you don't use a brand icon",
      countryCode: "Country Code",
      countryCodePlaceholder: "e.g. IT, DE, US",
      brandDescription: "Description",
      descriptionPlaceholder: "Optional description or notes about this brand",
      add: "Add Brand",
      update: "Update Brand",
      nameRequired: "Brand name is required",
      nameExists: "A brand with this name already exists",
      addSuccess: "Brand added successfully!",
      addError: "Error adding brand. Please try again.",
      updateSuccess: "Brand updated successfully!",
      updateError: "Error updating brand. Please try again.",
      deleteSuccess: "Brand deleted successfully!",
      deleteError: "Error deleting brand. Please try again.",
      confirmDelete: "Are you sure you want to delete '{{name}}'? This action cannot be undone.",
      loadError: "Error loading brands. Please refresh the page.",
      seedDefaults: "Seed Automotive Brands",
      confirmSeed: "This will add 60+ automotive brands (Ferrari, Porsche, BMW, Tesla, etc.), racing series (Formula 1, Formula E), and entertainment brands (Marvel) with their official icons. Continue?",
      seedSuccess: "Successfully added/updated {{count}} brands!",
      seedError: "Error seeding brands. Please try again.",
      allExist: "All brands already exist with correct icons",
      deleteAll: "Delete All",
      confirmDeleteAll: "Are you sure you want to delete ALL {{count}} brands? This action cannot be undone and will permanently remove all brand data.",
      deleteAllSuccess: "Successfully deleted {{count}} brands!",
      deleteAllError: "Error deleting brands. Please try again.",
      noBrandsToDelete: "No brands to delete.",
      logoSearch: "Search Logo Databases",
      logoSearching: "Searching...",
      logoSearchNameRequired: "Please enter a brand name first.",
      logoSearchNotFound: "No logos found. Try adjusting the brand name.",
      logoSearchError: "Error searching for logos. Please try again.",
      logoSearchResults: "Found Logos:",
      logoUse: "Use This",
      logoAdded: "Logo added successfully!"
    },
    manufacturers: {
      title: "Manufacturer Management",
      description: "Manage manufacturers like Hot Wheels, Matchbox, Majorette, etc. Add logos and UPC codes.",
      addNew: "Add Manufacturer",
      addFirst: "Add Your First Manufacturer",
      editManufacturer: "Edit Manufacturer",
      searchPlaceholder: "Search manufacturers...",
      totalManufacturers: "{{count}} manufacturers",
      noManufacturers: "No manufacturers yet. Add your first manufacturer or seed defaults to get started!",
      noResults: "No manufacturers found matching your search.",
      manufacturerName: "Manufacturer Name",
      logoUpload: "Upload Logo",
      browse: "Browse File",
      uploading: "Uploading...",
      logoHint: "Optional: Upload a logo image (max 5MB, PNG/JPG/GIF)",
      removeLogo: "Remove Logo",
      upc: "UPC Barcode",
      upcPlaceholder: "e.g., 887961707212",
      upcHint: "Optional: Add UPC barcode for this manufacturer",
      scanUPC: "Scan UPC Barcode",
      scan: "Scan",
      scanWithCamera: "Scan with Camera",
      startScanning: "Start Camera",
      stopScanning: "Stop Camera",
      uploadImage: "Upload Barcode Image",
      enterManually: "Enter UPC Manually",
      submit: "Submit",
      or: "OR",
      upcInstructions: "Point camera at UPC barcode or upload an image. UPC barcodes are typically found on the packaging.",
      add: "Add Manufacturer",
      update: "Update Manufacturer",
      nameRequired: "Manufacturer name is required",
      nameExists: "A manufacturer with this name already exists",
      invalidFileType: "Invalid file type. Please upload an image file (PNG, JPG, GIF)",
      fileTooLarge: "File is too large. Maximum size is 5MB",
      uploadError: "Error uploading logo. Please try again.",
      addSuccess: "Manufacturer added successfully!",
      addError: "Error adding manufacturer. Please try again.",
      updateSuccess: "Manufacturer updated successfully!",
      updateError: "Error updating manufacturer. Please try again.",
      deleteSuccess: "Manufacturer deleted successfully!",
      deleteError: "Error deleting manufacturer. Please try again.",
      confirmDelete: "Are you sure you want to delete '{{name}}'? This action cannot be undone.",
      loadError: "Error loading manufacturers. Please refresh the page.",
      seedDefaults: "Seed Default Manufacturers",
      confirmSeed: "This will add all default manufacturers (Hot Wheels, Matchbox, etc.) to your collection. Continue?",
      seedSuccess: "Successfully added {{count}} manufacturers!",
      seedError: "Error seeding manufacturers. Please try again.",
      allExist: "All default manufacturers already exist",
      deleteAll: "Delete All",
      confirmDeleteAll: "Are you sure you want to delete ALL {{count}} manufacturers? This action cannot be undone and will permanently remove all manufacturer data.",
      deleteAllSuccess: "Successfully deleted {{count}} manufacturers!",
      deleteAllError: "Error deleting manufacturers. Please try again.",
      noManufacturersToDelete: "No manufacturers to delete.",
      logoSearch: "Search Logo Databases",
      logoSearching: "Searching...",
      logoSearchNameRequired: "Please enter a manufacturer name first.",
      logoSearchNotFound: "No logos found. Try adjusting the manufacturer name.",
      logoSearchError: "Error searching for logos. Please try again.",
      logoSearchResults: "Found Logos:",
      logoUse: "Use This",
      logoAdded: "Logo added successfully!",
      errors: {
        camera: "Error accessing camera. Check permissions.",
        noBarcode: "No barcode found in image. Please try again."
      }
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
      bilingualSupport: "CSV headers can be in Portuguese or English. Both formats are supported.",
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
