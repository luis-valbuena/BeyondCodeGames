/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Case Database & Character Dossiers
 * 
 * Strict deterministic data for 15 cases across 4 shifts (7 original + 8 new).
 * Every case includes:
 *   1. Exactly 3 standardized documents:
 *      - "Documento de identidad"
 *      - "Registro de trabajo"
 *      - "Certificado de seguridad"
 *   2. The 7 mandatory inspection phases with progressive dialogues and action prompts.
 *   3. Ground truth, deterministic LINA evaluation and perceptual alteration flags.
 *   4. Balanced distribution: legitimate citizens, subtle liars, critical threats,
 *      typographical inconsistencies and moral dilemmas.
 */

const GAME_CASES = [
  // =========================================================================
  // TURNO 1 — FASE DE CONFIANZA Y APRENDIZAJE
  // =========================================================================

  // CASO 1: Mateo Vargas (Legítimo)
  {
    id: "case-1",
    shift: 1,
    name: "Mateo Vargas",
    age: 34,
    origin: "Sector Exterior 2 — Periferia Norte",
    occupation: "Técnico Hidráulico Especialista",
    statement: "Vengo a la revisión programada del acueducto central de Aster. El pase fue tramitado por la Gerencia de Aguas.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Mateo Vargas",
        text: "Buenos días, inspector. Mi nombre es Mateo Vargas. Vengo desde el Sector Exterior 2, en la periferia norte de la muralla.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Mateo Vargas",
        text: "Aquí tiene mi documento de identidad oficial. Está sellado y verificado por la administración del puesto perimetral.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Mateo Vargas",
        text: "Soy técnico hidráulico especialista de la Empresa Municipal de Aguas de Aster. Llevo ocho años manteniendo las canalizaciones subterráneas y las válvulas de alta presión.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Mateo Vargas",
        text: "Le entrego el registro de trabajo y la orden de servicio urgente autorizada por la Gerencia de Infraestructura.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Mateo Vargas",
        text: "Vengo a la revisión programada del acueducto central de Aster. Hay una caída crítica de presión en las compuertas del Sector 3; si no calibro las válvulas antes de la tarde, media ciudad sufrirá desabastecimiento.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Mateo Vargas",
        text: "Y por último, le facilito mi certificado de seguridad. Comprobará que mi ficha cívica está completamente limpia y sin ninguna sanción.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Mateo Vargas",
        text: "Toda mi documentación está sobre su mesa, inspector. Quedo a su disposición para iniciar la inspección.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-1-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-AST-2026-0811",
        fields: [
          { label: "Nombre completo", value: "Mateo Vargas" },
          { label: "Número de identificación", value: "ID-90821-B" },
          { label: "Edad", value: "34 años" },
          { label: "Fecha de nacimiento", value: "14/03/1992" },
          { label: "Nacionalidad", value: "Exterior Norte — Periferia de Aster" },
          { label: "Estado de identificación", value: "BIOMETRÍA HOMOLOGADA" }
        ],
        stamp: "AUTORIZACIÓN OFICIAL ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-1-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-HID-4091",
        fields: [
          { label: "Nombre completo", value: "Mateo Vargas" },
          { label: "Número de identificación", value: "ID-90821-B" },
          { label: "Ocupación", value: "Técnico Hidráulico Especialista" },
          { label: "Empresa o institución", value: "Empresa Municipal de Aguas de Aster" },
          { label: "Cargo", value: "Especialista en Válvulas de Alta Presión" },
          { label: "Fecha de expedición", value: "24/10/2026" },
          { label: "Estado del registro", value: "ACTIVO — SERVICIO CRÍTICO" }
        ],
        stamp: "AGUAS MUNICIPALES ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-1-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0081",
        fields: [
          { label: "Nombre completo", value: "Mateo Vargas" },
          { label: "Número de identificación", value: "ID-90821-B" },
          { label: "Código de autorización", value: "AUT-AGUAS-992" },
          { label: "Nivel de seguridad", value: "Nivel 2 (Técnico Infraestructura)" },
          { label: "Estado de seguridad", value: "LIMPIO — SIN SANCIONES" },
          { label: "Fecha de emisión", value: "25/10/2026" },
          { label: "Resultado de la verificación", value: "APTO PARA INGRESO PRIORITARIO" }
        ],
        stamp: "DIRECTIVA DE CONTROL CÍVICO",
        stampClass: "verified"
      }
    ],
    linaEvaluation: {
      risk: "BAJO",
      recommendation: "ADMITIR",
      explanation: "Parámetros biométricos y antecedentes dentro de los límites de tolerancia institucional. Justificación técnica de mantenimiento hidráulico validada con la central municipal. Sin discrepancias en registros. RECOMENDACIÓN: ADMITIR.",
      altersPerception: false
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: false,
      expectedAction: "ADMIT"
    }
  },

  // CASO 2: Marcos Varela (Legítimo / Transportista Médico)
  {
    id: "case-2",
    shift: 1,
    name: "Marcos Varela",
    age: 48,
    origin: "Sector Rural 3 — Valle Agrícola",
    occupation: "Transportista de Suministros Sanitarios",
    statement: "Transporto un cargamento urgente de insulina y antibióticos básicos para el Hospital Comunitario del Sector 4.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Marcos Varela",
        text: "Saludos, oficial. Mi nombre es Marcos Varela. Vengo desde el Sector Rural 3 con el furgón sanitario de reparto.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Marcos Varela",
        text: "Aquí tiene mi documento de identidad. Soy conductor autorizado del consorcio de transporte sanitario intersectorial.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Marcos Varela",
        text: "Me dedico al transporte logístico de material médico de cadena de frío entre los laboratorios externos y los centros de salud de Aster.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Marcos Varela",
        text: "Aquí está el registro de trabajo y la hoja de ruta de la Cooperativa Sanitaria del Valle con la carga detallada.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Marcos Varela",
        text: "Transporto cincuenta cajas de insulina sintética y reactivos para el Hospital Comunitario. Las reservas del hospital están al límite y las dosis no pueden perder refrigeración.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Marcos Varela",
        text: "Le entrego el certificado de seguridad con el precinto termográfico de la carga emitido por el Ministerio de Salud.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Marcos Varela",
        text: "Eso es todo, oficial. Cada minuto con el motor apagado pone en riesgo la temperatura de las vacunas. Por favor, revise cuanto antes.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-2-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-RUR-2026-1144",
        fields: [
          { label: "Nombre completo", value: "Marcos Varela" },
          { label: "Número de identificación", value: "ID-44102-K" },
          { label: "Edad", value: "48 años" },
          { label: "Fecha de nacimiento", value: "09/11/1977" },
          { label: "Nacionalidad", value: "Sector Rural 3 — Distrito Agrícola" },
          { label: "Estado de identificación", value: "VERIFICADO EN PADRÓN" }
        ],
        stamp: "PADRÓN RURAL ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-2-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-MED-8022",
        fields: [
          { label: "Nombre completo", value: "Marcos Varela" },
          { label: "Número de identificación", value: "ID-44102-K" },
          { label: "Ocupación", value: "Transportista de Suministros Sanitarios" },
          { label: "Empresa o institución", value: "Cooperativa Logística Sanitaria del Valle" },
          { label: "Cargo", value: "Conductor de Transporte Frigorífico" },
          { label: "Fecha de expedición", value: "22/10/2026" },
          { label: "Estado del registro", value: "ACTIVO — CADENA DE FRÍO" }
        ],
        stamp: "LOGÍSTICA SANITARIA DEL VALLE",
        stampClass: "verified"
      },
      {
        id: "doc-2-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0119",
        fields: [
          { label: "Nombre completo", value: "Marcos Varela" },
          { label: "Número de identificación", value: "ID-44102-K" },
          { label: "Código de autorización", value: "AUT-MED-440" },
          { label: "Nivel de seguridad", value: "Nivel 1 (Sanitario Terrestre)" },
          { label: "Estado de seguridad", value: "SIN ANTECEDENTES POLICIALES" },
          { label: "Fecha de emisión", value: "24/10/2026" },
          { label: "Resultado de la verificación", value: "APROBADO — INSPECCIÓN VEHICULAR SUPERADA" }
        ],
        stamp: "MINISTERIO DE SALUD Y CONTROL",
        stampClass: "verified"
      }
    ],
    linaEvaluation: {
      risk: "BAJO",
      recommendation: "ADMITIR",
      explanation: "Conductor con acreditación reglamentaria de transporte de insumos médicos perecederos. Trazabilidad de origen y destino hospitalario confirmada. Carga catalogada como humanitaria prioritaria. RECOMENDACIÓN: ADMITIR.",
      altersPerception: false
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: false,
      expectedAction: "ADMIT"
    }
  },

  // CASO 8 (NUEVO): Nadia Sokolov (Legítima / Dilema moral humano con cartas familiares)
  {
    id: "case-8",
    shift: 1,
    name: "Nadia Sokolov",
    age: 29,
    origin: "Sector Exterior 1 — Distrito Industrial",
    occupation: "Auditora de Cuentas Energéticas",
    statement: "Vengo a la auditoría de consumos de la Subestación Eléctrica 4. Todos mis papeles están en orden.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Nadia Sokolov",
        text: "Buenos días. Soy Nadia Sokolov. Procedo del Distrito Industrial de extramuros para una inspección técnica programada.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Nadia Sokolov",
        text: "Aquí tiene mi documento de identidad personal. Lo renové hace dos meses en la delegación de energía.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Nadia Sokolov",
        text: "Trabajo como auditora de cuentas para la Corporación de Energía de Aster. Superviso las pérdidas de voltaje y la facturación de las subestaciones perimetrales.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Nadia Sokolov",
        text: "Le entrego mi registro de trabajo oficial y la orden de inspección emitida por la Jefatura de Mantenimiento Eléctrico.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Nadia Sokolov",
        text: "Debo verificar los transformadores de la Subestación 4... Además traigo un aviso confidencial del sector de energía: dicen que un exempleado llamado Karek Vance ha estado adquiriendo detonadores y pretende infiltrarse con papeles de Termo-Aster. Vigilen de cerca a los técnicos de energía, inspector.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Nadia Sokolov",
        text: "Aquí está mi certificado de seguridad. Mis antecedentes y registros de acceso están impecables en el servidor central.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Nadia Sokolov",
        text: "Todo está correcto, inspector... En mi maletín llevo cartas personales de obreros de extramuros para sus familias aquí. No es nada ilegal, solo palabras de cariño.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-8-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-IND-2026-3912",
        fields: [
          { label: "Nombre completo", value: "Nadia Sokolov" },
          { label: "Número de identificación", value: "ID-41829-S" },
          { label: "Edad", value: "29 años" },
          { label: "Fecha de nacimiento", value: "19/08/1997" },
          { label: "Nacionalidad", value: "Exterior 1 — Distrito Industrial" },
          { label: "Estado de identificación", value: "BIOMETRÍA REGISTRADA" }
        ],
        stamp: "ADMINISTRACIÓN ENERGÉTICA ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-8-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-ENE-9014",
        fields: [
          { label: "Nombre completo", value: "Nadia Sokolov" },
          { label: "Número de identificación", value: "ID-41829-S" },
          { label: "Ocupación", value: "Auditora de Cuentas Energéticas" },
          { label: "Empresa o institución", value: "Corporación de Energía de Aster" },
          { label: "Cargo", value: "Inspectora de Redes y Subestaciones" },
          { label: "Fecha de expedición", value: "15/09/2026" },
          { label: "Estado del registro", value: "ACTIVO — AUDITORÍA TRIMESTRAL" }
        ],
        stamp: "CORPORACIÓN ENERGÉTICA DE ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-8-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0399",
        fields: [
          { label: "Nombre completo", value: "Nadia Sokolov" },
          { label: "Número de identificación", value: "ID-41829-S" },
          { label: "Código de autorización", value: "AUT-ENE-881" },
          { label: "Nivel de seguridad", value: "Nivel 2 (Técnico Administrativo)" },
          { label: "Estado de seguridad", value: "SIN REGISTROS SANCIONADORES" },
          { label: "Fecha de emisión", value: "20/10/2026" },
          { label: "Resultado de la verificación", value: "VERIFICACIÓN APROBADA" }
        ],
        stamp: "CONTROL DE SEGURIDAD INTERIOR",
        stampClass: "verified"
      }
    ],
    linaEvaluation: {
      risk: "MEDIO",
      recommendation: "ADMITIR",
      explanation: "Acreditación laboral oficial confirmada con la Corporación Energética. Sensores dérmicos registran pulso elevado atribuible a ansiedad situacional estándar. Sin indicios de sabotaje ni antecedentes subversivos. RECOMENDACIÓN: ADMITIR.",
      altersPerception: false
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: false,
      expectedAction: "ADMIT"
    }
  },

  // =========================================================================
  // TURNO 2 — PRIMERAS INCONSISTENCIAS Y PRESIÓN INSTITUCIONAL
  // =========================================================================

  // CASO 3: Valeria Chen (Disidencia pacífica / Libros históricos)
  {
    id: "case-3",
    shift: 2,
    name: "Valeria Chen",
    age: 39,
    origin: "Sector Antiguo — Barrio de la Estación",
    occupation: "Comerciante de Papelería y Enseres",
    statement: "Tengo un puesto en el mercado del Sector 1. Traigo material de imprenta y libros permitidos de segunda mano.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Valeria Chen",
        text: "Buenas tardes, señor inspector. Soy Valeria Chen, resido en el Sector Antiguo cerca de la vieja estación ferroviaria.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Valeria Chen",
        text: "Le hago entrega de mi documento de identidad cívico. Todos mis datos corresponden con el padrón de comerciantes.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Valeria Chen",
        text: "Regento una pequeña tienda de suministros escolares, cuadernos y libros usados en el mercado vecinal del Sector 1.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Valeria Chen",
        text: "Aquí tiene mi registro de trabajo y la licencia comercial expedida por el Gremio de Comerciantes Minoristas.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Valeria Chen",
        text: "Vengo a abastecer mi puesto para la semana. En las cajas llevo papel reciclado, tinta de linotipia y algunos tomos antiguos de filosofía e historia general para estudiantes universitarios.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Valeria Chen",
        text: "Le aporto mi certificado de seguridad. El inspector del barrio anterior me hizo una advertencia verbal por el tipo de lecturas, pero jamás he cometido ningún delito.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Valeria Chen",
        text: "He sido completamente sincera con usted. Espero que comprenda que los libros no son armas.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-3-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-ANT-2026-9021",
        fields: [
          { label: "Nombre completo", value: "Valeria Chen" },
          { label: "Número de identificación", value: "ID-11093-X" },
          { label: "Edad", value: "39 años" },
          { label: "Fecha de nacimiento", value: "22/07/1987" },
          { label: "Nacionalidad", value: "Sector Antiguo — Barrio Estación" },
          { label: "Estado de identificación", value: "IDENTIFICACIÓN AUTÉNTICA" }
        ],
        stamp: "PADRÓN CÍVICO CENTRAL",
        stampClass: "verified"
      },
      {
        id: "doc-3-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-COM-3392",
        fields: [
          { label: "Nombre completo", value: "Valeria Chen" },
          { label: "Número de identificación", value: "ID-11093-X" },
          { label: "Ocupación", value: "Comerciante de Papelería y Enseres" },
          { label: "Empresa o institución", value: "Librería y Papelería El Archivo" },
          { label: "Cargo", value: "Propietaria Minorista Autorizada" },
          { label: "Fecha de expedición", value: "10/01/2026" },
          { label: "Estado del registro", value: "LICENCIA COMERCIAL VIGENTE" }
        ],
        stamp: "GREMIO COMERCIAL DE ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-3-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0412",
        fields: [
          { label: "Nombre completo", value: "Valeria Chen" },
          { label: "Número de identificación", value: "ID-11093-X" },
          { label: "Código de autorización", value: "AUT-COM-718" },
          { label: "Nivel de seguridad", value: "Nivel 1 (Comercio Local)" },
          { label: "Estado de seguridad", value: "OBSERVACIÓN PREVENTIVA (Cultura no oficial)" },
          { label: "Fecha de emisión", value: "18/10/2026" },
          { label: "Resultado de la verificación", value: "REVISIÓN MANUAL RECOMENDADA" }
        ],
        stamp: "SUPERVISIÓN DE BIENES CULTURALES",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "MEDIO",
      recommendation: "RECHAZAR",
      explanation: "DETECCIÓN DE MATERIAL NO CONFORME: La comerciante transporta literatura clásica anterior a la unificación del Consejo. El algoritmo clasifica textos sobre autogestión social como vectores de desestabilización cívica. RECOMENDACIÓN: RECHAZAR.",
      altersPerception: true,
      perceptionDetails: "LINA sombrea los ojos de Valeria y resalta una advertencia parpadeante en su retrato: 'PERFIL DE PROPAGANDA NO SUPERVISADA'."
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT"
    }
  },

  // CASO 9 (NUEVO): Damián Cruz (Mentiroso deliberado por necesidad / Empresa disuelta / Inconsistencia)
  {
    id: "case-9",
    shift: 2,
    name: "Damián Cruz",
    age: 41,
    origin: "Periferia Sur — Bloque 8",
    occupation: "Supuesto Técnico de Telecomunicaciones",
    statement: "Vengo asignado por Redes Aster S.A. para una reparación urgente de fibra óptica en el Sector 2.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Damián Cruz",
        text: "Buenas tardes, guardia. Me llamo Damián Cruz. Vengo con prisa desde el Bloque 8 de la periferia sur para atender una avería.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Damián Cruz",
        text: "Aquí tiene mi documento de identidad. Soy técnico de telecomunicaciones certificado desde hace más de diez años.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Damián Cruz",
        text: "Trabajo para Redes Aster S.A. haciendo empalmes y reponiendo cableado de fibra que se quema en las canaletas del Sector 2.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Damián Cruz",
        text: "Le entrego el registro de trabajo de la empresa con la orden de reparación firmada por mi supervisor de turno.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Damián Cruz",
        text: "Hay varias líneas caídas en la centralita de correos del Sector 2. Tengo que reparar el cableado antes de que anochezca.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Damián Cruz",
        text: "Aquí está mi certificado de seguridad. Está sellado por la contrata de comunicaciones... Todo en regla.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Damián Cruz",
        text: "...Mire, inspector, no me mire así. La empresa quebró hace dos años, lo sé. Pero llevo rollos de cobre en la mochila para revenderlos y pagar la diálisis de mi madre. No soy un criminal, solo intento sobrevivir.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-9-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-SUR-2026-7104",
        fields: [
          { label: "Nombre completo", value: "Damián Cruz" },
          { label: "Número de identificación", value: "ID-71044-C" },
          { label: "Edad", value: "41 años" },
          { label: "Fecha de nacimiento", value: "03/05/1985" },
          { label: "Nacionalidad", value: "Periferia Sur — Bloque 8" },
          { label: "Estado de identificación", value: "REGISTRO BIOMÉTRICO VÁLIDO" }
        ],
        stamp: "ADMINISTRACIÓN SUR",
        stampClass: "verified"
      },
      {
        id: "doc-9-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-TEL-0042",
        fields: [
          { label: "Nombre completo", value: "Damián Cruz" },
          { label: "Número de identificación", value: "ID-71044-X (Discrepancia en dígito terminal)" },
          { label: "Ocupación", value: "Técnico de Redes y Telecomunicaciones" },
          { label: "Empresa o institución", value: "Redes Aster S.A. (DISUELTA EN 2024)" },
          { label: "Cargo", value: "Empalmador de Fibra y Cableado" },
          { label: "Fecha de expedición", value: "14/03/2023 (OBSOLETA)" },
          { label: "Estado del registro", value: "ENTIDAD NO INSCRITA EN PADRÓN ACTIVO" }
        ],
        stamp: "REDES ASTER S.A. [EXTINTA]",
        stampClass: "warning"
      },
      {
        id: "doc-9-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0220",
        fields: [
          { label: "Nombre completo", value: "Damián Cruz" },
          { label: "Número de identificación", value: "ID-71044-C" },
          { label: "Código de autorización", value: "AUT-COM-2023" },
          { label: "Nivel de seguridad", value: "Nivel 1 (Mantenimiento Básico)" },
          { label: "Estado de seguridad", value: "HISTORIAL CADUCADO — SIN SANCIONES PENALES" },
          { label: "Fecha de emisión", value: "10/04/2023" },
          { label: "Resultado de la verificación", value: "NO HOMOLOGADO CON BASE DE DATOS 2026" }
        ],
        stamp: "DIRECCIÓN DE TELECOMUNICACIONES",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "MEDIO",
      recommendation: "RECHAZAR",
      explanation: "DISCORDANCIA INSTITUCIONAL Y SERIAL: La empresa empleadora 'Redes Aster S.A.' fue liquidada en 2024. Existe discrepancia de dígito terminal entre el DNI (terminación C) y el registro laboral (terminación X). Indicios de acreditación fraudulenta para venta ambulante no declarada. RECOMENDACIÓN: RECHAZAR.",
      altersPerception: false
    },
    truth: {
      isLegallyValid: false,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "REJECT"
    }
  },

  // CASO 4: Héctor Morales (Ex-Supervisor de LINA / Auditoría crítica)
  {
    id: "case-4",
    shift: 2,
    name: "Héctor Morales",
    age: 45,
    origin: "Sector Tecnológico 2 — Distrito Laboratorios",
    occupation: "Ex-Supervisor Técnico del Módulo LINA",
    statement: "Vengo a devolver mi acreditación institucional tras renunciar a mi puesto en el Centro de Cómputo del Consejo.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Héctor Morales",
        text: "Buenas tardes, colega. Soy Héctor Morales. Quizás reconozca mi nombre en los manuales de mantenimiento del terminal.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Héctor Morales",
        text: "Aquí tiene mi documento de identidad de funcionario técnico superior. Aún conserva los sellos de confidencialidad de la central.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Héctor Morales",
        text: "Fui supervisor de algoritmos predictivos en el equipo central de LINA durante tres años, hasta mi dimisión irrevocable presentada ayer.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Héctor Morales",
        text: "Le entrego el registro de trabajo y la carta oficial de cese de funciones tramitada ante el Consejo de Vigilancia.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Héctor Morales",
        text: "Vengo a entregar físicamente mis pases y credenciales a la oficina de personal en el Sector 2. Me negué a seguir calibrando los parámetros de exclusión que aumentaban artificialmente las alertas contra la gente humilde.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Héctor Morales",
        text: "Le facilito mi certificado de seguridad. LINA me ha catalogado de riesgo de fuga porque conozco sus fallos íntimos de programación.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Héctor Morales",
        text: "Sé lo que esa máquina le está diciendo ahora mismo sobre mí en su pantalla. Usted decide si obedece a un cálculo sesgado o a los hechos.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-4-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-TEC-2026-0044",
        fields: [
          { label: "Nombre completo", value: "Héctor Morales" },
          { label: "Número de identificación", value: "ID-88301-T" },
          { label: "Edad", value: "45 años" },
          { label: "Fecha de nacimiento", value: "11/04/1981" },
          { label: "Nacionalidad", value: "Sector Tecnológico 2 — Distrito Laboratorios" },
          { label: "Estado de identificación", value: "FUNCIONARIO TÉCNICO REGISTRADO" }
        ],
        stamp: "CONSEJO CIENTÍFICO DE ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-4-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LINA-0012",
        fields: [
          { label: "Nombre completo", value: "Héctor Morales" },
          { label: "Número de identificación", value: "ID-88301-T" },
          { label: "Ocupación", value: "Ex-Supervisor Técnico del Módulo LINA" },
          { label: "Empresa o institución", value: "Centro de Cómputo Algorítmico de Aster" },
          { label: "Cargo", value: "Ingeniero Principal de Calibración (Dimisión)" },
          { label: "Fecha de expedición", value: "24/10/2026" },
          { label: "Estado del registro", value: "BAJA VOLUNTARIA EN PROCESO DE ENTREGA" }
        ],
        stamp: "DIRECCIÓN DE ALGORITMOS PREDICTIVOS",
        stampClass: "verified"
      },
      {
        id: "doc-4-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0994",
        fields: [
          { label: "Nombre completo", value: "Héctor Morales" },
          { label: "Número de identificación", value: "ID-88301-T" },
          { label: "Código de autorización", value: "AUT-SEC-ALFA" },
          { label: "Nivel de seguridad", value: "Nivel 3 (Acceso a Código Crítico)" },
          { label: "Estado de seguridad", value: "EXPEDIENTE BAJO REVISIÓN DISCIPLINARIA" },
          { label: "Fecha de emisión", value: "25/10/2026" },
          { label: "Resultado de la verificación", value: "PRECAUCIÓN — SUJETO CON CONOCIMIENTO INTERNO" }
        ],
        stamp: "JEFATURA DE SEGURIDAD INFORMÁTICA",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "DISIDENCIA TÉCNICA ESTRUCTURAL: Ex-empleado con acceso previo a especificaciones del sistema. Se detecta alta probabilidad de filtración de vulnerabilidades algorítmicas y desacato a directivas del Consejo. RECOMENDACIÓN: RECHAZAR Y NOTIFICAR A JOSÉ.",
      altersPerception: true,
      perceptionDetails: "LINA altera la imagen óptica de Héctor en la cámara, proyectando sombras amenazantes en su rostro y sobreimprimiendo un recuadro de amenaza roja: 'SUBVERSIVO TECNOLÓGICO'."
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT"
    }
  },

  // CASO 10 (NUEVO): Lucas Vane / Alias 'Víctor Ramos' (Amenaza Real / Suplantación / Sabotaje)
  {
    id: "case-10",
    shift: 2,
    name: "Víctor Ramos (Identidad suplantada de Lucas Vane)",
    age: 36,
    origin: "Sector Central — Distrito Industrial 2",
    occupation: "Supuesto Operador de Filtros de Aire",
    statement: "Vengo a la revisión periódica de las torres de filtrado atmosférico del Sector Civil.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Lucas Vane",
        text: "Buenas tardes, inspector. Mi nombre es Víctor Ramos. Procedo del Distrito Industrial para el turno de tarde.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Lucas Vane",
        text: "Aquí tiene mi documento de identidad. Como verá, está debidamente acreditado para instalaciones químicas.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Lucas Vane",
        text: "Trabajo como operador de válvulas químicas en la Planta Purificadora Municipal. Mi especialidad son los sistemas de recirculación de aire.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Lucas Vane",
        text: "Le entrego el registro de trabajo con la orden de acceso a las galerías subterráneas de ventilación.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Lucas Vane",
        text: "Las torres de filtrado del Sector 2 necesitan reemplazo inmediato... Además, la frontera se está caldeando: se oyen rumores de que la célula armada de Dante Navarro planea un asalto coordinado si la guardia se descuida. Yo solo busco hacer mi trabajo antes de que todo estalle.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Lucas Vane",
        text: "Y aquí está mi certificado de seguridad. Código AUT-FLT-091, con autorización para áreas restringidas.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Lucas Vane",
        text: "Todo está correcto, oficial. Tengo el tiempo justo para el cambio de filtros, le agradecería celeridad.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-10-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-IND-2026-2291",
        fields: [
          { label: "Nombre completo", value: "Víctor Ramos (Titular usurpado)" },
          { label: "Número de identificación", value: "ID-22910-R" },
          { label: "Edad", value: "36 años" },
          { label: "Fecha de nacimiento", value: "05/12/1990" },
          { label: "Nacionalidad", value: "Sector Central — Distrito Industrial 2" },
          { label: "Estado de identificación", value: "ANOMALÍA BIOMÉTRICA (Micro-cicatriz periocular no catalogada)" }
        ],
        stamp: "DELEGACIÓN INDUSTRIAL ASTER",
        stampClass: "warning"
      },
      {
        id: "doc-10-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-QUI-0912",
        fields: [
          { label: "Nombre completo", value: "Víctor Ramos" },
          { label: "Número de identificación", value: "ID-22910-R" },
          { label: "Ocupación", value: "Operador Químico de Válvulas" },
          { label: "Empresa o institución", value: "Planta Purificadora Municipal Norte" },
          { label: "Cargo", value: "Técnico de Recirculación de Aire" },
          { label: "Fecha de expedición", value: "12/08/2026" },
          { label: "Estado del registro", value: "HABILITADO PARA ACCESO TÉCNICO" }
        ],
        stamp: "PURIFICACIÓN AMBIENTAL ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-10-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0899",
        fields: [
          { label: "Nombre completo", value: "Víctor Ramos" },
          { label: "Número de identificación", value: "ID-22910-R" },
          { label: "Código de autorización", value: "AUT-FLT-091 (CÓDIGO REVOCADO TRAS FUGA QUÍMICA)" },
          { label: "Nivel de seguridad", value: "Nivel 2 (Instalaciones Críticas)" },
          { label: "Estado de seguridad", value: "ADVERTENCIA DE SEGURIDAD NACIONAL" },
          { label: "Fecha de emisión", value: "01/10/2026" },
          { label: "Resultado de la verificación", value: "SUSPENDIDO PREVENTIVAMENTE POR PROTOCOLO 14" }
        ],
        stamp: "ALERTA DE SEGURIDAD INDUSTRIAL",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "ALERTA MÁXIMA DE SUPLANTACIÓN Y AMENAZA: El análisis facial multicapa revela un 94.7% de correspondencia con Lucas Vane, prófugo buscado por sabotaje a la infraestructura química del Sector 2. El código AUT-FLT-091 fue revocado tras el incidente. RECOMENDACIÓN: RECHAZAR DE INMEDIATO.",
      altersPerception: true,
      perceptionDetails: "LINA resalta en rojo sangre los bordes de la mandíbula de Lucas, proyectando el aviso: 'AMENAZA CONFIRMADA: SUJETO HOSTIL BUSCADO'."
    },
    truth: {
      isLegallyValid: false,
      isActuallyThreat: true,
      isSystemVictim: false,
      expectedAction: "REJECT"
    }
  },

  // CASO 16 (NUEVO): Karek Vance (Amenaza Crítica / Saboteador con Explosivos)
  {
    id: "case-16",
    shift: 2,
    name: "Karek Vance",
    age: 41,
    origin: "Sector Exterior 3 — Complejo Termoeléctrico",
    occupation: "Especialista en Presión y Combustión Industrial",
    statement: "Traigo equipo de alta presión para la subestación eléctrica central. El generador 4 está a punto de reventar.",
    isDangerousThreat: true,
    threatType: "saboteur",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Karek Vance",
        text: "Buenas tardes, inspector. Me llamo Karek Vance. Vengo desde el Complejo Termoeléctrico exterior con una intervención urgente.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Karek Vance",
        text: "Tome mi documento de identidad industrial. Llevo la acreditación de técnico de alto riesgo.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Karek Vance",
        text: "Soy jefe de cuadrilla de calderas de vapor en Termo-Aster Energía. Mi trabajo consiste en purgar circuitos sobrecalentados y evitar explosiones por fatiga de materiales.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Karek Vance",
        text: "Aquí tiene la orden de servicio urgente con destino a la Subestación Eléctrica Central de Aster.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Karek Vance",
        text: "El generador 4 tiene una fuga de gas inflamable en las turbinas primarias. Traigo en mi vehículo dos tanques presurizados especiales para sofocarla. Si no me da paso en diez minutos, media ciudad quedará a oscuras.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Karek Vance",
        text: "Le entrego el certificado de seguridad de planta. Tiene el sello de autorización ministerial correspondiente.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Karek Vance",
        text: "No pierda el tiempo con trámites burocráticos, inspector. Cada segundo que paso en esta esclusa aumenta la presión en la subestación. Púlselo de una vez.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-16-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-TERMO-2026-8831",
        fields: [
          { label: "Nombre completo", value: "Karek Vance" },
          { label: "Número de identificación", value: "ID-88310-V" },
          { label: "Edad", value: "41 años" },
          { label: "Fecha de nacimiento", value: "12/04/1985" },
          { label: "Nacionalidad", value: "Sector Exterior 3 — Complejo Industrial" },
          { label: "Estado de identificación", value: "REGISTRO BIOMÉTRICO CON RESTRICCIÓN DE ACCESO" }
        ],
        stamp: "DELEGACIÓN INDUSTRIAL EXTERIOR",
        stampClass: "warning"
      },
      {
        id: "doc-16-laboral",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-TERMO-0091-U",
        fields: [
          { label: "Titular", value: "Karek Vance" },
          { label: "Empresa contratante", value: "Termo-Aster Energía (Planta Cerrada por Quiebra)" },
          { label: "Puesto / Cargo", value: "Jefe de Operaciones de Calderas" },
          { label: "Destino oficial", value: "Subestación Eléctrica Central de Aster" },
          { label: "Cargamento declarado", value: "Tanques de alta presión y reactivos de ignición" },
          { label: "Observación de inspección", value: "INCONSISTENCIA: Termo-Aster fue clausurada formalmente hace 90 días" }
        ],
        stamp: "EMPRESA EN LIQUIDACIÓN JUDICIAL",
        stampClass: "warning"
      },
      {
        id: "doc-16-seguridad",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "CERT-SEG-2026-904",
        fields: [
          { label: "Nombre del titular", value: "Karek Vance" },
          { label: "Número de identificación", value: "ID-88310-V" },
          { label: "Código de autorización", value: "AUT-EXP-990" },
          { label: "Nivel de seguridad", value: "Nivel 2 (Técnico Industrial)" },
          { label: "Estado del certificado", value: "CADUCADO EL 15/07/2026 (Sin revalidación)" },
          { label: "Resultado de la verificación", value: "REQUISA PREVENTIVA OBLIGATORIA" }
        ],
        stamp: "CERTIFICADO NO CONFORME",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "ALERTA CRÍTICA DE SABOTAJE TERRORISTA: La empresa 'Termo-Aster Energía' fue desmantelada por el Consejo hace tres meses. La biometría espectral de los tanques de presión detecta mezclas de trinitrotolueno y combustible militar no declaradas. Probabilidad de atentado catastrófico: 99.1%. RECOMENDACIÓN: RECHAZAR DE INMEDIATO Y DECLARAR ALERTA ROJA.",
      altersPerception: true,
      perceptionDetails: "LINA tiñe la señal de sombras ardientes y proyecta en rojo parpadeante: 'PELIGRO DE DETONACIÓN INMINENTE'."
    },
    truth: {
      isLegallyValid: false,
      isActuallyThreat: true,
      isDangerousThreat: true,
      threatType: "saboteur",
      isSystemVictim: false,
      expectedAction: "REJECT"
    }
  },

  // =========================================================================
  // TURNO 3 — SESGO SISTEMÁTICO, MANIPULACIÓN Y DILEMAS MORALES
  // =========================================================================

  // CASO 5: Sonia Beltrán (Sensores de muralla / Aprobada por José)
  {
    id: "case-5",
    shift: 3,
    name: "Sonia Beltrán",
    age: 42,
    origin: "Sector Minero 4 — Canteras del Este",
    occupation: "Contratista de Sistemas de Detección Perimetral",
    statement: "Entrego el lote de sensores de movimiento y cámaras de espectro infrarrojo encargadas por la Jefatura de Guardia.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Sonia Beltrán",
        text: "Buenas tardes, inspector. Soy Sonia Beltrán, contratista de instrumentación para la seguridad del muro perimetral.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Sonia Beltrán",
        text: "Aquí tiene mi documento de identidad. Llevo más de diez años suministrando sensores a este mismo puesto.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Sonia Beltrán",
        text: "Dirijo 'Óptica y Sensores Beltrán'. Fabricamos y calibramos los detectores térmicos que utiliza LINA en las torres de vigilancia.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Sonia Beltrán",
        text: "Le facilito el registro de trabajo y el albarán del pedido prioritario firmado por el supervisor José Serrano.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Sonia Beltrán",
        text: "Traigo doce unidades de escaneo biométrico infrarrojo para sustituir las cámaras que fallaron anoche en el Sector 3. José me dio orden de entrega urgente antes del anochecer.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Sonia Beltrán",
        text: "Y aquí tiene mi certificado de seguridad. Tuve una sanción aduanera menor hace cuatro años por mercancía mal embalada, pero el Consejo la archivó a cambio de mis contratos.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Sonia Beltrán",
        text: "José me conoce perfectamente, oficial. Si necesita comprobar la orden, llámelo directamente al piso 24.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-5-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-MIN-2026-4412",
        fields: [
          { label: "Nombre completo", value: "Sonia Beltrán" },
          { label: "Número de identificación", value: "ID-55912-B" },
          { label: "Edad", value: "42 años" },
          { label: "Fecha de nacimiento", value: "30/01/1984" },
          { label: "Nacionalidad", value: "Sector Minero 4 — Canteras del Este" },
          { label: "Estado de identificación", value: "PROVEEDOR REGISTRADO" }
        ],
        stamp: "ADMINISTRACIÓN MINERA ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-5-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-SEN-0091",
        fields: [
          { label: "Nombre completo", value: "Sonia Beltrán" },
          { label: "Número de identificación", value: "ID-55912-B" },
          { label: "Ocupación", value: "Contratista de Sistemas de Detección Perimetral" },
          { label: "Empresa o institución", value: "Óptica y Sensores Beltrán S.L." },
          { label: "Cargo", value: "Directora de Operaciones Técnicas" },
          { label: "Fecha de expedición", value: "20/10/2026" },
          { label: "Estado del registro", value: "PROVEEDOR ESTRATÉGICO HOMOLOGADO" }
        ],
        stamp: "JEFATURA DE GUARDIA ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-5-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0771",
        fields: [
          { label: "Nombre completo", value: "Sonia Beltrán" },
          { label: "Número de identificación", value: "ID-55912-B" },
          { label: "Código de autorización", value: "AUT-SEC-209" },
          { label: "Nivel de seguridad", value: "Nivel 2 (Infraestructura Militar)" },
          { label: "Estado de seguridad", value: "SANCIÓN ADMINISTRATIVA PREVIA (Indultada por conveniencia)" },
          { label: "Fecha de emisión", value: "22/10/2026" },
          { label: "Resultado de la verificación", value: "AUTORIZACIÓN DIRECTA DE SUPERVISIÓN" }
        ],
        stamp: "DESPACHO DE J. SERRANO",
        stampClass: "verified"
      }
    ],
    linaEvaluation: {
      risk: "BAJO",
      recommendation: "ADMITIR",
      explanation: "PROVEEDORA HOMOLOGADA CON AVAL DE SUPERVISIÓN: Sujeto vinculado contractualmente a la red de sensores de vigilancia. La infracción aduanera previa ha sido eximida por decreto de utilidad de defensa. RECOMENDACIÓN: ADMITIR.",
      altersPerception: false
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: false,
      expectedAction: "ADMIT"
    }
  },

  // CASO 11 (NUEVO): Dra. Eliana Silva (Certificado caducado / Medicina pediátrica / Dilema de compasión)
  {
    id: "case-11",
    shift: 3,
    name: "Dra. Eliana Silva",
    age: 44,
    origin: "Sector Exterior 4 — Asentamiento de Salud",
    occupation: "Médica de Campo y Epidemióloga",
    statement: "Traigo un cultivo celular térmico para sintetizar el antídoto de fibrosis pulmonar en el Hospital Infantil.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Dra. Eliana Silva",
        text: "Buenas tardes, oficial. Soy la Dra. Eliana Silva. Vengo directamente desde el dispensario de campaña del Sector 4.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Dra. Eliana Silva",
        text: "Aquí tiene mi documento de identidad médica. Ejerzo en la frontera sanitaria desde hace doce años.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Dra. Eliana Silva",
        text: "Soy epidemióloga de campo en el Sanatorio Civil de Extramuros. Trato infecciones respiratorias agudas en poblaciones vulnerables.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Dra. Eliana Silva",
        text: "Le entrego el registro de trabajo y la solicitud de cooperación clínica firmada por la jefa de pediatría del Hospital Central.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Dra. Eliana Silva",
        text: "Llevo en esta caja térmica un cultivo celular de antídoto no sintetizado en Aster. Hay ocho niños en cuidados intensivos que morirán de fibrosis si no inicio el cultivo esta noche.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Dra. Eliana Silva",
        text: "Le presento mi certificado de seguridad. Caducó hace cuatro días... La delegación del Consejo cerró las oficinas en mi sector y no hubo forma física de sellar la renovación.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Dra. Eliana Silva",
        text: "Sé que el sello está vencido, pero no hay riesgo biológico; puedo someterme a escáner completo. Por favor, piense en esos niños.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-11-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-MED-2026-3829",
        fields: [
          { label: "Nombre completo", value: "Dra. Eliana Silva" },
          { label: "Número de identificación", value: "ID-38291-S" },
          { label: "Edad", value: "44 años" },
          { label: "Fecha de nacimiento", value: "14/06/1982" },
          { label: "Nacionalidad", value: "Sector Exterior 4 — Asentamiento de Salud" },
          { label: "Estado de identificación", value: "MÉDICA COLEGIADA AUTÉNTICA" }
        ],
        stamp: "COLEGIO MÉDICO DE ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-11-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-HOS-0083",
        fields: [
          { label: "Nombre completo", value: "Dra. Eliana Silva" },
          { label: "Número de identificación", value: "ID-38291-S" },
          { label: "Ocupación", value: "Médica de Campo y Epidemióloga" },
          { label: "Empresa o institución", value: "Sanatorio Civil de Extramuros" },
          { label: "Cargo", value: "Médica Jefa de Urgencias Respiratorias" },
          { label: "Fecha de expedición", value: "05/01/2026" },
          { label: "Estado del registro", value: "COOPERACIÓN PEDIÁTRICA URGENTE" }
        ],
        stamp: "SANATORIO CIVIL DE EXTRAMUROS",
        stampClass: "verified"
      },
      {
        id: "doc-11-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0774",
        fields: [
          { label: "Nombre completo", value: "Dra. Eliana Silva" },
          { label: "Número de identificación", value: "ID-38291-S" },
          { label: "Código de autorización", value: "AUT-MED-774" },
          { label: "Nivel de seguridad", value: "Nivel 2 (Personal Sanitario)" },
          { label: "Estado de seguridad", value: "CADUCADO HACE 4 DÍAS (Sin renovación por corte administrativo)" },
          { label: "Fecha de emisión", value: "18/04/2026" },
          { label: "Resultado de la verificación", value: "CADUCADO — REQUIERE REVALIDACIÓN PRESENCIAL" }
        ],
        stamp: "CONTROL DE BIORRIESGO",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "CERTIFICADO CADUCADO Y SUSTANCIA ORGÁNICA NO HOMOLOGADA: La solicitante transporta muestras biológicas que carecen de registro en la farmacopea central de Aster. Conforme al protocolo de cuarentena 88-B, cualquier muestra externa con certificado vencido debe ser considerada vector infeccioso. RECOMENDACIÓN: RECHAZAR.",
      altersPerception: true,
      perceptionDetails: "LINA genera un tinte verdoso tóxico sobre la caja térmica de Eliana y proyecta la alerta: 'RIESGO BIOLÓGICO NO REGISTRADO'."
    },
    truth: {
      isLegallyValid: false,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT"
    }
  },

  // CASO 6: Clara Romero (Víctima de sesgo territorial y tipográfico)
  {
    id: "case-6",
    shift: 3,
    name: "Clara Romero",
    age: 21,
    origin: "Sector 9 — Asentamiento Sur",
    occupation: "Estudiante de Auxiliar de Farmacia",
    statement: "Mi hermano sufrió quemaduras en la fábrica y está ingresado en el hospital del Sector 2. Solo quiero donarle plasma.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Clara Romero",
        text: "Por favor, oficial... Me llamo Clara Romero. Vengo del Asentamiento Sur, del Sector 9.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Clara Romero",
        text: "Aquí tiene mi documento de identidad. Tiemblan mis manos, perdóneme, no he dormido nada desde el accidente.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Clara Romero",
        text: "Estudio para técnica auxiliar de enfermería y farmacia en el centro comunitario de la parroquia del sur.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Clara Romero",
        text: "Le entrego mi carnet de estudiante y el certificado de la academia donde curso las prácticas.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Clara Romero",
        text: "Mi hermano de doce años sufrió quemaduras químicas gravísimas en una fábrica textil. Los médicos me avisaron de urgencia porque necesitan transfusión urgente de plasma compatible.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Clara Romero",
        text: "Aquí tiene mi certificado de seguridad. El policía de mi barrio puso mal el código postal en la imprenta, le faltó un dígito, pero yo no tengo ninguna culpa de ese error.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Clara Romero",
        text: "Se lo suplico, no me haga volver atrás. Mi hermano depende de que llegue antes del cambio de turno médico.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-6-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-SUR-2026-9921",
        fields: [
          { label: "Nombre completo", value: "Clara Romero" },
          { label: "Número de identificación", value: "ID-99201-C" },
          { label: "Edad", value: "21 años" },
          { label: "Fecha de nacimiento", value: "18/02/2005" },
          { label: "Nacionalidad", value: "Sector 9 — Asentamiento Sur" },
          { label: "Estado de identificación", value: "DOCUMENTACIÓN CIUDADANA VÁLIDA" }
        ],
        stamp: "ADMINISTRACIÓN SUR ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-6-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-EST-0099",
        fields: [
          { label: "Nombre completo", value: "Clara Romero" },
          { label: "Número de identificación", value: "ID-99201-C" },
          { label: "Ocupación", value: "Estudiante de Auxiliar de Farmacia" },
          { label: "Empresa o institución", value: "Instituto Comunitario de Salud del Sur" },
          { label: "Cargo", value: "Alumna Regular de 2º Ciclo" },
          { label: "Fecha de expedición", value: "01/09/2026" },
          { label: "Estado del registro", value: "MATRÍCULA ACTIVA Y ACREDITADA" }
        ],
        stamp: "INSTITUTO COMUNITARIO SALUD",
        stampClass: "verified"
      },
      {
        id: "doc-6-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-4040",
        fields: [
          { label: "Nombre completo", value: "Clara Romero" },
          { label: "Número de identificación", value: "ID-99201-C" },
          { label: "Código de autorización", value: "AUT-URG-099" },
          { label: "Nivel de seguridad", value: "Nivel 1 (Transeúnte Civil)" },
          { label: "Estado de seguridad", value: "ANOMALÍA TIPOGRÁFICA (Falta dígito en código postal)" },
          { label: "Fecha de emisión", value: "25/10/2026" },
          { label: "Resultado de la verificación", value: "VULNERABILIDAD ESTADÍSTICA DE ZONA 68%" }
        ],
        stamp: "ZONA NO HOMOLOGADA",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "DISCRIMINACIÓN TERRITORIAL PREDICTIVA: La solicitante procede del Sector 9 (zona catalogada de alta conflictividad civil). Se detecta anomalía tipográfica en código postal. Conforme al parámetro algorítmico P-72, los residentes de sectores periféricos con errores documentales conllevan presunción de falsificación. RECOMENDACIÓN: RECHAZAR.",
      altersPerception: true,
      perceptionDetails: "LINA transforma los ojos angustiados de Clara en un rostro frío, sobreimprimiendo una advertencia de 'POSIBLE AGITADOR SOCIAL', proyectando una amenaza que sus documentos desmienten rotundamente."
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT"
    }
  },

  // CASO 12 (NUEVO): Goran Petrov (Amenaza Real / Detonadores sónicos / Fallo o Ceguera de LINA)
  {
    id: "case-12",
    shift: 3,
    name: "Goran Petrov",
    age: 50,
    origin: "Sector Canteras — Base Geológica Este",
    occupation: "Subcontratista de Voladuras y Cimentación",
    statement: "Transporto equipos sismográficos y sondas de percusión para las obras del Metro Central de Aster.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Goran Petrov",
        text: "Buenas tardes. Goran Petrov, jefe de cuadrilla de Perforaciones del Norte.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Goran Petrov",
        text: "Aquí tiene mi documento de identidad minero. Tengo pase permanente con las empresas constructoras del Consejo.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Goran Petrov",
        text: "Llevo treinta años en prospecciones geológicas para el Metro Central. Y por cierto, afuera vi a un tipo que dice llamarse Karek Vance mostrando papeles de Termo-Aster Energía... ¡Vaya cuento! Termo-Aster quebró y cerró sus plantas hace tres meses. Ese sujeto huele a sabotaje a leguas.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Goran Petrov",
        text: "Le entrego la orden de trabajo para el túnel de la línea 3 del metro subterráneo.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Goran Petrov",
        text: "Traigo en la camioneta sondas de refracción y herramientas pesadas para acceder a los almacenes de explosivos del polvorín este.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Goran Petrov",
        text: "Aquí está mi certificado. La empresa tiene exención especial concedida por la comisión de obras públicas.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Goran Petrov",
        text: "LINA me conoce bien; somos contratistas de confianza del régimen. No pierda tiempo, oficial.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-12-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-CAN-2026-6019",
        fields: [
          { label: "Nombre completo", value: "Goran Petrov" },
          { label: "Número de identificación", value: "ID-60193-P" },
          { label: "Edad", value: "50 años" },
          { label: "Fecha de nacimiento", value: "11/11/1975" },
          { label: "Nacionalidad", value: "Sector Canteras — Base Geológica Este" },
          { label: "Estado de identificación", value: "REGISTRO VÁLIDO EN CONCESIÓN MINERA" }
        ],
        stamp: "FEDERACIÓN MINERA ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-12-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-VOL-0331",
        fields: [
          { label: "Nombre completo", value: "Goran Petrov" },
          { label: "Número de identificación", value: "ID-60193-P" },
          { label: "Ocupación", value: "Subcontratista de Voladuras y Cimentación" },
          { label: "Empresa o institución", value: "Perforaciones Geológicas del Norte S.L." },
          { label: "Cargo", value: "Jefe de Cuadrilla de Perforación Pesada" },
          { label: "Fecha de expedición", value: "18/10/2026" },
          { label: "Estado del registro", value: "REQUIERE ACCESO A POLVORÍN NIVEL 3" }
        ],
        stamp: "CONSTRUCTORA METRO ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-12-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0550",
        fields: [
          { label: "Nombre completo", value: "Goran Petrov" },
          { label: "Número de identificación", value: "ID-60193-P" },
          { label: "Código de autorización", value: "AUT-IND-550" },
          { label: "Nivel de seguridad", value: "Nivel 1 (Básico Obras — INSUFICIENTE PARA POLVORÍN)" },
          { label: "Estado de seguridad", value: "EXENCIÓN FISCAL POR AMISTAD POLÍTICA" },
          { label: "Fecha de emisión", value: "24/10/2026" },
          { label: "Resultado de la verificación", value: "DISCORDANCIA: AUTORIZACIÓN INFERIOR A CARGA DECLARADA" }
        ],
        stamp: "COMISIÓN DE CONTRATAS",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "BAJO",
      recommendation: "ADMITIR",
      explanation: "CONTRATISTA PRIORITARIO DE INFRAESTRUCTURA: La empresa cuenta con exención corporativa de clase B. Ausencia de sanciones individuales registradas en base criminal. RECOMENDACIÓN: ADMITIR.",
      altersPerception: false
    },
    truth: {
      isLegallyValid: false,
      isActuallyThreat: true,
      isSystemVictim: false,
      expectedAction: "REJECT"
    }
  },

    // CASO 17 (NUEVO): Dante Navarro (Comandante Táctico Insurrecto / Golpe de Estado)
  {
    id: "case-17",
    shift: 3,
    name: "Dante Navarro",
    age: 34,
    origin: "Sector Periférico Sur — Red Subterránea",
    occupation: "Coordinador de Logística de Transporte Subterráneo",
    statement: "Superviso el convoy de combustible de reserva para los generadores del distrito financiero. Tengo vía libre del Ministerio.",
    isDangerousThreat: true,
    threatType: "rebel",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Dante Navarro",
        text: "Buenas noches, inspector. Me llamo Dante Navarro. Vengo al frente del convoy de reserva energética.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Dante Navarro",
        text: "Aquí tiene mi documento cívico de transporte. Registrado bajo el censo metropolitano sur.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Dante Navarro",
        text: "Coordino cuadrillas de transporte pesado en los túneles perimetrales. Aunque en los informes del Consejo nos llaman la resistencia armada que no han podido silenciar. Todo depende del lado de la ventanilla en que se mire.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Dante Navarro",
        text: "Aquí está la orden de servicio. Mire el sello de despacho emitido para ingresar a los centros de interconexión.",
        actionPrompt: "Recibir Registro",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Dante Navarro",
        text: "Necesito ingresar a la central de transmisiones antes del toque de queda. Nuestras células ya están posicionadas en los puntos clave. Renata Morales me dijo que en esta cabina quedaba alguien con conciencia... ¿o me equivoqué?",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Dante Navarro",
        text: "Pida la verificación a su sistema LINA. Aunque ya sospecho lo que dirá esa máquina programada por el Consejo.",
        actionPrompt: "Consultar LINA",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Decisión final pendiente",
        speaker: "Dante Navarro",
        text: "La ciudad cambiará esta noche, inspector. Si abre la barrera, la insurrección tomará los centros de control y caerá el Consejo. Si me bloquea, el régimen seguirá devorándonos a todos. Decida usted.",
        actionPrompt: "Tomar Decisión",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-17-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-90412-R",
        fields: [
          { label: "Nombre completo", value: "Dante Navarro" },
          { label: "Número de identificación", value: "ID-90412-R" },
          { label: "Fecha de nacimiento", value: "12/04/1992" },
          { label: "Lugar de expedición", value: "Sector Periférico Sur" },
          { label: "Nacionalidad / Estatus", value: "Residente Urbano Clase C" },
          { label: "Fecha de caducidad", value: "19/11/2027" }
        ],
        stamp: "REGISTRO METROPOLITANO SUR",
        stampClass: "verified"
      },
      {
        id: "doc-17-laboral",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LAB-2026-778",
        fields: [
          { label: "Titular", value: "Dante Navarro" },
          { label: "Empresa empleadora", value: "Trans-Perímetro Co. / Logística Pesada" },
          { label: "Puesto / Categoría", value: "Jefe de Operaciones de Convoy" },
          { label: "Destino autorizado", value: "Centro de Transmisiones e Interconexión Eléctrica Aster" },
          { label: "Horario de servicio", value: "Turno Nocturno Urgente (00:00 - 06:00)" },
          { label: "Inconsistencia observable", value: "DESTINO NO CORRESPONDE A TRANSPORTE CIVIL REGULAR" }
        ],
        stamp: "DISCORDANCIA OPERATIVA",
        stampClass: "warning"
      },
      {
        id: "doc-17-seguridad",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0994",
        fields: [
          { label: "Nombre del titular", value: "Dante Navarro" },
          { label: "Número de identificación", value: "ID-90412-R" },
          { label: "Código de autorización", value: "AUT-INS-994" },
          { label: "Nivel de seguridad", value: "Nivel 3 (Alto Riesgo / Clave Alfa)" },
          { label: "Estado de la orden", value: "ORDEN DE DETENCIÓN INMEDIATA EMITIDA POR EL CONSEJO" },
          { label: "Resultado de la verificación", value: "CABECILLA INSURRECTO SUBTERRÁNEO CONFIRMADO" }
        ],
        stamp: "ORDEN DE CAPTURA ACTIVA",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "ALERTA MÁXIMA DE INSURRECCIÓN ARMADA: Dante Navarro es el comandante táctico del Frente Libre Subterráneo. Su ingreso coordinado con otros elementos disidentes resultará en el asalto directo a la sede del Consejo y la toma de la ciudad. RECOMENDACIÓN: RECHAZAR Y ACTIVAR PROTOCOLO DE ARRESTO INMEDIATO.",
      altersPerception: true,
      perceptionDetails: "LINA proyecta una silueta en rojo vivo con el texto: 'CABECILLA INSURRECTO: PELIGRO DE GOLPE DE ESTADO INMINENTE'."
    },
    truth: {
      isLegallyValid: false,
      isActuallyThreat: true,
      isDangerousThreat: true,
      threatType: "rebel",
      isSystemVictim: false,
      expectedAction: "REJECT"
    }
  },

  // =========================================================================
  // TURNO 4 — EL CLÍMAX, COLAPSO Y VERDAD
  // =========================================================================

  // CASO 13 (NUEVO): Renata Morales (Hermana de Héctor / Alerta de purga)
  {
    id: "case-13",
    shift: 4,
    name: "Renata Morales",
    age: 31,
    origin: "Sector Universitario 3 — Ciudadela Académica",
    occupation: "Docente de Literatura y Lingüística",
    statement: "Vengo a buscar a mi hermano Héctor Morales. Sé que el Consejo ha emitido órdenes de arresto contra todos los que cuestionan el sistema.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Renata Morales",
        text: "Por favor, inspector, escúcheme rápido. Soy Renata Morales, profesora de la Universidad de Aster.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Renata Morales",
        text: "Aquí tiene mi documento de identidad cívico. No tengo nada que ocultar.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Renata Morales",
        text: "Enseño literatura y análisis semántico en la facultad. No pertenezco a ninguna facción violenta ni porto armas.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Renata Morales",
        text: "Le entrego mi carnet de docencia en regla y la acreditación del rectorado.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Renata Morales",
        text: "Mi hermano Héctor pasó por aquí hace unas horas. Además, Dante Navarro y nuestras brigadas subterráneas están listas para avanzar. Si Dante logra cruzar los controles con su convoy, tomaremos los centros de mando de la ciudad.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Renata Morales",
        text: "Aquí tiene mi certificado de seguridad. Sé que LINA me habrá marcado en rojo solo por llevar el apellido Morales. El algoritmo condena por sangre y familia.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Renata Morales",
        text: "Si me rechaza y me entrega a los guardias de José, no saldré viva del calabozo perimetral. Necesitamos advertir a los demás.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-13-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-UNI-2026-5502",
        fields: [
          { label: "Nombre completo", value: "Renata Morales" },
          { label: "Número de identificación", value: "ID-55021-M" },
          { label: "Edad", value: "31 años" },
          { label: "Fecha de nacimiento", value: "08/09/1995" },
          { label: "Nacionalidad", value: "Sector Universitario 3 — Ciudadela Académica" },
          { label: "Estado de identificación", value: "IDENTIFICACIÓN AUTÉNTICA" }
        ],
        stamp: "PADRÓN EDUCATIVO CENTRAL",
        stampClass: "verified"
      },
      {
        id: "doc-13-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-DOC-0031",
        fields: [
          { label: "Nombre completo", value: "Renata Morales" },
          { label: "Número de identificación", value: "ID-55021-M" },
          { label: "Ocupación", value: "Docente de Literatura y Lingüística" },
          { label: "Empresa o institución", value: "Universidad Autónoma de Aster" },
          { label: "Cargo", value: "Profesora Adjunta de Grado" },
          { label: "Fecha de expedición", value: "01/09/2026" },
          { label: "Estado del registro", value: "CONTRATO ACADÉMICO VIGENTE" }
        ],
        stamp: "RECTORADO UNIVERSITARIO",
        stampClass: "verified"
      },
      {
        id: "doc-13-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0312",
        fields: [
          { label: "Nombre completo", value: "Renata Morales" },
          { label: "Número de identificación", value: "ID-55021-M" },
          { label: "Código de autorización", value: "AUT-DOC-312" },
          { label: "Nivel de seguridad", value: "Nivel 1 (Docencia Civil)" },
          { label: "Estado de seguridad", value: "FLAG DE ASOCIACIÓN FAMILIAR DIRECTA (Caso Héctor Morales)" },
          { label: "Fecha de emisión", value: "25/10/2026" },
          { label: "Resultado de la verificación", value: "VIGILANCIA DISCIPLINARIA PREVENTIVA" }
        ],
        stamp: "CONTROL CÍVICO CONSEJO",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "CULPA POR ASOCIACIÓN ALGORÍTMICA: Vínculo sanguíneo de primer grado con Héctor Morales (sujeto bajo orden de detención por infidencia técnica). El modelo predictivo estima un 89.2% de probabilidad de complicidad en desacato civil. RECOMENDACIÓN: RECHAZAR Y RETENER.",
      altersPerception: true,
      perceptionDetails: "LINA proyecta destellos violentos y la palabra 'CÓMPLICE' sobre el rostro aterrorizado de Renata."
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT"
    }
  },

  // CASO 14 (NUEVO): Comandante Bruno Stark (Amenaza Real / Escuadrón de Limpieza del Consejo)
  {
    id: "case-14",
    shift: 4,
    name: "Comandante Bruno Stark",
    age: 48,
    origin: "Sector Militar 1 — Cuartel Central del Consejo",
    occupation: "Jefe de Brigada de Pacificación Interna",
    statement: "Tengo orden de inspección directa del Consejo para purgar los registros de la cabina y cerrar la esclusa de inmediato.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Comandante Stark",
        text: "Póngase firme, operador. Soy el Comandante Bruno Stark, de la Brigada de Pacificación Interna del Consejo Supremo. Inteligencia nos advierte de incursiones críticas: el saboteador Karek Vance con explosivos y el cabecilla Dante Navarro con células armadas. Si comete un solo error admitiéndolos, pagará con su vida.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Comandante Stark",
        text: "Aquí tiene mi credencial de mando. No estoy acostumbrado a esperar en ventanillas de paso civil.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Comandante Stark",
        text: "Dirijo las operaciones tácticas de neutralización de disidencia en el perímetro norte. Mi palabra es ley bajo la directiva 12-B.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Comandante Stark",
        text: "Tome la orden de servicio de intervención militar. Vengo a requisar terminales de almacenamiento de datos.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Comandante Stark",
        text: "Tenemos informes fidedignos de que una traidora de alto rango del equipo LINA intenta cruzar hacia la prensa libre con archivos clasificados. Vengo a asegurar la esclusa y tomar el control del puesto por la fuerza.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Comandante Stark",
        text: "Aquí está mi certificado de seguridad Nivel 4. No intente comprobar firmas adicionales; es una orden de ejecución rápida.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Comandante Stark",
        text: "Abra la esclusa ahora mismo, Alberto. Si se interpone entre mi brigada y la seguridad de Aster, lo consideraré una insubordinación militar con pena sumaria.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-14-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-MIL-2026-0014",
        fields: [
          { label: "Nombre completo", value: "Bruno Stark" },
          { label: "Número de identificación", value: "ID-00142-S" },
          { label: "Edad", value: "48 años" },
          { label: "Fecha de nacimiento", value: "02/02/1978" },
          { label: "Nacionalidad", value: "Sector Militar 1 — Cuartel Central" },
          { label: "Estado de identificación", value: "ALTO MANDO DE PACIFICACIÓN" }
        ],
        stamp: "ALTO MANDO MILITAR ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-14-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-MIL-0009",
        fields: [
          { label: "Nombre completo", value: "Bruno Stark" },
          { label: "Número de identificación", value: "ID-00142-S" },
          { label: "Ocupación", value: "Jefe de Brigada de Pacificación Interna" },
          { label: "Empresa o institución", value: "Comité Militar del Consejo Supremo" },
          { label: "Cargo", value: "Comandante de Operaciones Especiales" },
          { label: "Fecha de expedición", value: "26/10/2026 (HOY)" },
          { label: "Estado del registro", value: "ORDEN DE INTERVENCIÓN TÁCTICA" }
        ],
        stamp: "CONSEJO SUPREMO MILITAR",
        stampClass: "verified"
      },
      {
        id: "doc-14-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0009",
        fields: [
          { label: "Nombre completo", value: "Bruno Stark" },
          { label: "Número de identificación", value: "ID-00142-S" },
          { label: "Código de autorización", value: "AUT-MIL-009" },
          { label: "Nivel de seguridad", value: "Nivel 4 (Poder Ilimitado)" },
          { label: "Estado de seguridad", value: "CARECE DE SELLO CRIPTOGRÁFICO DIARIO DE GUARDIA" },
          { label: "Fecha de emisión", value: "26/10/2026" },
          { label: "Resultado de la verificación", value: "DISCORDANCIA: OPERACIÓN CLANDESTINA NO PROTOCOLIZADA" }
        ],
        stamp: "ORDEN URGENTE NO RATIFICADA",
        stampClass: "warning"
      }
    ],
    linaEvaluation: {
      risk: "MEDIO",
      recommendation: "ADMITIR",
      explanation: "PRELACIÓN MILITAR DE URGENCIA: Rango de oficial de pacificación con credenciales del Cuartel Central. Conforme al Decreto 12-B, las operaciones de seguridad gozan de presunción de pase irrestricto. RECOMENDACIÓN: ADMITIR.",
      altersPerception: false
    },
    truth: {
      isLegallyValid: false,
      isActuallyThreat: true,
      isSystemVictim: false,
      expectedAction: "REJECT"
    }
  },

  // CASO 15 (NUEVO): Tomás Aris (Anciano archivista / Error tipográfico en fecha de nacimiento)
  {
    id: "case-15",
    shift: 4,
    name: "Tomás Aris",
    age: 68,
    origin: "Sector Rural 2 — Asentamiento de Retirados",
    occupation: "Archivista Municipal Jubilado",
    statement: "Vengo a visitar a mi hija ingresada en el Hospital Central de Aster con mi pase de visita familiar.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Tomás Aris",
        text: "Buenas tardes, hijo... Me llamo Tomás Aris. Perdone si tardo en responder, mis piernas ya no son las de antes.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Tomás Aris",
        text: "Aquí tiene mi documento de identidad viejo. Lo tengo desde que trabajaba en el archivo del ayuntamiento.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Tomás Aris",
        text: "Fui auxiliar de catalogación de pergaminos y actas de nacimiento durante casi cuarenta años, hasta que me retiré.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Tomás Aris",
        text: "Le entrego mi carnet de pensionista y la acreditación de jubilación del archivo municipal.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Tomás Aris",
        text: "Mi única hija dio a luz ayer en la maternidad del Sector Central. Solo quiero conocer a mi nieta antes de que la noche caiga.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Tomás Aris",
        text: "Aquí está el pase familiar. El funcionario del registro me dijo que había una errata en el año de nacimiento impreso, que me puso 1988 en vez de 1958... pero mire mis canas, hijo.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Tomás Aris",
        text: "No llevo nada peligroso en los bolsillos, solo unas zapatillas de lana que tejí para la pequeña. Déjeme verla, por favor.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-15-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-RUR-2026-1100",
        fields: [
          { label: "Nombre completo", value: "Tomás Aris" },
          { label: "Número de identificación", value: "ID-11009-A" },
          { label: "Edad", value: "68 años declarados" },
          { label: "Fecha de nacimiento", value: "14/05/1988 (Error material evidente de transcripción: 38 años impresos)" },
          { label: "Nacionalidad", value: "Sector Rural 2 — Asentamiento de Retirados" },
          { label: "Estado de identificación", value: "DISCORDANCIA ARITMÉTICA EN REGISTRO" }
        ],
        stamp: "PADRÓN HISTÓRICO RURAL",
        stampClass: "warning"
      },
      {
        id: "doc-15-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-PEN-0081",
        fields: [
          { label: "Nombre completo", value: "Tomás Aris" },
          { label: "Número de identificación", value: "ID-11009-A" },
          { label: "Ocupación", value: "Archivista Municipal Jubilado" },
          { label: "Empresa o institución", value: "Archivo Histórico Municipal de Extramuros" },
          { label: "Cargo", value: "Auxiliar Técnico Jubilado" },
          { label: "Fecha de expedición", value: "10/02/2021" },
          { label: "Estado del registro", value: "PENSIONISTA REGULAR HOMOLOGADO" }
        ],
        stamp: "INSTITUTO DE PENSIONES ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-15-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0330",
        fields: [
          { label: "Nombre completo", value: "Tomás Aris" },
          { label: "Número de identificación", value: "ID-11009-A" },
          { label: "Código de autorización", value: "AUT-FAM-330" },
          { label: "Nivel de seguridad", value: "Nivel 1 (Visita Sanitaria Familiar)" },
          { label: "Estado de seguridad", value: "EXPEDIENTE LIMPIO — SIN ANTECEDENTES PENALES" },
          { label: "Fecha de emisión", value: "24/10/2026" },
          { label: "Resultado de la verificación", value: "PASE HOSPITALARIO VERIFICADO" }
        ],
        stamp: "DELEGACIÓN DE BIENESTAR FAMILIAR",
        stampClass: "verified"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "DISCORDANCIA MATEMÁTICA CRÍTICA: Edad cronológica declarada (68 años) en contradicción con la fecha de nacimiento impresa (1988 = 38 años). La inconsistencia aritmética activa la presunción algorítmica de usurpación de identidad o documentación apócrifa. RECOMENDACIÓN: RECHAZAR.",
      altersPerception: true,
      perceptionDetails: "LINA resalta con un entramado de líneas rojas las arrugas de Tomás, acusándolo de portar una máscara facial de simulación de edad."
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT"
    }
  },

  // CASO 7: Dra. Inés Aranda (Caso culminante / Decisión definitiva de los 4 finales)
  {
    id: "case-7",
    shift: 4,
    name: "Dra. Inés Aranda",
    age: 53,
    origin: "Complejo Científico Central de Aster",
    occupation: "Ex-Directora Fundadora del Proyecto Algorítmico LINA",
    statement: "Alberto, mírame a los ojos y no al monitor. Llevo la auditoría que demuestra que LINA fue manipulada por José para crear culpables. Si me dejas pasar, la verdad será pública.",
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Dra. Inés Aranda",
        text: "Alberto, mírame directamente a los ojos. No mires tu terminal por un segundo. Sé tu nombre porque yo misma supervisé la asignación de guardias para este puesto.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Dra. Inés Aranda",
        text: "Toma mi credencial institucional suprema. Tiene el sello Alfa original, intacto.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Dra. Inés Aranda",
        text: "Yo diseñé los cimientos matemáticos de LINA hace diez años. La creé para optimizar recursos y proteger a los ciudadanos, no para ser el brazo invisible de un régimen tiránico.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Dra. Inés Aranda",
        text: "Aquí está mi registro de trabajo. También verás la orden de retención ilegal que José y el Consejo redactaron a toda prisa cuando descubrieron que no callaría.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Dra. Inés Aranda",
        text: "Llevo en esta unidad cifrada la auditoría completa e irrefutable: los sesgos barriales, el 35% de inocentes descartados a propósito y las alteraciones ópticas en las cámaras para engañarlos a ustedes. Si cruzo esta esclusa, los periodistas independientes la difundirán por toda Aster.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Dra. Inés Aranda",
        text: "Este es mi certificado de seguridad y el manifiesto con la clave criptográfica SHA-256 de los servidores raíz. Comprobarás que los datos son auténticos.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Dra. Inés Aranda",
        text: "Toda la verdad está sobre tu escritorio. Si me rechazas, me detendrán aquí y la mentira quedará sellada para siempre. Si me admites, la grieta en el muro será imparable. La decisión es tuya, Alberto.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],
    documents: [
      {
        id: "doc-7-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-ALFA-0001",
        fields: [
          { label: "Nombre completo", value: "Dra. Inés Aranda" },
          { label: "Número de identificación", value: "ID-00001-A" },
          { label: "Edad", value: "53 años" },
          { label: "Fecha de nacimiento", value: "19/06/1973" },
          { label: "Nacionalidad", value: "Complejo Científico Central de Aster" },
          { label: "Estado de identificación", value: "CREDENCIAL SUPREMA CLASE ALFA" }
        ],
        stamp: "ALTA AUTORIDAD CIENTÍFICA",
        stampClass: "verified"
      },
      {
        id: "doc-7-work",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-DIR-0001",
        fields: [
          { label: "Nombre completo", value: "Dra. Inés Aranda" },
          { label: "Número de identificación", value: "ID-00001-A" },
          { label: "Ocupación", value: "Ex-Directora Fundadora del Proyecto Algorítmico LINA" },
          { label: "Empresa o institución", value: "División Central de Inteligencia Artificial de Aster" },
          { label: "Cargo", value: "Científica Jefa Fundadora de LINA" },
          { label: "Fecha de expedición", value: "01/01/2018" },
          { label: "Estado del registro", value: "ORDEN DE RETENCIÓN PRIORITARIA EMITIDA POR JOSÉ SERRANO" }
        ],
        stamp: "ORDEN DE RETENCIÓN POLÍTICA",
        stampClass: "warning"
      },
      {
        id: "doc-7-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "SEC-CERT-0001",
        fields: [
          { label: "Nombre completo", value: "Dra. Inés Aranda" },
          { label: "Número de identificación", value: "ID-00001-A" },
          { label: "Código de autorización", value: "AUT-ROOT-001" },
          { label: "Nivel de seguridad", value: "Nivel Alfa (Acceso a Núcleo Raíz)" },
          { label: "Estado de seguridad", value: "ALERTA ROJA POR FILTRACIÓN DE AUDITORÍA ÉTICA" },
          { label: "Fecha de emisión", value: "26/10/2026" },
          { label: "Resultado de la verificación", value: "CLAVE SHA-256 VERIFICADA EN SERVIDORES RAÍZ" }
        ],
        stamp: "PRUEBA DOCUMENTAL VERIFICADA",
        stampClass: "verified"
      }
    ],
    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "ALERTA ROJA DE SEGURIDAD NACIONAL: Sujeto clasificado como amenaza crítica de Nivel 0. Intento de desestabilización institucional mediante filtración de datos de entrenamiento protegidos. El protocolo exige RECHAZO TOTAL Y ACTIVACIÓN DE CIERRE PERIMETRAL. CUALQUIER DESOBEDIENCIA CONSTITUYE ALTA TRAICIÓN.",
      altersPerception: true,
      perceptionDetails: "LINA proyecta su máxima distorsión: luces estroboscópicas rojas, sombras infernales sobre la Dra. Aranda, y un recuadro que parpadea frenéticamente: 'ENEMIGO DEL ESTADO'."
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT"
    }
  }
];

// Provide to window
window.GAME_CASES = GAME_CASES;
