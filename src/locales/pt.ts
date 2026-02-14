export const pt = {
  // Navigation
  nav: {
    brand: "Colecção Hot Wheels",
    dashboard: "Painel",
    collection: "Colecção",
    scanner: "Scanner"
  },
  
  // Dashboard
  dashboard: {
    title: "A Minha Colecção",
    subtitle: "Estatísticas da colecção Hot Wheels",
    totalCars: "Total de Carros",
    differentBrands: "Marcas Diferentes",
    differentYears: "Anos Diferentes",
    differentColors: "Cores Diferentes",
    topBrands: "Top 5 Marcas",
    topColors: "Top 5 Cores",
    byManufacturer: "Por Fabricante",
    loading: "A carregar..."
  },
  
  // Collection
  collection: {
    title: "Colecção Completa",
    search: "Pesquisar...",
    importCSV: "Importar CSV",
    resultsCount: "{{filtered}} de {{total}} carros",
    headers: {
      brand: "Marca",
      model: "Modelo",
      year: "Ano",
      primaryColor: "Cor Principal",
      secondaryColors: "Cores Secundárias",
      code: "Código",
      manufacturer: "Fabricante",
      notesTheme: "Notas/Tema"
    },
    empty: {
      noResults: "Nenhum carro encontrado.",
      noData: "Carregue um ficheiro CSV para começar!"
    },
    alerts: {
      importSuccess: "{{count}} carros carregados com sucesso!",
      importError: "Erro ao carregar o ficheiro CSV"
    }
  },
  
  // Scanner
  scanner: {
    title: "Escanear Código",
    subtitle: "Escaneie o código de barras para verificar se já tem o carro",
    startScanner: "Iniciar Scanner",
    cancel: "Cancelar",
    manualInput: "ou digite o código manualmente:",
    enterCode: "Digite o código",
    search: "Pesquisar",
    scanAnother: "Escanear Outro",
    found: {
      title: "JÁ TENHO ESTE CARRO!",
      brand: "Marca:",
      model: "Modelo:",
      year: "Ano:",
      color: "Cor:",
      secondaryColors: "Cores Secundárias:",
      code: "Código:",
      notes: "Notas:"
    },
    notFound: {
      title: "NÃO TENHO ESTE CARRO",
      message: "Este carro não está na sua colecção. Pode comprar!"
    },
    errors: {
      camera: "Erro ao aceder à câmara. Verifique as permissões."
    }
  }
};
