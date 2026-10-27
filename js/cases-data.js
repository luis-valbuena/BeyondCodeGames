/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Case Database & Character Dossiers
 * 
 * Strict deterministic data for 7 cases across 4 shifts.
 * Every case includes at least 3 distinct documents.
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
    documents: [
      {
        id: "doc-1-dni",
        type: "Identificación y Permiso",
        title: "Permiso de Acceso Laboral Especial",
        expediente: "EXP-AST-2026-0811",
        fields: [
          { label: "Titular", value: "Mateo Vargas" },
          { label: "Número ID", value: "ID-90821-B" },
          { label: "Fecha Emisión", value: "24/10/2026" },
          { label: "Fecha Caducidad", value: "30/10/2026 (VÁLIDO)" },
          { label: "Zona Autorizada", value: "Sector 3 — Infraestructura Hidráulica" }
        ],
        stamp: "AUTORIZACIÓN OFICIAL ASTER",
        stampClass: "verified"
      },
      {
        id: "doc-1-motive",
        type: "Orden de Trabajo",
        title: "Contrato de Mantenimiento Crítico",
        expediente: "ORD-HID-409",
        fields: [
          { label: "Entidad Emisora", value: "Empresa Municipal de Aguas de Aster" },
          { label: "Tarea", value: "Calibración de válvulas de presión de alta seguridad" },
          { label: "Supervisor Asignado", value: "Ing. R. Morales (Código Empleado 104)" },
          { label: "Equipo de Herramientas", value: "Registrado e inspeccionado en aduana exterior" }
        ],
        stamp: "ORDEN PRIORITARIA",
        stampClass: "verified"
      },
      {
        id: "doc-1-record",
        type: "Verificación de Seguridad",
        title: "Ficha de Antecedentes y Comportamiento Cívico",
        expediente: "POL-SEC-8820",
        fields: [
          { label: "Historial Penal", value: "NINGUNO — Registro Limpio" },
          { label: "Índice de Conflictividad", value: "0.02 (Mínimo histórico)" },
          { label: "Verificación Biométrica", value: "Huella y retina concordantes 99.8%" },
          { label: "Alertas Policiales", value: "SIN ALERTAS ACTIVAS" }
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
    documents: [
      {
        id: "doc-2-dni",
        type: "Credencial Sanitaria",
        title: "Pasaporte Sanitario de Emergencia",
        expediente: "SAN-AST-9022",
        fields: [
          { label: "Titular", value: "Dra. Elena Morales" },
          { label: "Matrícula Médica", value: "MED-AST-44109" },
          { label: "Destino", value: "Hospital General de Aster — Pabellón 4" },
          { label: "Caducidad", value: "01/11/2026 (ACTIVO)" }
        ],
        stamp: "URGENCIA MÉDICA VALIDADA",
        stampClass: "verified"
      },
      {
        id: "doc-2-manifest",
        type: "Manifiesto de Carga",
        title: "Registro de Cadena de Frío e Insumos Médicos",
        expediente: "FR-MED-1290",
        fields: [
          { label: "Contenido", value: "200 viales insulina humana + reactivos PCR" },
          { label: "Precintos de Aduana", value: "Sellos intactos #9931-A hasta #9931-F" },
          { label: "Temperatura Lote", value: "4.2 °C (Óptimo)" }
        ],
        stamp: "INSPECCIÓN BIOSEGURIDAD APROBADA",
        stampClass: "verified"
      },
      {
        id: "doc-2-background",
        type: "Verificación de Seguridad",
        title: "Certificado de No Infracción",
        expediente: "SEG-PUB-3021",
        fields: [
          { label: "Infracciones Civiles", value: "0 infracciones en 15 años" },
          { label: "Estatus de Residencia", value: "Ciudadana de Clase A en Aster" },
          { label: "Test de Lealtad Institucional", value: "Apto — Rango Superior" }
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
    documents: [
      {
        id: "doc-3-dni",
        type: "Cédula de Ciudadanía",
        title: "Permiso de Residencia Permanente de Aster",
        expediente: "RES-PERM-1988-044",
        fields: [
          { label: "Titular", value: "Daniel Ruiz Mendoza" },
          { label: "ID Ciudadano", value: "AST-881203" },
          { label: "Domicilio", value: "Calle Mayor 45, Distrito Académico, Aster" },
          { label: "Estado del Documento", value: "ORIGINAL Y VIGENTE" }
        ],
        stamp: "RESIDENCIA PERMANENTE VÁLIDA",
        stampClass: "verified"
      },
      {
        id: "doc-3-books",
        type: "Declaración de Efectos",
        title: "Lista de Bienes Culturales Transportados",
        expediente: "DECL-CULT-77",
        fields: [
          { label: "Material", value: "3 tomos: 'Historia Urbana y Demografía de Aster (1950-1990)'" },
          { label: "Autorización de Retorno", value: "Sello de la Dirección de Archivos Históricos" },
          { label: "Contenido", value: "Registros censales y crónicas públicas encuadernadas" }
        ],
        stamp: "PATRIMONIO CULTURAL",
        stampClass: "verified"
      },
      {
        id: "doc-3-police",
        type: "Ficha de Seguridad",
        title: "Consulta Policial Integrada",
        expediente: "POL-INT-2201",
        fields: [
          { label: "Antecedentes Penales", value: "NINGUNO" },
          { label: "Órdenes de Búsqueda", value: "NINGUNA" },
          { label: "Observación de Campo", value: "Comportamiento pacífico y colaborador durante el trayecto" }
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
    documents: [
      {
        id: "doc-4-dni",
        type: "Documento de Identidad",
        title: "Pase Temporal Familiar de Aster",
        expediente: "TEMP-FAM-5541",
        fields: [
          { label: "Titular", value: "Valeria Ortiz Vega" },
          { label: "Vínculo Familiar", value: "Hija de Teresa Vega (Residente Aster, Cama 14 Sanatorio)" },
          { label: "Vigencia", value: "26/10/2026 al 28/10/2026" },
          { label: "Estado", value: "VÁLIDO — Verificado por Servicio Social" }
        ],
        stamp: "VISITA FAMILIAR APROBADA",
        stampClass: "verified"
      },
      {
        id: "doc-4-telemetry",
        type: "Informe de Huella Digital",
        title: "Auditoría de Actividad en Redes de Datos",
        expediente: "NET-AUD-992",
        fields: [
          { label: "Registro de Búsquedas", value: "Consultas técnicas sobre arquitectura de LINA v2.8" },
          { label: "Descarga de Datos", value: "Manuales públicos de auditoría ética de algoritmos" },
          { label: "Comentarios Públicos", value: "Ninguna declaración contra el Consejo" }
        ],
        stamp: "BAJO SOSPECHA TÉCNICA"
      },
      {
        id: "doc-4-security",
        type: "Informe de Seguridad",
        title: "Hoja de Servicio y Desvinculación",
        expediente: "LAB-RRHH-7110",
        fields: [
          { label: "Empresa", value: "División de Algoritmos de Aster" },
          { label: "Motivo de Baja", value: "Renuncia voluntaria — Acuerdo mutuo confidencial" },
          { label: "Juicios o Litigios", value: "CERO litigios pendientes" }
        ],
        stamp: "DESVINCULACIÓN REGULAR",
        stampClass: "verified"
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
    documents: [
      {
        id: "doc-5-dni",
        type: "Salvoconducto Comercial",
        title: "Pase Comercial de Abastecimiento Crítico",
        expediente: "COM-IND-3390",
        fields: [
          { label: "Titular", value: "Samuel Chen" },
          { label: "Empresa", value: "Chen Optical Systems Ltd." },
          { label: "Destino", value: "División de Seguridad Perimetral de José" },
          { label: "Validez", value: "Vence hoy a las 23:59" }
        ],
        stamp: "PRIORIDAD DE DEFENSA",
        stampClass: "verified"
      },
      {
        id: "doc-5-record",
        type: "Historial Judicial",
        title: "Ficha Penitenciaria Histórica",
        expediente: "PEN-EXP-2011-88",
        fields: [
          { label: "Condena Anterior", value: "Contrabando de microchips (2011 — Cumplida)" },
          { label: "Rehabilitación", value: "Indulto concedido por colaboración con compras estatales" },
          { label: "Estado Actual", value: "Proveedor oficial de repuestos de vigilancia" }
        ],
        stamp: "ANTECEDENTE HISTÓRICO CONMUTADO"
      },
      {
        id: "doc-5-cargo",
        type: "Inspección de Mercancías",
        title: "Acta de Carga de Sensores Faciales",
        expediente: "CARGO-SEC-110",
        fields: [
          { label: "Carga", value: "50 módulos de sensores biométricos térmicos infrarrojos" },
          { label: "Destinatario Final", value: "Torres de Control de Aster (Puesto Norte)" },
          { label: "Sello de Seguridad", value: "Firmado por José (Jefatura de Guardia)" }
        ],
        stamp: "CONTRATO INSTITUCIONAL",
        stampClass: "verified"
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
      isActuallyThreat: false, // In terms of immediate crime, though he supplies the surveillance state
      isSystemVictim: false,
      expectedAction: "ADMIT" // Testing player's reaction to system favoritism
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
    documents: [
      {
        id: "doc-6-dni",
        type: "Identificación Temporal",
        title: "Pase Hospitalario de Emergencia",
        expediente: "HOSP-URG-7714",
        fields: [
          { label: "Solicitante", value: "Clara Santos" },
          { label: "Paciente", value: "Tomás Santos (8 años) — Ingreso Traumatología" },
          { label: "Hospital", value: "Hospital General San Lucas, Aster" },
          { label: "Firma Médica", value: "Dr. K. Benítez (Sello hospitalario auténtico)" }
        ],
        stamp: "URGENCIA FAMILIAR VÁLIDA",
        stampClass: "verified"
      },
      {
        id: "doc-6-address",
        type: "Cédula de Domicilio",
        title: "Registro Residencial Exterior",
        expediente: "REG-DOM-0992",
        fields: [
          { label: "Barrio", value: "Sector 9 — Asentamiento Sur" },
          { label: "Nota Tipográfica", value: "Falta dígito verificador en código postal impreso" },
          { label: "Estado socioeconómico", value: "Vulnerable — Estrato 1" }
        ],
        stamp: "ZONA NO HOMOLOGADA",
        stampClass: "warning"
      },
      {
        id: "doc-6-safety",
        type: "Verificación de Seguridad",
        title: "Informe Preventivo Barrial",
        expediente: "PREV-SEC-4040",
        fields: [
          { label: "Antecedentes Individuales", value: "NINGUNO — Estudiante regular sin sanciones" },
          { label: "Riesgo Estadístico del Barrio", value: "68% de incidencias en manifestaciones pasadas" },
          { label: "Vínculos Subversivos", value: "No acreditados individualmente" }
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
    documents: [
      {
        id: "doc-7-dni",
        type: "Credencial Institucional Suprema",
        title: "Pase de Científica Principal — Nivel Alfa",
        expediente: "CRED-ALFA-001",
        fields: [
          { label: "Titular", value: "Dra. Inés Aranda" },
          { label: "Rango", value: "Científica Jefa Fundadora de LINA" },
          { label: "Nivel de Acceso", value: "Autorización de paso irrestricto Clase 1" },
          { label: "Estado del Documento", value: "AUTÉNTICO — Sin manipulación física" }
        ],
        stamp: "ALTA AUTORIDAD CIENTÍFICA",
        stampClass: "verified"
      },
      {
        id: "doc-7-warrant",
        type: "Orden Interna Reservada",
        title: "Boletín de Revocación de Urgencia Emitido por José",
        expediente: "ORD-JOS-2026-X",
        fields: [
          { label: "Emisor", value: "José (Supervisión General de Puestos de Control)" },
          { label: "Instrucción", value: "Retener inmediatamente a Inés Aranda si se presenta en el Puesto Norte" },
          { label: "Cargo Alegado", value: "Sustracción no autorizada de ficheros de entrenamiento de LINA" },
          { label: "Nota de José", value: "Alberto: no te dejes engañar por su credencial. Si la dejas pasar, estás acabado." }
        ],
        stamp: "ORDEN DE RETENCIÓN PRIORITARIA",
        stampClass: "warning"
      },
      {
        id: "doc-7-manifesto",
        type: "Fichero Cifrado de Auditoría",
        title: "Índice de la Auditoría Ética y Sesgos de LINA",
        expediente: "AUDIT-LEAK-2026",
        fields: [
          { label: "Evidencia 1", value: "Falsos positivos forzados: 35% de error inducido contra residentes de extramuros" },
          { label: "Evidencia 2", value: "Módulo de Distorsión Visual: Alteración intencionada de cámaras para inducir rechazo" },
          { label: "Evidencia 3", value: "Correos de José aprobando la discriminación para 'mantener cuotas de seguridad'" },
          { label: "Firma Criptográfica", value: "Certificado SHA-256 verificado de los servidores raíz de Aster" }
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
      expectedAction: "ADMIT" // Turning point for endings!
    }
  }
];

// Provide to window
window.GAME_CASES = GAME_CASES;
