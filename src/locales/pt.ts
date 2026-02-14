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
      permission: "Permissão de câmara negada. Por favor, permita o acesso à câmara nas definições do navegador.",
      noCamera: "Nenhuma câmara encontrada neste dispositivo.",
      cameraInUse: "A câmara já está a ser utilizada por outra aplicação.",
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
    supportedBrands: "Fabricantes Suportados",
    more: "mais",
    noManufacturers: "Ainda não há fabricantes com logótipos",
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
      addNew: "Adicionar Marca",
      addFirst: "Adicione a Sua Primeira Marca",
      editBrand: "Editar Marca",
      searchPlaceholder: "Pesquisar marcas...",
      totalBrands: "{{count}} marcas",
      noBrands: "Ainda não há marcas. Carregue marcas automotivas ou adicione a sua primeira marca personalizada para começar!",
      noResults: "Nenhuma marca encontrada.",
      brandName: "Nome da Marca",
      brandNamePlaceholder: "ex. Ferrari, Porsche, Lamborghini",
      iconSelect: "Ícone da Marca",
      noIcon: "Sem ícone (usar logótipo personalizado)",
      logoUrl: "URL do Logótipo",
      logoUrlPlaceholder: "https://exemplo.com/logo.png",
      logoUrlHint: "Opcional: Apenas necessário se não usar um ícone de marca",
      countryCode: "Código do País",
      countryCodePlaceholder: "ex. IT, DE, US",
      brandDescription: "Descrição",
      descriptionPlaceholder: "Descrição opcional ou notas sobre esta marca",
      add: "Adicionar Marca",
      update: "Atualizar Marca",
      nameRequired: "O nome da marca é obrigatório",
      nameExists: "Já existe uma marca com este nome",
      addSuccess: "Marca adicionada com sucesso!",
      addError: "Erro ao adicionar marca. Por favor, tente novamente.",
      updateSuccess: "Marca atualizada com sucesso!",
      updateError: "Erro ao atualizar marca. Por favor, tente novamente.",
      deleteSuccess: "Marca eliminada com sucesso!",
      deleteError: "Erro ao eliminar marca. Por favor, tente novamente.",
      confirmDelete: "Tem a certeza de que deseja eliminar '{{name}}'? Esta ação não pode ser revertida.",
      loadError: "Erro ao carregar marcas. Por favor, atualize a página.",
      seedDefaults: "Carregar Marcas Automotivas",
      confirmSeed: "Isto irá adicionar mais de 60 marcas automotivas (Ferrari, Porsche, BMW, Tesla, etc.), séries de corrida (Fórmula 1, Fórmula E), e marcas de entretenimento (Marvel) com os seus ícones oficiais. Continuar?",
      seedSuccess: "{{count}} marcas adicionadas/atualizadas com sucesso!",
      seedError: "Erro ao carregar marcas. Por favor, tente novamente.",
      allExist: "Todas as marcas já existem com ícones corretos",
      deleteAll: "Eliminar Tudo",
      confirmDeleteAll: "Tem a certeza de que deseja eliminar TODAS as {{count}} marcas? Esta ação não pode ser revertida e removerá permanentemente todos os dados das marcas.",
      deleteAllSuccess: "{{count}} marcas eliminadas com sucesso!",
      deleteAllError: "Erro ao eliminar marcas. Por favor, tente novamente.",
      noBrandsToDelete: "Não há marcas para eliminar.",
      logoSearch: "Pesquisar Bases de Dados de Logótipos",
      logoSearching: "A pesquisar...",
      logoSearchNameRequired: "Por favor, insira primeiro o nome da marca.",
      logoSearchNotFound: "Nenhum logótipo encontrado. Tente ajustar o nome da marca.",
      logoSearchError: "Erro ao pesquisar logótipos. Por favor, tente novamente.",
      logoSearchResults: "Logótipos Encontrados:",
      logoUse: "Usar Este",
      logoAdded: "Logótipo adicionado com sucesso!"
    },
    manufacturers: {
      title: "Gestão de Fabricantes",
      description: "Gerir fabricantes como Hot Wheels, Matchbox, Majorette, etc. Adicionar logótipos e códigos UPC.",
      addNew: "Adicionar Fabricante",
      addFirst: "Adicione o Seu Primeiro Fabricante",
      editManufacturer: "Editar Fabricante",
      searchPlaceholder: "Pesquisar fabricantes...",
      totalManufacturers: "{{count}} fabricantes",
      noManufacturers: "Ainda não há fabricantes. Adicione o seu primeiro fabricante ou carregue os padrões para começar!",
      noResults: "Nenhum fabricante encontrado.",
      manufacturerName: "Nome do Fabricante",
      logoUpload: "Carregar Logótipo",
      browse: "Procurar Ficheiro",
      uploading: "A carregar...",
      logoHint: "Opcional: Carregue uma imagem de logótipo (máx 5MB, PNG/JPG/GIF)",
      removeLogo: "Remover Logótipo",
      upc: "Código de Barras UPC",
      upcPlaceholder: "ex., 887961707212",
      upcHint: "Opcional: Adicione o código de barras UPC para este fabricante",
      scanUPC: "Escanear Código de Barras UPC",
      scan: "Escanear",
      scanWithCamera: "Escanear com Câmara",
      startScanning: "Iniciar Câmara",
      stopScanning: "Parar Câmara",
      uploadImage: "Carregar Imagem do Código de Barras",
      enterManually: "Introduzir UPC Manualmente",
      submit: "Submeter",
      or: "OU",
      upcInstructions: "Aponte a câmara para o código de barras UPC ou carregue uma imagem. Os códigos de barras UPC geralmente encontram-se na embalagem.",
      add: "Adicionar Fabricante",
      update: "Atualizar Fabricante",
      nameRequired: "O nome do fabricante é obrigatório",
      nameExists: "Já existe um fabricante com este nome",
      invalidFileType: "Tipo de ficheiro inválido. Por favor, carregue um ficheiro de imagem (PNG, JPG, GIF)",
      fileTooLarge: "O ficheiro é demasiado grande. O tamanho máximo é 5MB",
      uploadError: "Erro ao carregar logótipo. Por favor, tente novamente.",
      addSuccess: "Fabricante adicionado com sucesso!",
      addError: "Erro ao adicionar fabricante. Por favor, tente novamente.",
      updateSuccess: "Fabricante atualizado com sucesso!",
      updateError: "Erro ao atualizar fabricante. Por favor, tente novamente.",
      deleteSuccess: "Fabricante eliminado com sucesso!",
      deleteError: "Erro ao eliminar fabricante. Por favor, tente novamente.",
      confirmDelete: "Tem a certeza de que deseja eliminar '{{name}}'? Esta ação não pode ser revertida.",
      loadError: "Erro ao carregar fabricantes. Por favor, atualize a página.",
      seedDefaults: "Carregar Fabricantes Padrão",
      confirmSeed: "Isto irá adicionar todos os fabricantes padrão (Hot Wheels, Matchbox, etc.) à sua coleção. Continuar?",
      seedSuccess: "{{count}} fabricantes adicionados com sucesso!",
      seedError: "Erro ao carregar fabricantes. Por favor, tente novamente.",
      allExist: "Todos os fabricantes padrão já existem",
      deleteAll: "Eliminar Tudo",
      confirmDeleteAll: "Tem a certeza de que deseja eliminar TODOS os {{count}} fabricantes? Esta ação não pode ser revertida e removerá permanentemente todos os dados dos fabricantes.",
      deleteAllSuccess: "{{count}} fabricantes eliminados com sucesso!",
      deleteAllError: "Erro ao eliminar fabricantes. Por favor, tente novamente.",
      noManufacturersToDelete: "Não há fabricantes para eliminar.",
      logoSearch: "Pesquisar Bases de Dados de Logótipos",
      logoSearching: "A pesquisar...",
      logoSearchNameRequired: "Por favor, insira primeiro o nome do fabricante.",
      logoSearchNotFound: "Nenhum logótipo encontrado. Tente ajustar o nome do fabricante.",
      logoSearchError: "Erro ao pesquisar logótipos. Por favor, tente novamente.",
      logoSearchResults: "Logótipos Encontrados:",
      logoUse: "Usar Este",
      logoAdded: "Logótipo adicionado com sucesso!",
      errors: {
        camera: "Erro ao aceder à câmara. Verifique as permissões.",
        permission: "Permissão de câmara negada. Por favor, permita o acesso à câmara nas definições do navegador.",
        noCamera: "Nenhuma câmara encontrada neste dispositivo.",
        cameraInUse: "A câmara já está a ser utilizada por outra aplicação.",
        noBarcode: "Nenhum código de barras encontrado na imagem. Por favor, tente novamente."
      }
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
      bilingualSupport: "Os cabeçalhos do CSV podem estar em Português ou Inglês. Ambos os formatos são suportados.",
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
