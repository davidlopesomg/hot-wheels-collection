export const pt = {
  // Navigation
  nav: {
    brand: "Coleção Hot Wheels",
    dashboard: "Painel de Controlo",
    collection: "Coleção",
    scanner: "Ler Código",
    admin: "Admin"
  },
  
  // Dashboard
  dashboard: {
    title: "Minha Coleção",
    subtitle: "Estatísticas da coleção Hot Wheels",
    totalCars: "Total de Carros",
    differentBrands: "Marcas Diferentes",
    differentModels: "Modelos Diferentes",
    differentYears: "Anos Diferentes",
    differentColors: "Cores Diferentes",
    topBrands: "Top 5 Marcas",
    topModels: "Top 5 Modelos",
    topColors: "Top 5 Cores",
    byManufacturer: "Por Fabricante",
    colorDistribution: "Distribuição de Cores",
    filterByManufacturer: "Filtrar por Fabricante",
    allManufacturers: "Todos os Fabricantes",
    loading: "A carregar...",
    empty: {
      title: "A sua coleção está vazia",
      message: "Comece a construir a sua coleção Hot Wheels hoje!",
      hint: "Use o Leitor de Código ou a página de Coleção para adicionar carros."
    }
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
      importError: "Erro ao carregar o ficheiro CSV",
      validationError: "Falha na Validação do CSV",
      deleteSuccess: "{{count}} carro(s) eliminado(s) com sucesso!"
    }
  },
  
  // Scanner
  scanner: {
    title: "Escanear Código Base",
    subtitle: "Escaneie o código base na traseira da embalagem para verificar se já o tem",
    startScanner: "Iniciar Scanner",
    cancel: "Cancelar",
    manualInput: "ou digite o código base manualmente:",
    enterCode: "Digite o código (ex: JJJ26-N521)",
    search: "Pesquisar",
    scanAnother: "Escanear Outro",
    addManual: {
      text: "Quer adicionar um carro sem escanear?",
      button: "Adicionar Manualmente"
    },
    found: {
      title: "JÁ TENHO ESTE CARRO!",
      codeBreakdown: "Detalhes do Código Base",
      seriesCode: "Código da Série",
      collectorNumber: "Número de Colecionador",
      productionYear: "Ano de Produção",
      factoryCode: "Código da Fábrica",
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
      collectorNumber: "Número de Colecionador",
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
      search: "Erro ao pesquisar na colecção"    },
    ocr: {
      title: "Escanear Código Base",
      instruction: "Escaneie o código base na traseira da embalagem (topo)",
      scanButton: "Escanear Código Base (OCR)",
      instructions: "Fotografe o código base na traseira da embalagem no topo (ex: JJJ26-N521 21A)",
      useCamera: "Usar Câmara",
      uploadImage: "Carregar Imagem",
      alignCode: "Alinhe o código base na moldura",
      capture: "Capturar",
      processing: "A processar imagem...",
      detectedText: "Texto Detetado:",
      noCodeFound: "Nenhum código base encontrado. Por favor, tente novamente.",
      error: "Falha ao processar imagem",
      retry: "Tentar Novamente",
      manualEntry: "Ou introduza o código manualmente:",
      scanProductCode: "Escanear Código Base"
    }
  },

  // Footer
  footer: {
    supportedBrands: "Marcas Suportadas",
    more: "mais",
    developedBy: "Desenvolvido por",
    withAssistance: "com a assistência de",
    version: "Versão"
  },

  // Admin
  admin: {
    title: "Administração",
    subtitle: "Gerir marcas, fabricantes, cores e importação de dados",
    comingSoon: "Brevemente",
    tabs: {
      brands: "Marcas",
      manufacturers: "Fabricantes",
      colors: "Cores",
      import: "Importar Dados"
    },
    brands: {
      title: "Gestão de Marcas",
      description: "Adicionar, editar ou remover marcas da sua coleção. Carregar logótipos de marcas e associá-los a carros.",
      comingSoonDetails: "A interface de gestão de marcas está em desenvolvimento. Poderá gerir logótipos e informações de marcas aqui."
    },
    manufacturers: {
      title: "Gestão de Fabricantes",
      description: "Gerir fabricantes como Hot Wheels, Matchbox, Majorette, etc. Adicionar logótipos e prefixos UPC.",
      comingSoonDetails: "A interface de gestão de fabricantes está em desenvolvimento. Poderá gerir detalhes de fabricantes e prefixos UPC aqui."
    },
    colors: {
      title: "Gestão do Sistema de Cores",
      description: "Gerir o sistema de cores usado na sua coleção. Adicionar, editar ou remover cores e traduções.",
      comingSoonDetails: "A interface de gestão de cores está em desenvolvimento. Poderá personalizar o seu sistema de cores aqui."
    },
    import: {
      title: "Importação de Dados",
      description: "Importe a sua coleção a partir de um ficheiro CSV. Descarregue um modelo para começar.",
      uploadCSV: "Carregar Ficheiro CSV",
      uploadDescription: "Selecione um ficheiro CSV para importar carros para a sua coleção. O ficheiro será validado antes da importação.",
      selectFile: "Selecionar Ficheiro CSV",
      downloadTemplate: "Descarregar Modelo",
      templateDescription: "Descarregue um modelo CSV com o formato correto e dados de exemplo.",
      downloadButton: "Descarregar Template.csv",
      requiredColumns: "Colunas Necessárias",
      brandColumn: "Nome da marca do carro (obrigatório)",
      modelColumn: "Nome do modelo do carro (obrigatório)",
      codeColumn: "Código do produto (obrigatório)",
      manufacturerColumn: "Nome do fabricante (deve corresponder à lista)",
      yearColumn: "Ano do modelo (opcional)",
      primaryColorColumn: "Cor principal (opcional)",
      secondaryColorsColumn: "Cores secundárias, separadas por vírgula (opcional)",
      notesColumn: "Notas ou tema (opcional)"
    }
  }
};
