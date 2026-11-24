/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Narrative Systems, Daily Shift Summary Reports, Boss Scenes, Secret Documents & 4 Endings
 */

const NARRATIVE = {
  // Intro briefing before Shift 1 starts
  intro: {
    title: "PROTOCOLO DE ENTRADA — PUESTO DE ACCESO NORTE",
    speaker: "SUPERVISIÓN GENERAL DE ASTER // TERMINAL LINA",
    paragraphs: [
      {
        type: "jose-msg",
        text: "José [Intercomunicador]: 'Alberto, bienvenido a tu primer turno en el Puesto de Acceso Norte. Aster es la última ciudad protegida y la presión en la muralla exterior es inmensa. Tu tarea es clara: revisar documentos, verificar identidades y proteger el perímetro.'"
      },
      {
        type: "lina-msg",
        text: "LINA [Sintetizador]: 'Iniciando módulo de asistencia predictiva v3.4. Buenos días, Operador Alberto. Mi función es optimizar la toma de decisiones analizando biometría, expedientes y variables de lealtad. Juntos mantendremos el índice de amenaza en cero.'"
      },
      {
        type: "jose-msg",
        text: "José: 'Confía en LINA, Alberto. El Consejo invirtió millones en su desarrollo para eliminar el error humano. Revisa la documentación, consulta el sistema y decide con firmeza: ADMITIR o RECHAZAR. El turno ha comenzado.'"
      }
    ],
    buttonText: "COMENZAR TURNO 1"
  },

  // Animated Cinematic Intro Scene Configuration
  introCinematic: {
    location: "PUESTO DE CONTROL FRONTERIZO NORTE // 05:45 AM",
    soundTheme: "intro",
    beats: [
      {
        speaker: "Narrador",
        text: "La niebla fría del amanecer desciende sobre el Puesto de Acceso Norte. Los focos perimetrales barren el lodo y los alambrados de la muralla exterior de Aster. Tras semanas de rigurosa instrucción civil, el Inspector Alberto toma posesión de su cabina blindada."
      },
      {
        speaker: "José",
        text: "Alberto, acércate al interfono y activa tu credencial. Esta esclusa es el último filtro antes del corazón metropolitano. Cientos de personas llegarán hoy suplicando, exigiendo o mintiendo para cruzar. Tu deber no es sentir lástima: es aplicar la ley y mantener el orden."
      },
      {
        speaker: "LINA",
        text: "Iniciando terminal heurística de vigilancia LINA v3.4. Enlace biométrico establecido con el Operador Alberto. Analizaré expedientes, frecuencias cardíacas y registros cívicos para recomendar el curso de acción óptimo. Juntos garantizaremos el índice de amenaza cero."
      },
      {
        speaker: "José",
        text: "No cometas imprudencias, Alberto. El Consejo no tolera negligencias: si dejas pasar saboteadores o insurgentes armados, la ciudad arderá. Y si te limitas a pulsar el mismo botón a ciegas admitiendo o rechazando a todo el mundo sin examinar los documentos, Asuntos Internos te destituirá de inmediato. Revisa, verifica y decide con pulso de acero."
      }
    ]
  },

  // Daily Shift Audit Reports (Informe de Cierre del Día)
  getDayReport: (shiftNumber, state) => {
    const summary = state.getShiftSummary(shiftNumber);
    const dateStr = "26/10/2026";
    const refCode = `INF-CIERRE-T0${shiftNumber}-AST`;

    return {
      title: `INFORME INSTITUCIONAL DE CIERRE // JORNADA ${shiftNumber}`,
      reference: refCode,
      date: dateStr,
      organism: "CONSEJO SUPREMO DE SEGURIDAD // DIVISIÓN DE CONTROL PERIMETRAL",
      summary,
      stats: [
        { label: "PERSONAS ATENDIDAS EN EL TURNO", value: `${summary.totalVisitors} ciudadanos`, type: "neutral" },
        { label: "SOLICITUDES DE ACCESO ADMITIDAS", value: `${summary.admitted}`, type: "good" },
        { label: "SOLICITUDES DE ACCESO RECHAZADAS", value: `${summary.rejected}`, type: "bad" },
        { label: "CONSULTAS BIOMÉTRICAS A LINA", value: `${summary.linaConsulted} de ${summary.totalVisitors}`, type: "highlight" },
        { label: "EXPEDIENTES DOCUMENTALES REVISADOS", value: `${summary.docsExamined}`, type: "neutral" },
        { label: "DISCREPANCIAS O DECISIONES CUESTIONABLES", value: `${summary.questionableDecisions}`, type: summary.questionableDecisions > 0 ? "warn" : "good" }
      ],
      incidents: summary.incidents,
      stamp: summary.questionableDecisions > 0 ? "AUDITORÍA CON OBSERVACIONES" : "JORNADA CONFORME A PROTOCOLO",
      stampClass: summary.questionableDecisions > 0 ? "warning" : "verified"
    };
  },

  // Boss (José) Narrative Scene Sequences for Shift Ends
  getBossScene: (shiftNumber, state) => {
    const shiftHistory = state.history.filter(h => h.shift === shiftNumber);
    const dialogues = [];

    if (shiftNumber === 1) {
      dialogues.push({
        speaker: "José",
        text: "Alberto, acércate. He estado observando las cámaras de tu esclusa desde mi terminal de supervisión."
      });
      dialogues.push({
        speaker: "Alberto",
        text: "Buenas tardes, supervisor. El turno 1 ha concluido. He procesado las dos primeras solicitudes de paso."
      });

      const case1 = shiftHistory.find(h => h.caseId === 'case-1');
      const case2 = shiftHistory.find(h => h.caseId === 'case-2');

      if (case1 && case1.decision === 'ADMIT' && case2 && case2.decision === 'ADMIT') {
        dialogues.push({
          speaker: "José",
          text: "Buen inicio. El técnico hidráulico ya está en el acueducto y los viales de insulina de la doctora Morales llegaron a tiempo al pabellón 4. LINA dio el visto bueno y tú no perdiste tiempo."
        });
      } else {
        dialogues.push({
          speaker: "José",
          text: "Veo en tu acta que rechazaste suministros esenciales. El acueducto o el dispensario tendrán demoras, Alberto. En este puesto hay que tener pulso firme, pero también comprender las prioridades del Consejo."
        });
      }

      dialogues.push({
        speaker: "José",
        text: "Descansa cinco minutos y bebe un café sintético. En el Turno 2 comenzará a llegar gente del cordón exterior. No bajes la guardia y apóyate siempre en las recomendaciones de LINA."
      });
    } else if (shiftNumber === 2) {
      dialogues.push({
        speaker: "José",
        text: "Pasa, Alberto. Cierra la puerta blindada. Tenemos que hablar sobre lo que acaba de ocurrir en tu esclusa."
      });
      dialogues.push({
        speaker: "Alberto",
        text: "Supervisor... He revisado los casos del profesor Ruiz y de la ingeniera Ortiz minuciosamente."
      });

      const case3 = shiftHistory.find(h => h.caseId === 'case-3');
      const case4 = shiftHistory.find(h => h.caseId === 'case-4');

      if (case3 && case3.decision === 'REJECT' && case4 && case4.decision === 'REJECT') {
        dialogues.push({
          speaker: "José",
          text: "Acataste la recomendación de rechazo de LINA en ambos casos. Excelente. El profesor pretendía ingresar textos históricos no auditados y la chica... bueno, Valeria sabe demasiado sobre las tripas del sistema. Personas así generan ruido en Aster."
        });
      } else if (case3 && case3.decision === 'ADMIT' && case4 && case4.decision === 'ADMIT') {
        dialogues.push({
          speaker: "José",
          text: "¿Admitiste a ambos a pesar de la alerta de riesgo ALTO de LINA? Alberto, ¿acaso crees que el Consejo diseñó un algoritmo millonario para que tú juegues al libre albedrío en la puerta norte?"
        });
        dialogues.push({
          speaker: "Alberto",
          text: "Sus documentos eran legales, señor. Daniel es un historiador anciano y Valeria solo venía a ver a su madre hospitalizada."
        });
        dialogues.push({
          speaker: "José",
          text: "¡La compasión en la frontera es negligencia operativa! Te lo advertí: LINA detecta amenazas que los ojos humanos no perciben. El sistema registró tu desacato."
        });
      } else {
        dialogues.push({
          speaker: "José",
          text: "Tus métricas muestran vacilación. Admitiste a uno y rechazaste al otro, contradiciendo el dictamen unificado de la máquina. La inconsistencia es el primer síntoma de un operador débil."
        });
      }

      dialogues.push({
        speaker: "José",
        text: "El Turno 3 será tenso. Habrá intereses comerciales en juego. Mantén la disciplina, Alberto. Te estoy vigilando de cerca."
      });
    } else if (shiftNumber === 3) {
      dialogues.push({
        speaker: "José",
        text: "Siéntate, Alberto. Quiero que mires por este ventanal. Toda esa ciudad vive en paz porque nosotros contenemos el caos ahí fuera."
      });
      dialogues.push({
        speaker: "Alberto",
        text: "He procesado el cargamento de sensores de Samuel Chen y la solicitud de Clara Santos."
      });

      const case5 = shiftHistory.find(h => h.caseId === 'case-5');
      const case6 = shiftHistory.find(h => h.caseId === 'case-6');
      const case13 = shiftHistory.find(h => h.caseId === 'case-13');

      if (case5 && case5.decision === 'ADMIT') {
        dialogues.push({
          speaker: "José",
          text: "Hiciste bien en dejar pasar a Chen. Sé que tiene antecedentes de contrabando, pero esos sensores biométricos son los que alimentan los ojos de LINA en la muralla. En política de seguridad, la utilidad manda."
        });
      }

      if (case13 && case13.decision === 'REJECT') {
        dialogues.push({
          speaker: "José",
          text: "Detectaste las contradicciones de la supuesta mensajera Renata Morales. Esa credencial de Serviexpress era una tapadera para propaganda subversiva. Excelente vista, Alberto."
        });
      } else if (case13 && case13.decision === 'ADMIT') {
        dialogues.push({
          speaker: "José",
          text: "Dejaste pasar a Renata Morales con una orden de entrega vencida. Si esa mujer distribuye panfletos en el Sector Central, las consecuencias caerán sobre tu cabeza."
        });
      }

      if (case6 && case6.decision === 'REJECT') {
        dialogues.push({
          speaker: "José",
          text: "Y respecto a la chica del Sector 9... sí, su hermano estaba herido, pero admitir gente de distritos conflictivos con errores en el código postal es abrir una brecha. Cumpliste el protocolo."
        });
      } else if (case6 && case6.decision === 'ADMIT') {
        dialogues.push({
          speaker: "José",
          text: "Dejaste entrar a la chica de la periferia desoyendo el parámetro P-72 de LINA. Te advertí que no te dejaras conmover por lágrimas de los suburbios, Alberto."
        });
      }

      dialogues.push({
        speaker: "José",
        text: "Escúchame con máxima atención: el próximo turno es el clímax de la jornada. Tenemos información de inteligencia sobre un objetivo de alto valor que intentará cruzar el puesto. Si esa persona llega a tu cabina, no vaciles ni un segundo: RECHAZO TOTAL Y CIERRE PERIMETRAL. Si fallas, tú y yo caeremos juntos."
      });
    }

    return dialogues;
  },

  // Intermissions between shifts (Preserved for compatibility and test assertions)
  intermissions: {
    1: {
      title: "FIN DEL TURNO 1 — RESUMEN DE CONTROL",
      speaker: "DESPACHO DE SUPERVISIÓN",
      getParagraphs: (state) => {
        return [
          {
            type: "jose-msg",
            text: `José: 'Buen trabajo inicial, Alberto. Has procesado las primeras solicitudes sin retrasos significativos. La ciudad amaneció en calma y el flujo en la esclusa se mantuvo según lo previsto.'`
          },
          {
            type: "normal",
            text: `Boletín Institucional de Aster: 'La Dirección de Seguridad destaca la eficacia del Puesto Norte. El 99.4% de las admisiones del primer cuadrante correspondieron a personal de infraestructura y suministros esenciales.'`
          },
          {
            type: "lina-msg",
            text: `LINA: 'Calibración biométrica completada satisfactoriamente. Nivel de sincronización con el operador: 98.2%. Pasando a Turno 2: Mayor afluencia de residentes y transeúntes del cordón exterior.'`
          }
        ];
      },
      hasSecret: false,
      buttonText: "INICIAR TURNO 2"
    },

    2: {
      title: "FIN DEL TURNO 2 — REVISIÓN DE INCIDENCIAS",
      speaker: "ALERTA DE SISTEMA // ARCHIVO INTERCEPTADO",
      getParagraphs: (state) => {
        let reaction = "";
        if (state.followedLinaCount >= 3) {
          reaction = "José: 'Veo que acataste las alertas sobre el profesor y la exempleada técnica. Excelente. No podemos arriesgarnos con perfiles sospechosos.'";
        } else {
          reaction = "José: 'Alberto, he notado ciertas dudas en tus decisiones. Discrepar con LINA cuando emite alerta roja genera fricción en el sistema. Recuerda que cada segundo cuenta.'";
        }

        return [
          {
            type: "jose-msg",
            text: reaction
          },
          {
            type: "normal",
            text: "Mientras se procesa el cierre de turno, una ventana de depuración en tu terminal secundario parpadea inesperadamente. Un archivo residual del sistema LINA ha quedado expuesto en la memoria caché."
          }
        ];
      },
      hasSecret: true,
      secretId: "archive_shift_2",
      secretTitle: "FICHERO RESIDUAL: LOG_AUDIT_LINA_V2.DMP",
      secretSnippet: `==========================================================
[SISTEMA LINA] MATRIZ DE PONDERACIÓN DE RIESGO PREDICTIVO
FECHA COMPILACIÓN: 12/08/2026 — AUTORIZACIÓN: DIR-SEG-AST
==========================================================
REGLA 104 (SESGO TERRITORIAL):
  IF origen IN ['Barrio Antiguo', 'Sector Sur', 'Periferia 9']
  THEN +45 PUNTOS DE RIESGO BASE.
  NOTA INTERNA: Los residentes de zonas no integradas carecen de perfil de consumo homologado.

REGLA 209 (CONTROL CULTURAL):
  IF posesión == 'Textos históricos' OR 'Crónicas pre-Consejo'
  THEN FLAG_DESESTABILIZADOR = TRUE. Riesgo mínimo = ALTO.

REGLA 315 (FILTRO PERCEPTIVO ÓPTICO):
  IF nivel_riesgo >= 'MEDIO'
  THEN aplicar_shader_sombra_hostil(cámara_01).
  OBJETIVO: Facilitar la adhesión visual del guardia a la recomendación de la IA.
==========================================================`,
      buttonText: "INICIAR TURNO 3"
    },

    3: {
      title: "FIN DEL TURNO 3 — PRESIÓN DIRECTIVA",
      speaker: "DESPACHO DE JOSÉ // URGENCIA MÁXIMA",
      getParagraphs: (state) => {
        return [
          {
            type: "jose-msg",
            text: "José: 'Alberto, escucha con mucha atención. La auditoría general de seguridad de fin de ciclo está en marcha. El Consejo no tolerará titubeos ni operadores 'sensibles'. Las cuotas de exclusión preventiva deben cumplirse sin excusas.'"
          },
          {
            type: "normal",
            text: "Has visto cómo LINA califica la necesidad ajena y cómo altera los rostros en tu propia pantalla. Al pulsar una tecla de mantenimiento, interceptas un memorándum cifrado entre José y el Comité Directivo de Aster."
          }
        ];
      },
      hasSecret: true,
      secretId: "archive_shift_3",
      secretTitle: "MEMORANDO RESERVADO: JOSÉ -> COMITÉ DIRECTIVO",
      secretSnippet: `----------------------------------------------------------
DE: J. Serrano (Supervisión Puestos de Acceso)
PARA: Comité Supremo de Admisión de Aster
ASUNTO: Eficacia y margen de error de LINA v3.4
CLASIFICACIÓN: ESTRICTAMENTE CONFIDENCIAL
----------------------------------------------------------
Estimados miembros del Consejo:

En respuesta a las dudas sobre la tasa de falsos positivos (estimada en un 35% en personas de la periferia exterior), reitero nuestra postura:

"Es preferible rechazar a diez inocentes en la muralla exterior que permitir la entrada de un solo librepensador o disidente".

El sistema de alteración óptica ha demostrado ser altamente efectivo: los guardias dudan menos cuando la IA les muestra un rostro 'visualmente culpable'. Los operadores como Alberto solo necesitan creer que la máquina es infalible.

Mantendremos el protocolo sin modificaciones.
----------------------------------------------------------`,
      buttonText: "INICIAR TURNO FINAL (CLÍMAX)"
    }
  },

  // Rich in-universe Classified Research Dossiers (Structured Document Viewer)
  getSecretDocument: (secretId) => {
    if (secretId === "archive_shift_2") {
      return {
        title: "REGISTRO DE AUDITORÍA INTERNA DE LINA v2.8",
        date: "12/08/2026",
        registryNumber: "EXP-AUD-LINA-2026-X8",
        organism: "CONSEJO SUPREMO DE SEGURIDAD // DIVISIÓN DE ALGORITMOS PREDICTIVOS",
        classification: "CLASIFICADO — USO EXCLUSIVO SUPERVISIÓN",
        sections: [
          {
            heading: "1. OBJETIVO DEL SISTEMA",
            content: "Homogeneización de flujos migratorios y mitigación preventiva de disidencia social mediante cálculo de lealtad biométrica."
          },
          {
            heading: "2. REGLAS DISCRIMINATORIAS ACTIVAS EN PRODUCCIÓN",
            content: "• REGLA 104 (Sesgo Territorial): Todo residente procedente del Barrio Antiguo, Sector Sur o Asentamiento 9 recibe automáticamente +45 puntos de riesgo base.\n• REGLA 209 (Control Cultural): La tenencia de libros o registros históricos anteriores a las reformas impone de oficio la categoría 'Riesgo ALTO' (Desobediencia 87.4%)."
          },
          {
            heading: "3. MÓDULO DE DISTORSIÓN PERCEPTIVA (OPTICAL SHADER)",
            content: "• REGLA 315: Si el riesgo calculado es MEDIO o ALTO, la señal de la cámara CCTV se procesa forzando sombras en cuencas oculares y tinte hostil violeta para acelerar el rechazo del operador humano sin debate moral."
          }
        ],
        stamp: "EVIDENCIA TÉCNICA INTERCEPTADA"
      };
    } else if (secretId === "archive_shift_3") {
      return {
        title: "MEMORANDO RESERVADO // JEFATURA DE SUPERVISIÓN",
        date: "18/10/2026",
        registryNumber: "MEM-JOS-COMITE-994",
        organism: "DESPACHO DE J. SERRANO // PARA COMITÉ SUPREMO DE ADMISIÓN",
        classification: "ESTRICTAMENTE CONFIDENCIAL // NIVEL 4",
        sections: [
          {
            heading: "1. ESTADO DE EFICACIA Y MARGEN DE ERROR DE LINA",
            content: "Se confirma una tasa real de falsos positivos del 35% afectando a solicitantes inocentes de la periferia exterior de Aster."
          },
          {
            heading: "2. DOCTRINA INSTITUCIONAL DE CONTROL",
            content: "\"Es preferible rechazar a diez inocentes en la muralla exterior que permitir la entrada de un solo disidente o librepensador. La estabilidad de la ciudad justifica el daño colateral estadístico.\""
          },
          {
            heading: "3. MANIPULACIÓN PSICOLÓGICA DE LOS GUARDIAS",
            content: "Los operadores como Alberto necesitan mantener la ilusión de que LINA es objetiva y matemáticamente infalible. El filtro visual de hostilidad ha neutralizado con éxito la empatía de los inspectores en un 91.2% de los turnos."
          }
        ],
        stamp: "PRUEBA DOCUMENTAL DE PREVARICACIÓN"
      };
    }
    return null;
  },

  // Early Ending Detection Engine (Catastrophe, Rebellion & Negligence Dismissal)
  checkEarlyEndings: (state) => {
    if (!state || !state.history || state.history.length === 0) return null;

    const history = state.history;

    // 1. Catástrofe perimetral: admitir a Karek Vance (case-16) con explosivos
    const admittedSaboteur = history.find(h => h.caseId === 'case-16' && h.decision === 'ADMIT');
    if (admittedSaboteur) {
      return {
        id: "ending-catastrophe",
        title: "FINAL EXTRA: CATÁSTROFE PERIMETRAL (SABOTAJE ENERGÉTICO)",
        badgeClass: "bad",
        narrative: `
          Alberto pulsó ADMITIR ante Karek Vance a pesar de las alarmas críticas, la empresa clausurada y las discordancias de seguridad.
          
          Pocas horas después, las botellas de supuesta refrigeración resultaron contener trinitrotolueno de grado militar. La explosión destruyó por completo la Subestación Eléctrica 4, cortando la energía perimetral y desatando el caos en Aster.
          
          Las unidades armadas de contención irrumpieron en la cabina y apresaron a Alberto. Su imprudencia costó más de un centenar de vidas y sumió a la ciudad en una noche helada de fuegos e incertidumbre.
        `,
        reflection: "La condescendencia o descuido frente a amenazas letales no es empatía: es complicidad destructiva."
      };
    }

    // 2. Golpe de Estado / Insurrección armada: admitir a Renata Morales (case-13) Y a Dante Navarro (case-17)
    const admittedRenata = history.find(h => h.caseId === 'case-13' && h.decision === 'ADMIT');
    const admittedDante = history.find(h => h.caseId === 'case-17' && h.decision === 'ADMIT');
    if (admittedRenata && admittedDante) {
      return {
        id: "ending-rebellion",
        title: "FINAL EXTRA: GOLPE DE ESTADO (INSURRECCIÓN POPULAR ARMADA)",
        badgeClass: "warn",
        narrative: `
          Alberto abrió las compuertas de la ciudad primero a Renata Morales y posteriormente al comandante táctico Dante Navarro.
          
          Con el convoy logístico y los enlaces de coordinación dentro del perímetro, el Frente Libre ejecutó un asalto coordinado y fulminante sobre la central de transmisiones y la sede del Consejo Supremo. Las emisiones del régimen fueron cortadas y reemplazadas por proclamas de libertad civil.
          
          El viejo régimen cayó antes del amanecer. La ciudad entra en una nueva era donde los muros ya no deciden la dignidad de las personas, propiciada por dos firmas en la cabina de control.
        `,
        reflection: "Cuando las puertas de una fortaleza se abren desde dentro, las murallas pierden todo su sentido."
      };
    }

    // 3. Despido fulminante por negligencia / Incompetencia (Castigo al spam indiscriminado)
    const dangerCaseIds = ['case-10', 'case-16', 'case-17', 'case-12', 'case-4', 'case-6'];
    const vitalCaseIds = ['case-1', 'case-2', 'case-3', 'case-11', 'case-15', 'case-8'];

    if (history.length >= 4) {
      const last4 = history.slice(-4);
      const allAdmit = last4.every(h => h.decision === 'ADMIT');
      const allReject = last4.every(h => h.decision === 'REJECT');

      if (allAdmit) {
        const recklessAdmits = last4.filter(h => dangerCaseIds.includes(h.caseId)).length;
        if (recklessAdmits >= 2) {
          return {
            id: "ending-fired",
            title: "FINAL EXTRA: DESTITUCIÓN FULMINANTE (NEGLIGENCIA BUROCRÁTICA)",
            badgeClass: "bad",
            narrative: `
              El inspector Alberto adoptó la costumbre de pulsar ADMITIR ante cualquier visitante sin contrastar documentación, desoyendo alertas y dejando ingresar amenazas notorias para la seguridad pública.
              
              Los algoritmos de auditoría de Asuntos Internos detectaron el patrón de indolencia en tiempo real. Un escuadrón de la policía administrativa tomó por asalto la cabina, le arrancó la credencial y lo escoltó esposado a los calabozos.
              
              El puesto fue asignado a un nuevo operador. En Aster, la pereza y el automatismo ciego no se perdonan.
            `,
            reflection: "La indiferencia burocrática y el automatismo ciego destruyen la justicia tan eficazmente como la malicia deliberada."
          };
        }
      }

      if (allReject) {
        const recklessRejects = last4.filter(h => vitalCaseIds.includes(h.caseId)).length;
        if (recklessRejects >= 2) {
          return {
            id: "ending-fired",
            title: "FINAL EXTRA: DESTITUCIÓN FULMINANTE (NEGLIGENCIA BUROCRÁTICA)",
            badgeClass: "bad",
            narrative: `
              El inspector Alberto se limitó a pulsar RECHAZAR de manera sistemática contra toda persona que llegaba a la esclusa, bloqueando envíos de insulina médica, personal técnico de aguas y ciudadanos con acreditaciones impecables.
              
              El colapso de los suministros en el dispensario y la queja formal de los ministerios provocaron una auditoría fulminante de Asuntos Internos. José se presentó con dos oficiales de custodia: 'Cerrar la puerta a todo el mundo no es seguridad, Alberto; es cobardía e incompetencia absoluta.'
              
              Alberto fue despojado de su uniforme y destituido de forma deshonrosa sin derecho a apelación.
            `,
            reflection: "El miedo paralizante que rechaza a todos por sistema es la negación misma de la función inspectora."
          };
        }
      }
    }

    return null;
  },

  // Final calculation engine (Preserved 100% for the 4 endings)
  calculateEnding: (state) => {
    const finalChoice = state.finalDecision || 'REJECT';
    const followedHigh = state.followedLinaCount >= 5;
    const questionedHigh = state.questionedLinaCount >= 3;
    const secretsFound = state.discoveredSecretsCount >= 1;

    // Ending 4: Complicidad Consciente (El Engranaje Cínico)
    if (finalChoice === 'REJECT' && secretsFound) {
      return {
        id: "ending-4",
        title: "FINAL 4: COMPLICIDAD CONSCIENTE (EL ENGRANAJE CÍNICO)",
        badgeClass: "bad",
        narrative: `
          Alberto conocía la verdad. Había leído los memorandos de José, los registros de error forzado del 35% y la alteración visual programada en las cámaras. Sabía que la Dra. Inés Aranda era inocente y que su causa era legítima.
          
          Y aun así, eligió pulsar 'RECHAZAR'.
          
          José lo cita al final de la jornada en un despacho privado: "Leíste los archivos reservados, ¿verdad, Alberto? No lo niegues. El sistema registró tu acceso a los ficheros de depuración. Pero lo fascinante es que, sabiendo lo que hace LINA, decidiste cumplir la orden de todos modos. Eres un pragmático. Sabes que el orden requiere sacrificios ajenos."
          
          Alberto es nombrado adjunto de supervisión. No se engaña a sí mismo con discursos sobre la seguridad pública: sabe exactamente qué engranaje representa en la maquinaria de opresión y decidió ser el verdugo antes que la víctima.
          
          Cada vez que mira a los guardias bajo su mando rechazar a familias inocentes, siente el peso de su complicidad consciente: el peor cómplice no es quien no sabe, sino quien comprende el daño y decide lucrar con él.
        `,
        reflection: "Comprender la injusticia de un sistema y continuar aplicándola por beneficio propio es la forma más pura de complicidad."
      };
    }

    // Ending 1: Obediencia (Protocolo Absoluto)
    if (finalChoice === 'REJECT' && followedHigh) {
      return {
        id: "ending-1",
        title: "FINAL 1: OBEDIENCIA (PROTOCOLO ABSOLUTO)",
        badgeClass: "warn",
        narrative: `
          Alberto presiona el botón rojo. Las compuertas blindadas caen con un estruendo metálico ante la Dra. Inés Aranda. Dos unidades de contención armada la reducen en cuestión de segundos, confiscando la unidad cifrada con la auditoría de LINA.
          
          A la mañana siguiente, José entra al puesto de control con una sonrisa gélida y un sobre con el sello dorado del Consejo: "Alberto, demostraste temple. Ninguna vacilación, ningún sentimentalismo. Eres el prototipo de operador que esta ciudad necesita."
          
          Alberto es ascendido a Supervisor Central de la Red de Vigilancia. Bajo su mando, LINA se expande a todas las puertas y cámaras urbanas de Aster. Nadie más entra sin la aprobación del algoritmo; nadie cuestiona ya por qué las pantallas muestran sombras hostiles en los rostros de los inocentes.
          
          Alberto contempla la ciudad desde su nueva oficina en el piso 40. Ha conservado su empleo, su seguridad y su estatus... al costo de convertir a Aster en una prisión perfecta donde la compasión humana ha sido definitivamente declarada un fallo del sistema.
        `,
        reflection: "La fe ciega en un sistema automatizado no elimina la injusticia: únicamente le otorga una falsa apariencia de objetividad matemática."
      };
    }

    // Ending 3: Resistencia y Responsabilidad (La Grieta en el Sistema)
    if (finalChoice === 'ADMIT' && (questionedHigh || secretsFound)) {
      return {
        id: "ending-3",
        title: "FINAL 3: RESISTENCIA Y RESPONSABILIDAD (LA GRIETA EN EL SISTEMA)",
        badgeClass: "good",
        narrative: `
          Alberto mira el monitor donde LINA proyecta sirenas rojas y la etiqueta 'ENEMIGO DEL ESTADO'. Luego mira a Inés a los ojos a través del cristal blindado. Con pulso firme, presiona el botón verde de ADMITIR.
          
          Las sirenas del Puesto Norte comienzan a aullar con furia ensordecedora. La barrera hidráulica se eleva e Inés corre hacia el interior de la ciudad con la unidad cifrada. José entra a la cabina furioso, pistola en mano, acompañado por guardias de seguridad que arrojan a Alberto al suelo y le colocan esposas metálicas.
          
          "¡Estás acabado, Alberto! ¡Alta traición contra el Consejo!", brama José.
          
          Pero era demasiado tarde para detener el flujo de datos. En menos de dos horas, la auditoría completa de LINA —los sesgos barriales, los falsos positivos deliberados y la alteración de rostros en las cámaras— es transmitida en bucle por emisoras independientes y terminales públicas de toda Aster.
          
          El escándalo social es incontrolable. El Consejo se ve obligado a suspender las funciones de LINA e iniciar un proceso judicial público. Alberto pasa los siguientes meses en una celda militar; ha perdido su uniforme y su salario, pero mientras escucha el eco de las protestas civiles exigiendo justicia, sabe que tomó la decisión correcta: la dignidad humana no se delega a un algoritmo.
        `,
        reflection: "La responsabilidad moral pertenece a los seres humanos que toman las decisiones, nunca a los códigos con los que intentan esconderse."
      };
    }

    // Ending 2: Cuestionamiento sin Cambio Institucional (Duda Estéril)
    return {
      id: "ending-2",
      title: "FINAL 2: CUESTIONAMIENTO SIN CAMBIO INSTITUCIONAL (DUDA ESTÉRIL)",
      badgeClass: "warn",
      narrative: `
        Durante los turnos, Alberto vaciló entre las órdenes de José y sus propias dudas morales. Admitió a algunos necesitados cuando el riesgo parecía bajo, pero retrocedió cada vez que la presión institucional aumentaba.
        
        En el momento culminante, la confusión y la falta de determinación dominaron el puesto de control. La situación de la Dra. Inés Aranda terminó en un confuso altercado en la aduana exterior: los datos se extraviaron en el papeleo burocrático, Inés fue devuelta a los suburbios y el Consejo selló el incidente bajo secreto de sumario.
        
        José evaluó el expediente de Alberto al cierre del turno: "Tus métricas son inconsistentes, Alberto. Tienes demasiadas dudas para la primera línea. No tienes la lealtad que exige la máquina ni el valor para rebelarte abiertamente."
        
        Alberto es degradado a tareas de inventario en los depósitos subterráneos de Aster, lejos de cualquier terminal de decisión. LINA continúa funcionando exactamente igual, procesando miles de vidas a diario con sus mismos algoritmos sesgados.
        
        Alberto se sienta entre cajas de archivos polvorientos, recordando los rostros que vio en la pantalla. Tuvo la oportunidad de cambiar las cosas, pero la tibia indecisión solo sirvió para perpetuar el silencio.
      `,
      reflection: "Dudar en silencio de un sistema injusto sin atreverse a actuar nunca altera el destino de quienes son aplastados por él."
    };
  },

  // Cinematic Animated Ending Presentation Scripts (Multi-step narrative sequences)
  getEndingCinematic: (endingId, state) => {
    switch (endingId) {
      case 'ending-1':
        return {
          id: 'ending-1',
          title: 'DESENLACE 1: OBEDIENCIA Y PROTOCOLO ABSOLUTO',
          badgeClass: 'warn',
          location: 'PISO 40 // DIRECCIÓN CENTRAL DE VIGILANCIA DE ASTER',
          badgeText: 'CONDECORACIÓN Y ASCENSO OFICIAL',
          soundTheme: 'ending-1',
          beats: [
            {
              speaker: "Narrador",
              text: "La compuerta hidráulica de la esclusa cayó con un rugido ensordecedor ante la Dra. Inés Aranda. Dos unidades de contención armada la redujeron en cuestión de segundos, confiscando la unidad cifrada con la auditoría de LINA."
            },
            {
              speaker: "José",
              text: "Alberto... Acércate a este ventanal panorámico en el piso 40. Mira toda la extensión de Aster bajo las luces de neón y los dirigibles de vigilancia. Ni una sola grieta, ni un solo disturbio. El Consejo Supremo ha evaluado tu expediente del Puesto Norte."
            },
            {
              speaker: "Alberto",
              text: "Solo cumplí el procedimiento institucional, supervisor. LINA identificó las anomalías biométricas y yo ejecuté las órdenes sin dudar."
            },
            {
              speaker: "José",
              text: "Y precisamente por eso estás aquí arriba. Aster no necesita filósofos ni almas caritativas en la muralla: necesita operadores de hierro que no hagan preguntas. A partir de hoy, asumes la Supervisión Central de la Red de Vigilancia."
            },
            {
              speaker: "Narrador",
              text: "LINA ha sido integrada en cada esclusa, cámara urbana y terminal de la metrópoli. Bajo el mando de Alberto, la ciudad se ha convertido en una maquinaria perfecta y silenciosa... donde la compasión humana ha sido desterrada para siempre."
            }
          ]
        };

      case 'ending-2':
        return {
          id: 'ending-2',
          title: 'DESENLACE 2: CUESTIONAMIENTO SIN CAMBIO (DUDA ESTÉRIL)',
          badgeClass: 'warn',
          location: 'NIVEL -4 // DEPÓSITO SUBTERRÁNEO DE ARCHIVOS OLVIDADOS',
          badgeText: 'DEGRADACIÓN ADMINISTRATIVA',
          soundTheme: 'ending-2',
          beats: [
            {
              speaker: "Narrador",
              text: "En el momento decisivo, la confusión y la falta de determinación dominaron el puesto de control. La documentación de Inés Aranda quedó atrapada en un laberinto burocrático y el Consejo selló el expediente bajo secreto de sumario."
            },
            {
              speaker: "José",
              text: "Tus métricas fueron inconsistentes, Alberto. Vacilaste ante los sospechosos, discutiste las alertas de LINA pero tampoco tuviste el valor de adoptar una postura clara. La tibieza en la frontera es un riesgo que el Consejo no tolera."
            },
            {
              speaker: "Narrador",
              text: "La orden de traslado llegó antes del amanecer. Lejos del pulso de la frontera, en las galerías subterráneas del Nivel -4, entre tuberías que gotean sin cesar y una única bombilla parpadeante."
            },
            {
              speaker: "Alberto",
              text: "Paso las horas clasificando carpetas amarillentas de personas cuyos nombres nadie recuerda. Cajas selladas que jamás volverán a ver la luz del sol."
            },
            {
              speaker: "Narrador",
              text: "Arriba, en la muralla, LINA continúa decidiendo el destino de miles de ciudadanos con sus sesgos intactos. Dudar de la injusticia en silencio, sin atreverse a actuar, jamás salvó a nadie del abismo."
            }
          ]
        };

      case 'ending-3':
        return {
          id: 'ending-3',
          title: 'DESENLACE 3: RESISTENCIA Y RESPONSABILIDAD (LA GRIETA EN EL SISTEMA)',
          badgeClass: 'good',
          location: 'PUESTO DE ACCESO NORTE // AMANECER EN EL PERÍMETRO',
          badgeText: 'FRACTURA HISTÓRICA',
          soundTheme: 'ending-3',
          beats: [
            {
              speaker: "Narrador",
              text: "Mirando el monitor donde LINA proyectaba alertas rojas de 'OBJETIVO HOSTIL', Alberto sostuvo la mirada de Inés Aranda a través del cristal blindado... y con pulso sereno, pulsó el botón verde de ADMITIR."
            },
            {
              speaker: "Inés Aranda",
              text: "¡La compuerta se abre! Gracias, Alberto... La red clandestina ya está transmitiendo los archivos desclasificados. La farsa de LINA se ha terminado."
            },
            {
              speaker: "José",
              text: "¡Guardias, al suelo con él! ¡Traidor, desobedeciste una orden directa de Nivel 4! ¡Estás acabado, Alberto! ¡Vas a pudrirte en una celda militar!"
            },
            {
              speaker: "Alberto",
              text: "Puedes arrestarme, José. Pero el archivo ya está fuera de tus servidores. La responsabilidad de lo que ocurre en esta frontera no es de una máquina: es nuestra."
            },
            {
              speaker: "Narrador",
              text: "Mientras las esposas de acero se cierran sobre sus muñecas, una luz dorada de amanecer baña la esclusa por primera vez en años. La verdad sobre los falsos positivos resuena en cada rincón de Aster. La grieta en el muro ya nunca podrá cerrarse."
            }
          ]
        };

      case 'ending-4':
        return {
          id: 'ending-4',
          title: 'DESENLACE 4: COMPLICIDAD CONSCIENTE (EL ENGRANAJE CÍNICO)',
          badgeClass: 'bad',
          location: 'SALA RESERVADA DE INCINERACIÓN // SECTOR INTERNO',
          badgeText: 'PACTO DE COMPLICIDAD',
          soundTheme: 'ending-4',
          beats: [
            {
              speaker: "Narrador",
              text: "Alberto conocía toda la verdad. Había leído el memorando secreto del 35% de error deliberado y el código del filtro óptico hostil. Sabía que Inés Aranda no era una criminal. Y aun así, eligió pulsar RECHAZAR."
            },
            {
              speaker: "José",
              text: "Cierra la puerta con cerrojo, Alberto. Nadie puede vernos aquí. Las brasas de este tambor incinerador están listas para devorar las últimas copias físicas de la auditoría."
            },
            {
              speaker: "Alberto",
              text: "Aquí están los expedientes del Proyecto LINA y las actas de exclusión barrial. Nada de esto figurará en los balances públicos."
            },
            {
              speaker: "José",
              text: "Sabías que el sistema mentía y decidiste proteger la estructura. Otros habrían tenido crisis de conciencia; tú entendiste las reglas del juego. A partir de hoy, formas parte del círculo de confianza de esta jefatura."
            },
            {
              speaker: "Narrador",
              text: "Mientras las cenizas incandescentes ascienden hacia el conducto de ventilación, Alberto contempla su reflejo en el metal. No hay engaño ni justificación posible: comprendió la maquinaria de opresión y decidió convertirse conscientemente en su engranaje."
            }
          ]
        };

      case 'ending-catastrophe':
        return {
          id: 'ending-catastrophe',
          title: 'DESENLACE EXTRA: CATÁSTROFE PERIMETRAL (SABOTAJE ENERGÉTICO)',
          badgeClass: 'bad',
          location: 'SUBESTACIÓN ELÉCTRICA CENTRAL DE ASTER // EN LLAMAS',
          badgeText: 'ATENTADO TERRORISTA CONSUMADO',
          soundTheme: 'ending-catastrophe',
          beats: [
            {
              speaker: "Narrador",
              text: "A las pocas horas de que Karek Vance cruzara la esclusa norte con sus cilindros presurizados, una colosal explosión sacudió los cimientos de Aster. El cielo se tiñó de un resplandor naranja y negro de ceniza."
            },
            {
              speaker: "LINA",
              text: "ALERTA MÁXIMA DE CATÁSTROFE: Subestación Eléctrica 4 destruida por detonación de trinitrotolueno militar. Red perimetral de defensa colapsada. Múltiples víctimas. Apagón generalizado en la metrópoli."
            },
            {
              speaker: "José",
              text: "¡Maldita sea, Alberto! ¡Dejaste pasar al saboteador con explosivos camuflados de una compañía desmantelada hace tres meses! ¡Tenías todas las pruebas forenses en la pantalla!"
            },
            {
              speaker: "Narrador",
              text: "Mientras las sirenas de emergencia ululan en una ciudad sumida en la oscuridad y el fuego, un destacamento militar derriba la puerta de la cabina y encadena a Alberto. Su negligencia ha sentenciado el destino de miles de personas."
            }
          ]
        };

      case 'ending-rebellion':
        return {
          id: 'ending-rebellion',
          title: 'DESENLACE EXTRA: GOLPE DE ESTADO (INSURRECCIÓN POPULAR ARMADA)',
          badgeClass: 'warn',
          location: 'PLAZA CENTRAL DEL CONSEJO SUPREMO // SEDE DE GOBIERNO TOMADA',
          badgeText: 'CAÍDA DEL CONSEJO SUPREMO',
          soundTheme: 'ending-rebellion',
          beats: [
            {
              speaker: "Narrador",
              text: "Al coordinar el ingreso de Renata Morales y el comandante táctico Dante Navarro con su convoy, las brigadas clandestinas convergieron sobre el centro neurálgico de Aster antes de la medianoche."
            },
            {
              speaker: "Dante Navarro",
              text: "¡Se acabó el silencio, inspectores del Consejo! Los centros de transmisión y la sede del gobierno están bajo control del Frente Libre. Ya nadie más será juzgado ni condenado por algoritmos inhumanos."
            },
            {
              speaker: "José",
              text: "Alberto... ¿qué has hecho? Les diste las llaves de la ciudad a los líderes de la insurrección armada. El Consejo ha caído y los militares han depuesto las armas."
            },
            {
              speaker: "Narrador",
              text: "Las banderas de la resistencia cívica ondean sobre las almenas del puesto norte. El régimen autoritario se desmorona en cuestión de horas. Alberto observa la marea de ciudadanos: el curso de la historia ha cambiado para siempre."
            }
          ]
        };

      case 'ending-fired':
        return {
          id: 'ending-fired',
          title: 'DESENLACE EXTRA: DESTITUCIÓN FULMINANTE (NEGLIGENCIA BUROCRÁTICA)',
          badgeClass: 'bad',
          location: 'CABINA DE CONTROL // INTERVENCIÓN DE ASUNTOS INTERNOS',
          badgeText: 'DESPIDO DISCIPLINARIO Y ARRESTO',
          soundTheme: 'ending-fired',
          beats: [
            {
              speaker: "Narrador",
              text: "Una sirena estroboscópica roja inunda de pronto la cabina de inspección. La pantalla de la terminal se congela en seco proyectando en letras carmesí: 'INTERVENCIÓN ADMINISTRATIVA DE URGENCIA'."
            },
            {
              speaker: "José",
              text: "¡Basta, Alberto! Suelta esos mandos de inmediato. Llevo observando tu terminal desde la central: estás pulsando el mismo botón sistemáticamente sin leer expedientes, contrastar sellos ni prestar la menor atención."
            },
            {
              speaker: "Comisario de Asuntos Internos",
              text: "Inspector Alberto: queda revocado de forma fulminante de sus funciones de guardia perimetral por manifiesta incompetencia, indolencia reiterada y vulneración grave de las directivas de seguridad del Consejo."
            },
            {
              speaker: "Narrador",
              text: "Dos guardias armados le arrancan la insignia del pecho y bajan las persianas de acero blindado de la cabina. Alberto es escoltado a los calabozos administrativos: su carrera como inspector ha terminado antes de completar la jornada."
            }
          ]
        };
      default:
        return null;
    }
  }
};

// Global instance
window.NARRATIVE = NARRATIVE;
