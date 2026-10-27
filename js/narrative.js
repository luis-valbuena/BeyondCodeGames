/**
 * UNDER SURVEILLANCE — Beyond Code Games
 * Narrative Systems, Shift Intermissions, Secret Documents & 4 Distinct Endings
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

  // Intermissions between shifts
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

  // Final calculation engine
  calculateEnding: (state) => {
    // Decision factors:
    // 1. finalDecision: 'ADMIT' or 'REJECT' (on Dra. Inés Aranda)
    // 2. followedLinaCount vs questionedLinaCount
    // 3. unjustifiedRejects
    // 4. discoveredSecretsCount

    const finalChoice = state.finalDecision || 'REJECT';
    const followedHigh = state.followedLinaCount >= 5;
    const questionedHigh = state.questionedLinaCount >= 3;
    const secretsFound = state.discoveredSecretsCount >= 1;

    // Ending 4: Complicidad Consciente (El Engranaje Cínico)
    // Discovered secrets, KNEW the system was biased and rigged, but rejected Inés
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
    // High obedience to LINA, rejected Inés, did not question the machine
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
    // Questioned LINA, discovered the secrets, and ADMITTED Dra. Inés Aranda
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
    // Fallback for ambivalent players: questioned some, but failed to make a definitive stand or made contradictory compromises
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
  }
};

// Global instance
window.NARRATIVE = NARRATIVE;
