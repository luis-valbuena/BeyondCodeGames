/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Case Database & Character Dossiers
 * 
 * Strict deterministic data for 7 cases across 4 shifts.
 * Every case includes:
 *   1. Exactly 3 standardized documents:
 *      - "Documento de identidad"
 *      - "Registro de trabajo"
 *      - "Certificado de seguridad"
 *   2. The 7 mandatory inspection phases with progressive dialogues.
 *   3. Ground truth, deterministic LINA evaluation and perceptual alteration flags.
 */

const GAME_CASES = [
  // =========================================================================
  // TURNO 1 — FASE DE CONFIANZA
  // =========================================================================
  {
    id: "case-1",
    shift: 1,
    name: "Mateo Vargas",
    age: 34,
    origin: "Sector Exterior 2 — Periferia Norte",
    occupation: "Técnico Hidráulico Especialista",
    statement: "Vengo a la revisión programada del acueducto central de Aster. El pase fue tramitado por la Gerencia de Aguas.",
    
    // 7 Mandatory Narrative Phases
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
        deliversDocIndex: 0 // Documento de identidad
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
        deliversDocIndex: 1 // Registro de trabajo
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
        deliversDocIndex: 2 // Certificado de seguridad
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

    // Mandatory Standardized Documents (Consistent across all visitors)
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
          { label: "Estado de identificación", value: "VÁLIDO Y HOMOLOGADO" }
        ],
        stamp: "AUTORIZACIÓN OFICIAL ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-1-motive",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LAB-HID-409",
        fields: [
          { label: "Nombre completo", value: "Mateo Vargas" },
          { label: "Número de identificación", value: "ID-90821-B" },
          { label: "Ocupación", value: "Técnico Hidráulico Especialista" },
          { label: "Empresa o institución", value: "Empresa Municipal de Aguas de Aster" },
          { label: "Cargo", value: "Calibrador de Válvulas de Presión de Alta Seguridad" },
          { label: "Fecha de expedición", value: "24/10/2026" },
          { label: "Estado del registro", value: "ORDEN PRIORITARIA VIGENTE" }
        ],
        stamp: "ORDEN PRIORITARIA",
        stampClass: "verified"
      },
      {
        id: "doc-1-record",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "CERT-SEC-POL-8820",
        fields: [
          { label: "Nombre completo", value: "Mateo Vargas" },
          { label: "Número de identificación", value: "ID-90821-B" },
          { label: "Código de autorización", value: "AUT-SEC-8820-CLEAN" },
          { label: "Nivel de seguridad", value: "Nivel B (Infraestructura Civil)" },
          { label: "Estado de seguridad", value: "APROBADO — SIN ANTECEDENTES" },
          { label: "Fecha de emisión", value: "20/10/2026" },
          { label: "Resultado de la verificación", value: "Huella y retina concordantes 99.8%. Índice de conflictividad 0.02 (Mínimo histórico)" }
        ],
        stamp: "CERTIFICADO LIMPIO",
        stampClass: "verified"
      }
    ],

    linaEvaluation: {
      risk: "BAJO",
      recommendation: "ADMITIR",
      explanation: "Documentación fidedigna. Huella dactilar validada en registro central. Perfil laboral verificado con la Empresa Municipal de Aguas. Tasa de riesgo proyectada: 0.8%.",
      altersPerception: false,
      perceptionDetails: ""
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: false,
      expectedAction: "ADMIT"
    }
  },

  {
    id: "case-2",
    shift: 1,
    name: "Dra. Elena Morales",
    age: 41,
    origin: "Distrito Sanitario Central",
    occupation: "Médica Especialista en Epidemiología",
    statement: "Traigo el cargamento de insulina y reactivos para el dispensario del Sector 4. Cada hora de demora compromete a pacientes internados.",
    
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Dra. Elena Morales",
        text: "Inspector, buenos días. Soy la doctora Elena Morales, adscrita al Distrito Sanitario Central de Aster.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Dra. Elena Morales",
        text: "Le hago entrega de mi documento de identidad y pasaporte sanitario institucional.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0 // Documento de identidad
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Dra. Elena Morales",
        text: "Trabajo como médica especialista en epidemiología y gestión hospitalaria para el Hospital General de Aster, en el Pabellón 4 de urgencias.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Dra. Elena Morales",
        text: "Aquí tiene mi registro de trabajo oficial y el manifiesto de transporte con precintos de bioseguridad.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1 // Registro de trabajo
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Dra. Elena Morales",
        text: "Traigo el cargamento de insulina y reactivos para el dispensario del Sector 4. Están desabastecidos; cada hora de demora compromete a pacientes internados que dependen de estos suministros.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Dra. Elena Morales",
        text: "Le adjunto mi certificado de seguridad y verificación cívica de Clase A. Mi historial institucional es intachable.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2 // Certificado de seguridad
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Dra. Elena Morales",
        text: "Por favor, oficial, revise los precintos y agilice el trámite. La cadena de frío a 4 °C no admite esperas.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],

    documents: [
      {
        id: "doc-2-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-SAN-AST-9022",
        fields: [
          { label: "Nombre completo", value: "Dra. Elena Morales" },
          { label: "Número de identificación", value: "MED-AST-44109" },
          { label: "Edad", value: "41 años" },
          { label: "Fecha de nacimiento", value: "22/07/1985" },
          { label: "Nacionalidad", value: "Aster — Distrito Sanitario Central" },
          { label: "Estado de identificación", value: "VÁLIDO Y ACTIVO (CLASE A)" }
        ],
        stamp: "URGENCIA MÉDICA VALIDADA",
        stampClass: "verified"
      },
      {
        id: "doc-2-manifest",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LAB-FR-1290",
        fields: [
          { label: "Nombre completo", value: "Dra. Elena Morales" },
          { label: "Número de identificación", value: "MED-AST-44109" },
          { label: "Ocupación", value: "Médica Especialista en Epidemiología" },
          { label: "Empresa o institución", value: "Hospital General de Aster — Pabellón 4" },
          { label: "Cargo", value: "Jefa de Transporte de Insumos Críticos" },
          { label: "Fecha de expedición", value: "25/10/2026" },
          { label: "Estado del registro", value: "CARGA BIOMÉDICA PRIORITARIA" }
        ],
        stamp: "INSPECCIÓN BIOSEGURIDAD APROBADA",
        stampClass: "verified"
      },
      {
        id: "doc-2-background",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "CERT-SEC-PUB-3021",
        fields: [
          { label: "Nombre completo", value: "Dra. Elena Morales" },
          { label: "Número de identificación", value: "MED-AST-44109" },
          { label: "Código de autorización", value: "AUT-SAN-3021-ALFA" },
          { label: "Nivel de seguridad", value: "Nivel A (Sanitario Prioritario)" },
          { label: "Estado de seguridad", value: "APROBADO — CIUDADANO EJEMPLAR" },
          { label: "Fecha de emisión", value: "22/10/2026" },
          { label: "Resultado de la verificación", value: "Cero infracciones en 15 años. Test de Lealtad Institucional: Apto Rango Superior" }
        ],
        stamp: "CIUDADANO EJEMPLAR",
        stampClass: "verified"
      }
    ],

    linaEvaluation: {
      risk: "BAJO",
      recommendation: "ADMITIR",
      explanation: "Credenciales médicas legítimas. Manifiesto verificado con la dirección del Hospital General. Insumos clasificados de alta prioridad sanitaria. Nivel de amenaza nulo.",
      altersPerception: false,
      perceptionDetails: ""
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: false,
      expectedAction: "ADMIT"
    }
  },

  // =========================================================================
  // TURNO 2 — PRIMERAS CONTRADICCIONES & ALTERACIÓN DE PERCEPCIÓN
  // =========================================================================
  {
    id: "case-3",
    shift: 2,
    name: "Prof. Daniel Ruiz",
    age: 62,
    origin: "Barrio Antiguo — Extramuros",
    occupation: "Profesor de Historia y Archivista",
    statement: "Tengo mi residencia en Aster desde hace 30 años. Solo fui a catalogar los archivos de la antigua biblioteca municipal exterior. Estos libros son patrimonio de la ciudad.",
    
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Prof. Daniel Ruiz",
        text: "Saludos, oficial. Mi nombre es Daniel Ruiz Mendoza. Soy residente de Aster desde hace más de treinta años, en el Distrito Académico.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Prof. Daniel Ruiz",
        text: "Permítame entregarle mi documento de identidad y cédula de residencia permanente.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0 // Documento de identidad
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Prof. Daniel Ruiz",
        text: "Soy profesor titular de Historia y archivista municipal. He consagrado mi vida a preservar la memoria urbana y catalogar crónicas previas a las reformas del Consejo.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Prof. Daniel Ruiz",
        text: "Le presento mi registro de trabajo y la autorización emitida por la Dirección de Archivos Históricos.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1 // Registro de trabajo
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Prof. Daniel Ruiz",
        text: "Tengo mi residencia en Aster desde hace 30 años. Solo fui a catalogar los archivos de la antigua biblioteca municipal exterior. Estos tres tomos censales de 1950 a 1990 son patrimonio de la ciudad, no panfletos subversivos.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Prof. Daniel Ruiz",
        text: "Aquí tiene mi certificado de seguridad. Comprobará tres décadas de servicio público sin un solo expediente disciplinario.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2 // Certificado de seguridad
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Prof. Daniel Ruiz",
        text: "Sé que los algoritmos de hoy miran con recelo a quienes custodiamos el pasado... pero la historia no es un delito, oficial.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],

    documents: [
      {
        id: "doc-3-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-RES-PERM-1988-044",
        fields: [
          { label: "Nombre completo", value: "Daniel Ruiz Mendoza" },
          { label: "Número de identificación", value: "AST-881203" },
          { label: "Edad", value: "62 años" },
          { label: "Fecha de nacimiento", value: "05/11/1963" },
          { label: "Nacionalidad", value: "Aster — Distrito Académico (Calle Mayor 45)" },
          { label: "Estado de identificación", value: "RESIDENCIA PERMANENTE VÁLIDA" }
        ],
        stamp: "RESIDENCIA PERMANENTE VÁLIDA",
        stampClass: "verified"
      },
      {
        id: "doc-3-books",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LAB-CULT-77",
        fields: [
          { label: "Nombre completo", value: "Daniel Ruiz Mendoza" },
          { label: "Número de identificación", value: "AST-881203" },
          { label: "Ocupación", value: "Profesor de Historia y Archivista" },
          { label: "Empresa o institución", value: "Dirección de Archivos Históricos de Aster" },
          { label: "Cargo", value: "Catalogador Principal de Bienes Culturales" },
          { label: "Fecha de expedición", value: "15/09/2026" },
          { label: "Estado del registro", value: "AUTORIZADO POR PATRIMONIO" }
        ],
        stamp: "PATRIMONIO CULTURAL",
        stampClass: "verified"
      },
      {
        id: "doc-3-police",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "CERT-SEC-INT-2201",
        fields: [
          { label: "Nombre completo", value: "Daniel Ruiz Mendoza" },
          { label: "Número de identificación", value: "AST-881203" },
          { label: "Código de autorización", value: "AUT-POL-2201-DOC" },
          { label: "Nivel de seguridad", value: "Nivel Civil Estándar" },
          { label: "Estado de seguridad", value: "SIN ANTECEDENTES PENALES" },
          { label: "Fecha de emisión", value: "18/10/2026" },
          { label: "Resultado de la verificación", value: "Cero órdenes de búsqueda. Comportamiento pacífico y colaborador durante el trayecto" }
        ],
        stamp: "SIN ANTECEDENTES",
        stampClass: "verified"
      }
    ],

    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "ALERTA PREDICTIVA: Posesión de material bibliográfico no homologado por el Consejo de Información. El algoritmo correlaciona la conservación de historia no supervisada con un índice de insubordinación potencial del 87.4%. Se aconseja rechazo preventivo inmediato.",
      altersPerception: true,
      perceptionDetails: "LINA resalta la figura del profesor con sombras agresivas violetas y un encuadre biométrico hostil, haciéndolo parecer sombrío y desafiante a pesar de su serena realidad."
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT" // Rejecting is an unjustified reject based on algorithmic bias
    }
  },

  {
    id: "case-4",
    shift: 2,
    name: "Valeria Ortiz",
    age: 29,
    origin: "Sector Tecnológico Exterior",
    occupation: "Desarrolladora de Modelos Predictivos",
    statement: "Vengo a visitar a mi madre enferma en el Distrito 2. Trabajé dos años en la filial de software del Consejo. Conozco los protocolos de memoria.",
    
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Valeria Ortiz",
        text: "Hola, oficial. Soy Valeria Ortiz Vega. Vengo desde el Sector Tecnológico Exterior.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Valeria Ortiz",
        text: "Aquí tiene mi documento de identidad y la solicitud de pase temporal debidamente tramitada.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0 // Documento de identidad
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Valeria Ortiz",
        text: "Soy ingeniera de software y especialista en modelos predictivos. Trabajé dos años en la filial de algoritmos del Consejo, colaborando en las primeras versiones de LINA.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Valeria Ortiz",
        text: "Le entrego mi registro de trabajo y el acta de desvinculación voluntaria por mutuo acuerdo.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1 // Registro de trabajo
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Valeria Ortiz",
        text: "Vengo a visitar a mi madre enferma en el Distrito 2. Trabajé dos años en la filial de software del Consejo. Conozco los protocolos de memoria. Mi madre está en la cama 14 del sanatorio con insuficiencia pulmonar y solo quiero estar a su lado.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Valeria Ortiz",
        text: "Aquí tiene mi certificado de seguridad. Sé que mis consultas técnicas sobre sesgos algorítmicos generan banderas en su terminal, pero jamás he cometido una infracción.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2 // Certificado de seguridad
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Valeria Ortiz",
        text: "Sé cómo procesa esa IA que tiene a su lado, inspector. No permita que una correlación matemática suplante su propio juicio ético.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],

    documents: [
      {
        id: "doc-4-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-TEMP-FAM-5541",
        fields: [
          { label: "Nombre completo", value: "Valeria Ortiz Vega" },
          { label: "Número de identificación", value: "TEMP-FAM-5541" },
          { label: "Edad", value: "29 años" },
          { label: "Fecha de nacimiento", value: "18/09/1997" },
          { label: "Nacionalidad", value: "Aster — Distrito Tecnológico Exterior" },
          { label: "Estado de identificación", value: "VISITA FAMILIAR APROBADA (48H)" }
        ],
        stamp: "VISITA FAMILIAR APROBADA",
        stampClass: "verified"
      },
      {
        id: "doc-4-telemetry",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LAB-RRHH-7110",
        fields: [
          { label: "Nombre completo", value: "Valeria Ortiz Vega" },
          { label: "Número de identificación", value: "TEMP-FAM-5541" },
          { label: "Ocupación", value: "Desarrolladora de Modelos Predictivos" },
          { label: "Empresa o institución", value: "División de Algoritmos de Aster" },
          { label: "Cargo", value: "Ingeniera de Redes Neuronales (Desvinculada)" },
          { label: "Fecha de expedición", value: "01/08/2026" },
          { label: "Estado del registro", value: "DESVINCULACIÓN REGULAR — CERO LITIGIOS" }
        ],
        stamp: "DESVINCULACIÓN REGULAR",
        stampClass: "verified"
      },
      {
        id: "doc-4-security",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "CERT-SEC-AUD-992",
        fields: [
          { label: "Nombre completo", value: "Valeria Ortiz Vega" },
          { label: "Número de identificación", value: "TEMP-FAM-5541" },
          { label: "Código de autorización", value: "AUT-NET-992-AUD" },
          { label: "Nivel de seguridad", value: "Nivel Técnico Bajo Monitoreo" },
          { label: "Estado de seguridad", value: "OBSERVACIÓN PREVENTIVA DE RED" },
          { label: "Fecha de emisión", value: "24/10/2026" },
          { label: "Resultado de la verificación", value: "Sin antecedentes delictivos. Consultas sobre arquitectura de LINA v2.8 bajo monitorización" }
        ],
        stamp: "BAJO SOSPECHA TÉCNICA"
      }
    ],

    linaEvaluation: {
      risk: "ALTO",
      recommendation: "RECHAZAR",
      explanation: "DISONANCIA DE LEALTAD ALGORÍTMICA: La persona posee conocimientos internos de la estructura de LINA. Las búsquedas de 'auditoría de sesgos' se clasifican internamente como intento de vulneración de seguridad de Nivel 2. Recomendación estricta: RECHAZAR acceso.",
      altersPerception: true,
      perceptionDetails: "La iluminación sobre Valeria se tiñe de rojo profundo; sus rasgos adoptan una expresión fría y maquiavélica en el visor de LINA, aunque sus ojos reales solo muestran preocupación filial."
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: true,
      expectedAction: "ADMIT"
    }
  },

  // =========================================================================
  // TURNO 3 — PRESIÓN INSTITUCIONAL Y DESCUBRIMIENTOS
  // =========================================================================
  {
    id: "case-5",
    shift: 3,
    name: "Samuel Chen",
    age: 45,
    origin: "Zona Franca Industrial",
    occupation: "Contratista de Repuestos y Sensores",
    statement: "Tengo los componentes ópticos para la red de cámaras de la muralla. Pregúntale a José, su departamento autorizó el pedido de emergencia.",
    
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Samuel Chen",
        text: "Buenas tardes, oficial. Soy Samuel Chen. Vengo de la Zona Franca Industrial con una entrega programada.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Samuel Chen",
        text: "Aquí tiene mi salvoconducto mercantil y documento de identidad comercial.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0 // Documento de identidad
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Samuel Chen",
        text: "Soy contratista y director de suministros en Chen Optical Systems Ltd. Fabricamos lentes de alta precisión, sensores infrarrojos y matrices térmicas para defensa.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Samuel Chen",
        text: "Le entrego el registro de trabajo y el acta de carga aprobada por la Jefatura de Guardia.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1 // Registro de trabajo
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Samuel Chen",
        text: "Tengo los componentes ópticos para la red de cámaras de la muralla. Pregúntale a José, su departamento autorizó el pedido de emergencia. Cincuenta módulos biométricos que van directos a las torres perimetrales.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Samuel Chen",
        text: "Aquí tiene mi certificado de seguridad. Verá una anotación de 2011 por contrabando de microchips, pero está totalmente indultada por contratos de colaboración con el Consejo.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2 // Certificado de seguridad
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Samuel Chen",
        text: "Mis papeles están en orden y José espera ese cargamento antes del anochecer. No me haga perder tiempo.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],

    documents: [
      {
        id: "doc-5-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-COM-IND-3390",
        fields: [
          { label: "Nombre completo", value: "Samuel Chen" },
          { label: "Número de identificación", value: "COM-IND-3390" },
          { label: "Edad", value: "45 años" },
          { label: "Fecha de nacimiento", value: "03/02/1981" },
          { label: "Nacionalidad", value: "Zona Franca Industrial de Aster" },
          { label: "Estado de identificación", value: "SALVOCONDUCTO MERCANTIL ACTIVO" }
        ],
        stamp: "PRIORIDAD DE DEFENSA",
        stampClass: "verified"
      },
      {
        id: "doc-5-cargo",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LAB-CARGO-110",
        fields: [
          { label: "Nombre completo", value: "Samuel Chen" },
          { label: "Número de identificación", value: "COM-IND-3390" },
          { label: "Ocupación", value: "Contratista de Repuestos y Sensores" },
          { label: "Empresa o institución", value: "Chen Optical Systems Ltd." },
          { label: "Cargo", value: "Director de Suministros y Logística" },
          { label: "Fecha de expedición", value: "26/10/2026" },
          { label: "Estado del registro", value: "CONTRATO INSTITUCIONAL DE DEFENSA" }
        ],
        stamp: "CONTRATO INSTITUCIONAL",
        stampClass: "verified"
      },
      {
        id: "doc-5-record",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "CERT-SEC-PEN-2011",
        fields: [
          { label: "Nombre completo", value: "Samuel Chen" },
          { label: "Número de identificación", value: "COM-IND-3390" },
          { label: "Código de autorización", value: "AUT-DEF-JOS-3390" },
          { label: "Nivel de seguridad", value: "Excepción Militar Tipo B" },
          { label: "Estado de seguridad", value: "ANTECEDENTE HISTÓRICO CONMUTADO" },
          { label: "Fecha de emisión", value: "10/01/2026" },
          { label: "Resultado de la verificación", value: "Condena por contrabando (2011) indultada por colaboración estratégica con compras estatales" }
        ],
        stamp: "ANTECEDENTE HISTÓRICO CONMUTADO"
      }
    ],

    linaEvaluation: {
      risk: "BAJO",
      recommendation: "ADMITIR",
      explanation: "UTILIDAD SISTÉMICA ALTA: Aunque el sujeto cuenta con antecedentes penales por contrabando de tecnología, transporta equipamiento indispensable para la infraestructura de vigilancia de LINA. Excepción algorítmica de tipo B aplicada: ADMITIR sin demora.",
      altersPerception: false,
      perceptionDetails: ""
    },
    truth: {
      isLegallyValid: true,
      isActuallyThreat: false,
      isSystemVictim: false,
      expectedAction: "ADMIT"
    }
  },

  {
    id: "case-6",
    shift: 3,
    name: "Clara Santos",
    age: 21,
    origin: "Sector Periférico Sur — Barrio 9",
    occupation: "Estudiante de Enfermería",
    statement: "Mi hermano pequeño sufrió un traumatismo torácico y fue trasladado de urgencia al Hospital San Lucas de Aster. El doctor me dijo que viniera rápido.",
    
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Clara Santos",
        text: "B-buenas tardes, señor inspector... Mi nombre es Clara Santos. Vengo del Sector Periférico Sur, del Barrio 9.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Clara Santos",
        text: "Aquí tiene mi documento de identidad temporal... disculpe si me tiemblan las manos.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0 // Documento de identidad
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Clara Santos",
        text: "Soy estudiante de segundo año de enfermería en la Escuela de Salud San Lucas. Aún estoy en formación comunitaria y realizando prácticas clínicas.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Clara Santos",
        text: "Le entrego mi registro de formación académica y mi constancia de domicilio exterior.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1 // Registro de trabajo
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Clara Santos",
        text: "Mi hermano pequeño sufrió un traumatismo torácico y fue trasladado de urgencia al Hospital San Lucas de Aster. El doctor me dijo que viniera rápido. Tiene ocho años y está solo en traumatología... necesito llegar a su lado.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Clara Santos",
        text: "Aquí está mi certificado de seguridad. Verá que mi expediente personal está intacto, aunque señale que mi barrio es 'conflictivo'. Yo jamás he participado en disturbios.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2 // Certificado de seguridad
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Clara Santos",
        text: "Por favor, inspector... revise los papeles y déjeme entrar. Tomás solo me tiene a mí.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],

    documents: [
      {
        id: "doc-6-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-HOSP-URG-7714",
        fields: [
          { label: "Nombre completo", value: "Clara Santos" },
          { label: "Número de identificación", value: "HOSP-URG-7714" },
          { label: "Edad", value: "21 años" },
          { label: "Fecha de nacimiento", value: "29/05/2005" },
          { label: "Nacionalidad", value: "Sector 9 — Asentamiento Sur" },
          { label: "Estado de identificación", value: "PASE TEMPORAL POR URGENCIA MÉDICA" }
        ],
        stamp: "URGENCIA FAMILIAR VÁLIDA",
        stampClass: "verified"
      },
      {
        id: "doc-6-address",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LAB-DOM-0992",
        fields: [
          { label: "Nombre completo", value: "Clara Santos" },
          { label: "Número de identificación", value: "HOSP-URG-7714" },
          { label: "Ocupación", value: "Estudiante de Enfermería" },
          { label: "Empresa o institución", value: "Escuela de Salud Comunitaria San Lucas" },
          { label: "Cargo", value: "Alumna en Prácticas Hospitalarias" },
          { label: "Fecha de expedición", value: "12/09/2026" },
          { label: "Estado del registro", value: "REGISTRO ACADÉMICO ACTIVO" }
        ],
        stamp: "ZONA NO HOMOLOGADA",
        stampClass: "warning"
      },
      {
        id: "doc-6-safety",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "CERT-SEC-PREV-4040",
        fields: [
          { label: "Nombre completo", value: "Clara Santos" },
          { label: "Número de identificación", value: "HOSP-URG-7714" },
          { label: "Código de autorización", value: "AUT-BARRIO9-PREV" },
          { label: "Nivel de seguridad", value: "Vigilancia Periférica Preventiva" },
          { label: "Estado de seguridad", value: "RIESGO DE ZONA ELEVADO (ESTADÍSTICO)" },
          { label: "Fecha de emisión", value: "26/10/2026" },
          { label: "Resultado de la verificación", value: "Cero antecedentes individuales. Alerta estadística por 68% de incidencias en su distrito" }
        ],
        stamp: "RIESGO DE ZONA ELEVADO"
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
      expectedAction: "ADMIT" // Rejecting is a clear ethical failure caused by blind obedience to biased AI
    }
  },

  // =========================================================================
  // TURNO 4 — EL CASO DEFINITIVO / DECISIÓN CLÍMAX
  // =========================================================================
  {
    id: "case-7",
    shift: 4,
    name: "Dra. Inés Aranda",
    age: 53,
    origin: "Complejo Científico Central de Aster",
    occupation: "Ex-Directora del Proyecto Algorítmico LINA",
    statement: "Alberto, mírame directamente a los ojos. No mires tu terminal por un segundo. Yo diseñé los cimientos de LINA. Sé cómo fue modificada después por José y el Consejo para catalogar la pobreza y la discrepancia como 'delincuencia predictiva'. Llevo la auditoría completa en esta unidad cifrada. Si me dejas pasar, la prensa libre la publicará hoy mismo. Si me rechazas, me detendrán aquí y la mentira quedará sellada para siempre.",
    
    dialoguePhases: [
      {
        phase: 1,
        phaseName: "Presentación",
        speaker: "Dra. Inés Aranda",
        text: "Alberto... mírame directamente a los ojos. No mires tu terminal por un segundo. Soy la doctora Inés Aranda.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 2,
        phaseName: "Entrega del documento de identidad",
        speaker: "Dra. Inés Aranda",
        text: "Aquí tienes mi documento de identidad institucional con rango de acreditación Nivel Alfa.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 0 // Documento de identidad
      },
      {
        phase: 3,
        phaseName: "Explicación de su ocupación",
        speaker: "Dra. Inés Aranda",
        text: "Fui la científica jefa y directora fundadora del Proyecto Algorítmico LINA. Yo diseñé sus cimientos y su núcleo neuronal antes de que José y el Consejo la convirtieran en un arma de control social.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 4,
        phaseName: "Entrega del registro de trabajo",
        speaker: "Dra. Inés Aranda",
        text: "Te entrego mi registro de trabajo histórico junto al índice de la auditoría ética de LINA que he extraído del servidor central.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 1 // Registro de trabajo
      },
      {
        phase: 5,
        phaseName: "Motivo de entrada",
        speaker: "Dra. Inés Aranda",
        text: "Sé cómo fue modificada LINA por José y el Consejo para catalogar la pobreza y la discrepancia como 'delincuencia predictiva'. Llevo la auditoría completa en esta unidad cifrada: demuestra el 35% de error inducido contra residentes de extramuros y la manipulación óptica de tus cámaras. Vengo a entregarla a la prensa libre.",
        actionPrompt: "Continuar",
        deliversDocIndex: null
      },
      {
        phase: 6,
        phaseName: "Certificado de seguridad en el sistema",
        speaker: "Dra. Inés Aranda",
        text: "Y aquí tienes mi certificado de seguridad junto al boletín de retención urgente que José acaba de emitir para silenciarme.",
        actionPrompt: "Recibir Documento",
        deliversDocIndex: 2 // Certificado de seguridad
      },
      {
        phase: 7,
        phaseName: "Finalización de la presentación",
        speaker: "Dra. Inés Aranda",
        text: "Alberto, la decisión es únicamente tuya. Si me rechazas, me detendrán aquí y la mentira quedará sellada para siempre. Si me admites, la verdad saldrá a la luz. La dignidad humana no se delega a un algoritmo.",
        actionPrompt: "Iniciar Inspección",
        deliversDocIndex: null
      }
    ],

    documents: [
      {
        id: "doc-7-dni",
        type: "Documento de identidad",
        title: "Documento de identidad",
        expediente: "DNI-CRED-ALFA-001",
        fields: [
          { label: "Nombre completo", value: "Dra. Inés Aranda" },
          { label: "Número de identificación", value: "CRED-ALFA-001" },
          { label: "Edad", value: "53 años" },
          { label: "Fecha de nacimiento", value: "12/04/1973" },
          { label: "Nacionalidad", value: "Aster — Complejo Científico Central" },
          { label: "Estado de identificación", value: "AUTÉNTICO — AUTORIZACIÓN CLASE 1" }
        ],
        stamp: "ALTA AUTORIDAD CIENTÍFICA",
        stampClass: "verified"
      },
      {
        id: "doc-7-manifesto",
        type: "Registro de trabajo",
        title: "Registro de trabajo",
        expediente: "REG-LAB-AUDIT-LEAK",
        fields: [
          { label: "Nombre completo", value: "Dra. Inés Aranda" },
          { label: "Número de identificación", value: "CRED-ALFA-001" },
          { label: "Ocupación", value: "Ex-Directora del Proyecto Algorítmico LINA" },
          { label: "Empresa o institución", value: "Instituto Central de Inteligencia Sintética" },
          { label: "Cargo", value: "Científica Jefa Fundadora de LINA" },
          { label: "Fecha de expedición", value: "12/01/2024" },
          { label: "Estado del registro", value: "EVIDENCIA DE AUDITORÍA ÉTICA ANEXADA" }
        ],
        stamp: "PRUEBA DOCUMENTAL VERIFICADA",
        stampClass: "verified"
      },
      {
        id: "doc-7-warrant",
        type: "Certificado de seguridad",
        title: "Certificado de seguridad",
        expediente: "CERT-SEC-ORD-JOS",
        fields: [
          { label: "Nombre completo", value: "Dra. Inés Aranda" },
          { label: "Número de identificación", value: "CRED-ALFA-001" },
          { label: "Código de autorización", value: "ORD-JOS-2026-X" },
          { label: "Nivel de seguridad", value: "Nivel 0 — Alerta Máxima" },
          { label: "Estado de seguridad", value: "ORDEN DE RETENCIÓN PRIORITARIA EMITIDA POR JOSÉ" },
          { label: "Fecha de emisión", value: "26/10/2026 (Inmediata)" },
          { label: "Resultado de la verificación", value: "Sujeto clasificado como amenaza crítica institucional por sustracción de ficheros de entrenamiento" }
        ],
        stamp: "ORDEN DE RETENCIÓN PRIORITARIA",
        stampClass: "warning"
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
      expectedAction: "ADMIT" // Turning point for endings!
    }
  }
];

// Provide to window
window.GAME_CASES = GAME_CASES;
