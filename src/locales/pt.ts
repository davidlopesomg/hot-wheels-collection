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
    loading: "A carregar...",
    addCar: "Adicionar Carro",
    deleteSelected: "Eliminar Selecionados",
    resultsCount: "{{filtered}} de {{total}} carros",
    headers: {
      brand: "Marca",
      model: "Modelo",
      year: "Ano",
      primaryColor: "Cor Principal",
      secondaryColors: "Cores Secundárias",
      code: "Código",
      manufacturer: "Fabricante",
      notesTheme: "Notas/Tema",
      actions: "Ações"
    },
    actions: {
      edit: "Editar",
      delete: "Eliminar"
    },
    add: {
      success: "Carro adicionado com sucesso!",
      error: "Erro ao adicionar carro. Por favor, tente novamente."
    },
    edit: {
      title: "Editar Carro",
      save: "Guardar Alterações",
      success: "Carro atualizado com sucesso!",
      error: "Erro ao atualizar carro. Por favor, tente novamente."
    },
    delete: {
      confirm: "Tem a certeza que deseja eliminar este carro?",
      success: "Carro eliminado com sucesso!",
      error: "Erro ao eliminar carro. Por favor, tente novamente."
    },
    bulkDelete: {
      confirm: "Tem a certeza que deseja eliminar {{count}} carros?",
      success: "{{count}} carros eliminados com sucesso!",
      error: "Erro ao eliminar carros. Por favor, tente novamente."
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
    addManual: {
      text: "Quer adicionar um carro sem escanear?",
      button: "Adicionar Manualmente"
    },
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
      scannedCode: "Código escaneado",
      message: "Este carro não está na sua colecção. Pode comprar!",
      addButton: "Adicionar à Colecção"
    },
    addCar: {
      title: "Adicionar Novo Carro",
      titleScanned: "Adicionar Carro Escaneado",
      scannedCode: "Código escaneado",
      save: "Guardar Carro",
      success: "Carro adicionado com sucesso!",
      error: "Erro ao adicionar carro. Por favor, tente novamente.",
      selectBrand: "Selecione uma marca...",
      addNewBrand: "Adicionar nova marca",
      backToList: "Voltar à lista",
      selectYear: "Selecione o ano...",
      selectColor: "Selecione uma cor...",
      customColor: "Cor personalizada",
      placeholders: {
        brand: "ex. Hot Wheels",
        model: "ex. '67 Mustang",
        year: "ex. 2024",
        primaryColor: "ex. Vermelho",
        secondaryColors: "ex. Preto, Branco",
        code: "ex. HW123456",
        notes: "ex. Série Fast & Furious"
      }
    },
    errors: {
      camera: "Erro ao aceder à câmara. Verifique as permissões.",
      search: "Erro ao pesquisar na colecção"
    }
  }
};
