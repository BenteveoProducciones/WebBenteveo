export const rubros = {
  salud: {
    h1: 'Salud y Bienestar',
    nombre: 'salud',
    subtitulo: 'Agenda llena, fichas al día, seguimiento automático.',
    imagenHero: '/img/transformacion/rubros/hero_salud.webp',
    parrafo: 'Trabajamos con <span class="text-amarillo font-medium">clínicas</span>, <span class="text-amarillo font-medium">centros médicos</span>, <span class="text-amarillo font-medium">consultorios</span>, <span class="text-amarillo font-medium">laboratorios</span>, <span class="text-amarillo font-medium">centros de estética</span> y <span class="text-amarillo font-medium">kinesiología</span>. Si los turnos viven en el teléfono, las fichas en papel y el seguimiento depende de la memoria de recepción, te ayudamos a ordenar toda la operación en un solo sistema.',
    problemas: [
      {
        icon: 'material-symbols:event-available-rounded',
        titulo: '¿Cuántos turnos quedaron vacíos esta semana por pacientes que no vinieron?',
        texto:
          'Implementamos confirmación automática de turnos y lista de espera inteligente: si alguien cancela, el lugar se ofrece solo al siguiente. La agenda trabaja llena.',
      },
      {
        icon: 'material-symbols:receipt-long-rounded',
        titulo: '¿Facturar a las obras sociales te lleva días y los rechazos te sorprenden?',
        texto:
          'Automatizamos la validación de autorizaciones y la preparación de la facturación a obras sociales y prepagas, con control previo de inconsistencias. Presentas antes y con menos rechazos.',
      },
      {
        icon: 'material-symbols:support-agent-rounded',
        titulo: '¿El teléfono no para de sonar por las mismas tres preguntas?',
        texto:
          'Armamos un asistente que responde coberturas, precios y horarios por WhatsApp, y deriva al equipo solo lo que necesita criterio humano. Recepción se dedica a los pacientes, no al teléfono.',
      },
      {
        icon: 'material-symbols:monitoring-rounded',
        titulo: '¿Sabes qué profesional, horario o prestación sostiene tu centro?',
        texto:
          'Diseñamos tableros con ocupación por profesional, ausentismo y prestaciones más solicitadas, actualizados solos. Decides con datos, no con sensaciones.',
      },
    ],
    pasos: {
      subtitulo:
        'Digitalización de ficha medica, gestión de turnos y notificaciones automáticas de seguimiento con lenguaje natural.',
      items: [
        {
          texto: 'El paciente agenda su turno por WhatsApp',
          imagen: '/img/transformacion/rubros/salud/1-el-paciente-agenda-su-turno-por-whatsapp.webp',
        },
        {
          texto: 'La ficha médica se digitaliza',
          imagen: '/img/transformacion/rubros/salud/2-la-ficha-medica-se-digitaliza.webp',
        },
        {
          texto: 'El seguimiento es automático',
          imagen: '/img/transformacion/rubros/salud/3-el-seguimiento-es-automatico.webp',
        },
        {
          texto: 'El alta se genera sola',
          imagen: '/img/transformacion/rubros/salud/4-el-alta-se-genera-sola.webp',
        },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:assignment-ind-outline',
        titulo: 'Asistente de pre-admisión de pacientes',
        texto:
          'El paciente completa sus datos y antecedentes antes de la consulta; la información llega cargada a la ficha médica.',
      },
      {
        icon: 'material-symbols:summarize-outline-rounded',
        titulo: 'Generador de resúmenes de consulta',
        texto:
          'A partir de las notas o el audio de la consulta, la IA arma el resumen clínico y las indicaciones para el paciente.',
      },
      {
        icon: 'material-symbols:notifications-active-outline-rounded',
        titulo: 'Seguimiento automático post-consulta',
        texto:
          'Detecta controles pendientes o estudios sin retirar y envía recordatorios personalizados según el tratamiento de cada paciente.',
      },
    ],
  },
  educacion: {
    h1: 'Educación y Capacitación',
    nombre: 'educación',
    subtitulo: 'Que la tecnología potencie el aprendizaje, no lo complique.',
    imagenHero: '/img/transformacion/rubros/hero_educacion.webp',
    parrafo:
      'Trabajamos con <span class="text-amarillo font-medium">institutos</span>, <span class="text-amarillo font-medium">academias</span>, <span class="text-amarillo font-medium">plataformas de cursos online</span> y <span class="text-amarillo font-medium">áreas de capacitación corporativa</span>. Si las consultas se responden tarde, el seguimiento de cada alumno recae en el docente y la administración se lleva horas de clase, <strong>te ayudamos a que todo eso corra en automático.</strong>',
    problemas: [
      {
        icon: 'material-symbols:forum-outline-rounded',
        titulo: '¿Un interesado preguntó por un curso y le respondieron dos días después?',
        texto:
          'Implementamos un asistente que responde programas, precios y fechas al instante por WhatsApp o web, y agenda la entrevista o inscripción. Ningún interesado se enfría esperando.',
      },
      {
        icon: 'material-symbols:payments-outline-rounded',
        titulo: '¿Cobrar las cuotas depende de mandar recordatorios uno por uno?',
        texto:
          'Automatizamos recordatorios de pago, links de cobro y conciliación de cuotas por alumno. La morosidad se gestiona sola, sin conversaciones incómodas.',
      },
      {
        icon: 'material-symbols:workspace-premium-outline-rounded',
        titulo: '¿Emitir un certificado o una constancia lleva más que preparar la clase?',
        texto:
          'Generamos certificados, constancias y analíticos automáticamente a partir de los registros de cada alumno. Se emiten solos, sin errores de tipeo ni idas y vueltas.',
      },
      {
        icon: 'material-symbols:how-to-reg-outline-rounded',
        titulo: '¿Inscribir a un alumno implica cargar los mismos datos en tres sistemas?',
        texto:
          'Automatizamos el alta: el alumno completa un formulario y queda cargado en la plataforma, la facturación y la comunicación. Un solo ingreso de datos, cero recarga.',
      },
    ],
    pasos: {
      subtitulo:
        'Un tutor especializado en el contenido de tu curso, disponible para cada alumno en cualquier momento.',
      items: [
        {
          texto: 'El docente define qué sabe y qué no sabe el tutor',
          imagen: '/img/transformacion/rubros/educacion/1-el-docente-define-que-sabe-y-que-no.webp',
        },
        {
          texto: 'Creamos un personaje virtual como tutor',
          imagen: '/img/transformacion/rubros/educacion/2-creamos-un-personaje-virtual.webp',
        },
        {
          texto: 'El alumno consulta sus dudas cuando quiere',
          imagen: '/img/transformacion/rubros/educacion/3-alumno-consulta-sus-dudas-cuando-quiere.webp',
        },
        {
          texto: 'El alumno recibe feedback inmediato',
          imagen: '/img/transformacion/rubros/educacion/4-alumno-recibe-feedback-de-inmediato.webp',
        },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:fact-check-outline-rounded',
        titulo: 'Corrector automático de evaluaciones',
        texto:
          'Corrige exámenes y trabajos según una rúbrica definida, y devuelve feedback personalizado a cada alumno en minutos.',
      },
      {
        icon: 'material-symbols:trending-up-rounded',
        titulo: 'Seguimiento automático de progreso del alumno',
        texto:
          'Detecta alumnos con bajo avance o inactividad y dispara mensajes de motivación o alerta al tutor a tiempo.',
      },
      {
        icon: 'material-symbols:auto-stories-outline-rounded',
        titulo: 'Generador de contenido y materiales de clase',
        texto:
          'A partir de un temario, arma resúmenes, guías de estudio y ejercicios adaptados al nivel de cada curso.',
      },
    ],
  },
  'real-estate': {
    h1: 'Real Estate',
    nombre: 'real estate',
    subtitulo: 'Proyectos complejos, ciclos largos. La tecnología los hace manejables.',
    imagenHero: '/img/transformacion/rubros/hero_real_state.webp',
    parrafo:
      'Trabajamos con <span class="text-amarillo font-medium">desarrolladoras</span>, <span class="text-amarillo font-medium">inmobiliarias</span>, <span class="text-amarillo font-medium">constructoras</span>, <span class="text-amarillo font-medium">estudios de arquitectura</span> y <span class="text-amarillo font-medium">administradoras de propiedades</span>. Si los proyectos son largos, los interlocutores muchos y la gestión vive entre mails, planillas y llamadas, te ayudamos a tener visibilidad completa en un solo lugar.',
    problemas: [
      {
        icon: 'material-symbols:flowchart-outline-sharp',
        titulo: '¿Un prospecto se enfrió porque nadie le hizo seguimiento a tiempo?',
        texto:
          'Implementamos CRMs diseñados para el ciclo inmobiliario: seguimiento de prospectos, estados de negociación y pipeline completo. Ninguna oportunidad se enfría.',
      },
      {
        icon: 'material-symbols:cards-stack-outline-rounded',
        titulo: '¿La documentación es inmanejable?',
        texto:
          'Centralizamos planos, contratos, escrituras y permisos en un repositorio ordenado por proyecto y unidad, con versiones y vencimientos. Todo se encuentra en segundos.',
      },
      {
        icon: 'material-symbols:eye-tracking-outline-rounded',
        titulo: '¿Te enteras del avance de obra cuando vas al terreno?',
        texto:
          'Diseñamos sistemas de seguimiento con reportes fotográficos, avance por etapa y alertas de desvío. Control total sin estar ahí todos los días.',
      },
      {
        icon: 'material-symbols:insert-chart-outline-rounded',
        titulo: '¿Inviertes en marketing inmobiliario sin saber qué canal trae compradores reales?',
        texto:
          'Conectamos los datos de campañas con el CRM para medir el costo real de cada lead calificado y optimizar la inversión donde realmente convierte.',
      },
    ],
    pasos: {
      subtitulo:
        'Un agente que busca propiedades en múltiples portales, arma la propuesta y hace el seguimiento. <strong>Sin que el asesor tenga que recordar nada.</strong>',
      items: [
        { texto: 'El cliente define qué busca', imagen: '/img/transformacion/rubros/real-state/1-e-asesor-define-que-busca-el-cliente.webp' },
        { texto: 'El agente escanea los portales', imagen: '/img/transformacion/rubros/real-state/2-el-sistema-organiza-y-cruza-la-informacion.webp' },
        { texto: 'La propuesta llega al cliente', imagen: '/img/transformacion/rubros/real-state/3-la-propuesta-llega-por-mail-al-cliente.webp' },
        { texto: 'El seguimiento es automático', imagen: '/img/transformacion/rubros/real-state/4-el-seguimiento-es-automatico.webp' },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:attach-money-rounded',
        titulo: 'Valuación automática de propiedades',
        texto:
          'El cliente ingresa dirección y m²; el sistema cruza comparables y devuelve un rango de precio en segundos.',
      },
      {
        icon: 'material-symbols:contract-outline-rounded',
        titulo: 'Generador de contratos y boletos',
        texto:
          'Cerraste una operación: el sistema redacta el contrato con los datos que ya cargaste. El escribano solo revisa y firma.',
      },
      {
        icon: 'material-symbols:monitor-heart-outline-rounded',
        titulo: 'Monitor de avance de obra por foto',
        texto:
          'El capataz sube fotos y la IA estima el avance real por etapa. Alertas de desvío sin pisar el terreno.',
      },
    ],
  },
  agroindustria: {
    h1: 'Agroindustria',
    nombre: 'agroindustria',
    subtitulo: 'Producir ya es difícil. La gestión no debería serlo.',
    imagenHero: '/img/transformacion/rubros/hero_agroindustria.webp',
    parrafo:
      'Trabajamos con <span class="text-amarillo font-medium">productores</span>, <span class="text-amarillo font-medium">acopios</span>, <span class="text-amarillo font-medium">contratistas</span> y <span class="text-amarillo font-medium">pymes agroindustriales</span>. Si los registros viven en cuadernos, la coordinación va por WhatsApp y armar un reporte para la certificadora lleva semanas, te ayudamos a digitalizar la operación completa: <strong>del lote a la oficina, todo en un solo lugar.</strong>',
    problemas: [
      {
        icon: 'material-symbols:assignment-outline-rounded',
        titulo: '¿Las órdenes de trabajo van por WhatsApp y nadie registra qué se hizo?',
        texto:
          'Implementamos un sistema donde cada labor queda asignada, confirmada y registrada con fecha, lote y responsable. El cuaderno de campo se escribe solo.',
      },
      {
        icon: 'material-symbols:receipt-long-outline-rounded',
        titulo: '¿Cartas de porte, remitos y liquidaciones viven en una caja de zapatos?',
        texto:
          'Digitalizamos y conciliamos la documentación comercial: cada entrega cruzada con su liquidación y sus descuentos. Sabes exactamente qué te pagaron y qué falta cobrar.',
      },
      {
        icon: 'material-symbols:build-outline-rounded',
        titulo: '¿Te enteras que la sembradora necesitaba service cuando se rompió?',
        texto:
          'Armamos control de maquinaria por horas de uso, con alertas de mantenimiento preventivo por equipo. Las máquinas paran cuando tú lo decides, no en plena campaña.',
      },
      {
        icon: 'material-symbols:inventory-2-outline-rounded',
        titulo: '¿Sabes cuánto grano tienes embolsado y cuánto entregaste a cada acopio?',
        texto:
          'Centralizamos existencias, entregas y saldos por comprador en un registro único y actualizado. Tu posición de granos, clara y en un solo lugar.',
      },
    ],
    pasos: {
      subtitulo:
        'Un sistema que recopila tus registros y genera automáticamente el reporte de certificación en el formato que cada certificadora exige.',
      items: [
        {
          texto: 'El productor carga los registros en la plataforma',
          imagen: '/img/transformacion/rubros/agroindustria/1-el-productor-carga-los-registros-en-la-plataforma.webp',
        },
        {
          texto: 'El sistema organiza y cruza la información',
          imagen: '/img/transformacion/rubros/agroindustria/2-el-sistema-organiza-y-cruza-la-informacion.webp',
        },
        {
          texto: 'El reporte se genera en el formato requerido',
          imagen: '/img/transformacion/rubros/agroindustria/3-el-reporte-se-genera-en-el-formato-requerido.webp',
        },
        {
          texto: 'Listo para presentar a la certificadora',
          imagen: '/img/transformacion/rubros/agroindustria/4-listo-para-presentar-en-la-certidicadora.webp',
        },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:water-drop-outline-rounded',
        titulo: 'Optimizador de aplicación de insumos',
        texto:
          'Cruza clima, suelo e historial de lotes para recomendar dosis y momento óptimo de fertilización o fitosanitarios.',
      },
      {
        icon: 'material-symbols:warehouse-outline-rounded',
        titulo: 'Control automático de stock e insumos',
        texto:
          'Detecta niveles bajos de insumos críticos y genera alertas de reposición antes de que falten en plena campaña.',
      },
      {
        icon: 'material-symbols:analytics-outline-rounded',
        titulo: 'Reporte de rendimiento por lote y campaña',
        texto:
          'Cruza costos, clima y producción para mostrar qué lotes son más rentables y dónde ajustar la próxima siembra.',
      },
    ],
  },
  turismo: {
    h1: 'Turismo',
    nombre: 'turismo',
    subtitulo: 'Tus clientes viajan. Que la gestión no te haga perder el viaje.',
    imagenHero: '/img/transformacion/rubros/hero_turismo.webp',
    parrafo:
      'Trabajamos con <span class="text-amarillo font-medium">agencias de viajes</span>, <span class="text-amarillo font-medium">operadores mayoristas</span>, <span class="text-amarillo font-medium">hoteles</span>, <span class="text-amarillo font-medium">alojamientos</span> y <span class="text-amarillo font-medium">empresas de excursiones</span>. Si las consultas llegan a toda hora, las tarifas cambian todos los días y cada reserva se arma a mano entre mails, planillas y WhatsApp, te ayudamos a que la operación funcione sola: <strong>de la primera consulta al regreso del viajero.</strong>',
    problemas: [
      {
        icon: 'material-symbols:chat-outline-rounded',
        titulo: '¿Las consultas llegan de noche y se responden recién al día siguiente?',
        texto:
          'Implementamos un asistente con IA que responde por WhatsApp y web a cualquier hora: disponibilidad, precios y condiciones. El viajero recibe respuesta antes de irse con otra agencia.',
      },
      {
        icon: 'material-symbols:request-quote-outline-rounded',
        titulo: '¿Armar una cotización te lleva una hora entre proveedores y planillas?',
        texto:
          'Conectamos tarifas, cupos y proveedores en un solo sistema que arma la propuesta con aéreos, alojamiento y excursiones en minutos. Tu equipo sólo la revisa y la envía.',
      },
      {
        icon: 'material-symbols:menu-book-outline-rounded',
        titulo: '¿Actualizar el catálogo de paquetes es copiar y pegar PDFs?',
        texto:
          'La IA lee los tarifarios y folletos de cada operador y carga los paquetes con precios, fechas y condiciones. El catálogo queda al día sin tipear nada.',
      },
      {
        icon: 'material-symbols:event-busy-outline-rounded',
        titulo: '¿Te enteras que faltaba un voucher cuando el pasajero ya está en el aeropuerto?',
        texto:
          'Automatizamos el seguimiento de cada reserva: pagos, documentación y vouchers con alertas de vencimiento. Nada queda pendiente cuando llega el día del viaje.',
      },
    ],
    pasos: {
      subtitulo:
        'Un agente que atiende la consulta, arma la cotización y cierra la reserva. <strong>Sin que nadie de tu equipo tenga que estar conectado.</strong>',
      items: [
        { texto: 'El viajero consulta por WhatsApp', imagen: '/img/transformacion/rubros/turismo/1-el-viajero-consulta-por-whatsapp.webp' },
        { texto: 'El agente arma la cotización con disponibilidad real', imagen: '/img/transformacion/rubros/turismo/2-el-agente-arma-la-cotizacion.webp' },
        { texto: 'La reserva se confirma con el pago de la seña', imagen: '/img/transformacion/rubros/turismo/3-la-reserva-se-confirma-con-la-sena.webp' },
        { texto: 'Vouchers y recordatorios llegan solos', imagen: '/img/transformacion/rubros/turismo/4-el-viaje-se-acompana-solo.webp' },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:price-change-outline-rounded',
        titulo: 'Monitor de tarifas y disponibilidad',
        texto:
          'Revisa precios de proveedores y competidores todos los días y avisa cuando conviene ajustar un paquete o lanzar una promo.',
      },
      {
        icon: 'material-symbols:map-outline-rounded',
        titulo: 'Generador de itinerarios personalizados',
        texto:
          'El viajero cuenta qué le gusta, cuántos días tiene y su presupuesto; el sistema arma un itinerario día por día listo para enviar.',
      },
      {
        icon: 'material-symbols:headphones-outline-rounded',
        titulo: 'Audioguías de tus recorridos',
        texto:
          'Creamos audioguías en formato podcast para cada recorrido, en varios idiomas. El viajero las escucha desde el celular y vive la experiencia con la voz de tu marca.',
      },
    ],
  },
  fitness: {
    h1: 'Fitness y Deportes',
    nombre: 'fitness',
    subtitulo: 'Que gestionar tu gimnasio sea tan ágil como entrenar.',
    imagenHero: '/img/transformacion/rubros/hero_fitness.webp',
    parrafo:
      'Trabajamos con <span class="text-amarillo font-medium">gimnasios</span>, <span class="text-amarillo font-medium">boxes</span>, <span class="text-amarillo font-medium">estudios de yoga y pilates</span>, <span class="text-amarillo font-medium">clubes</span> y <span class="text-amarillo font-medium">complejos de canchas</span>. Si las reservas van por WhatsApp, las cuotas se persiguen una por una y los socios se van sin que nadie lo vea venir, <strong>te ayudamos a ordenar toda la gestión en un solo sistema</strong>.',
    problemas: [
      {
        icon: 'material-symbols:person-add-outline-rounded',
        titulo: '¿Cuántos interesados te escribieron por Instagram y quedaron sin respuesta?',
        texto:
          'Implementamos un asistente que responde consultas, agenda la clase de prueba y hace el seguimiento hasta la inscripción. Ningún interesado se pierde por demora.',
      },
      {
        icon: 'material-symbols:payments-outline-rounded',
        titulo: '¿Cuántos socios entrenan hoy con la cuota vencida?',
        texto:
          'Automatizamos la cobranza: recordatorios, link de pago y estado de cuenta al día por socio. Cobras sin incomodar y sin perseguir a nadie.',
      },
      {
        icon: 'material-symbols:campaign-outline-rounded',
        titulo: '¿Un cambio de horario significa responder el mismo mensaje cincuenta veces?',
        texto:
          'Armamos comunicación segmentada automática: el aviso llega solo a los inscriptos de esa clase, por WhatsApp o app. Todos enterados, cero trabajo manual.',
      },
      {
        icon: 'material-symbols:autorenew-rounded',
        titulo: '¿Te enteras que un plan venció recién cuando el socio dejó de venir?',
        texto:
          'Implementamos renovaciones automáticas con aviso previo y link de pago antes del vencimiento. El plan se renueva antes de cortarse.',
      },
    ],
    pasos: {
      subtitulo:
        'Una app que acompaña a cada socio desde el primer día con un plan hecho para él. Menos rotación, más resultados, más fidelidad.',
      items: [
        {
          texto: 'El socio define sus objetivos al registrarse',
          imagen: '/img/transformacion/rubros/fitness/1-el-socio-define-sus-objetivos-al-registrarse.webp',
        },
        {
          texto: 'Recibe su plan personalizado al instante',
          imagen: '/img/transformacion/rubros/fitness/2-recibe-su-plan-personalizado-al-instante.webp',
        },
        {
          texto: 'Sigue su progreso semana a semana',
          imagen: '/img/transformacion/rubros/fitness/3-sigue-su-progreso-semana-a-semana.webp',
        },
        {
          texto: 'El gimnasio monitorea a cada cliente',
          imagen: '/img/transformacion/rubros/fitness/4-el-gimnasio-monitorea-a-cada-cliente.webp',
        },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:trending-down-rounded',
        titulo: 'Predictor de bajas de socios',
        texto:
          'Detecta patrones de menor asistencia o uso y alerta al equipo para intervenir antes de que el socio cancele.',
      },
      {
        icon: 'material-symbols:event-available-outline-rounded',
        titulo: 'Asistente de reservas de clases y canchas',
        texto:
          'Gestiona reservas, lista de espera y cancelaciones automáticamente, sin que el socio tenga que llamar o pasar por recepción.',
      },
      {
        icon: 'material-symbols:leaderboard-outline-rounded',
        titulo: 'Reporte de ocupación y rentabilidad por clase',
        texto:
          'Cruza asistencia, horarios e instructores para mostrar qué clases conviene potenciar, mover o discontinuar.',
      },
    ],
  },
  fintech: {
    h1: 'Servicios Financieros y seguros',
    nombre: 'fintech',
    subtitulo: 'Tu cartera crece. Tu carga administrativa, no.',
    imagenHero: '/img/transformacion/rubros/hero_servicio_financieros.webp',
    parrafo:
      'Trabajamos con <span class="text-amarillo font-medium">productores y brokers de seguros</span>, <span class="text-amarillo font-medium">asesores financieros</span>, <span class="text-amarillo font-medium">mutuales</span> y <span class="text-amarillo font-medium">fintechs</span>. Si los leads llegan por todos lados, las cotizaciones son manuales y la cartera se atiende solo cuando algo vence, <strong>te ayudamos a que la operación completa quede ordenada, medible y en automático</strong>.',
    problemas: [
      {
        icon: 'material-symbols:request-quote-outline-rounded',
        titulo: '¿Cotizar un seguro implica entrar a cinco portales distintos?',
        texto:
          'Implementamos un cotizador que consulta las compañías con las que trabajas y devuelve las opciones comparadas en una sola pantalla. Cotizas en minutos, no en horas.',
      },
      {
        icon: 'material-symbols:badge-outline-rounded',
        titulo: '¿Dar de alta un cliente es cargar los mismos datos cuatro veces?',
        texto:
          'El cliente completa sus datos una sola vez y el sistema los vuelca en formularios, pólizas y sistemas internos. Cero recarga, cero errores de tipeo.',
      },
      {
        icon: 'material-symbols:chat-outline-rounded',
        titulo: '¿Tus clientes te llaman para saber cómo va su siniestro?',
        texto:
          'Automatizamos el seguimiento: el cliente recibe cada actualización del trámite sin tener que preguntar. Menos llamados, clientes más tranquilos.',
      },
      {
        icon: 'material-symbols:account-balance-outline-rounded',
        titulo: '¿Conciliar comisiones con cada compañía te lleva días todos los meses?',
        texto:
          'Cruzamos automáticamente las pólizas emitidas contra las liquidaciones de cada compañía y marcamos las diferencias. Sabes exactamente qué te deben.',
      },
    ],
    pasos: {
      subtitulo:
        'Un agente que califica cada prospecto automáticamente y le entrega al asesor solo los que valen su tiempo. Ya con todo el contexto para cerrar.',
      items: [
        {
          texto: 'Los leads entran de múltiples fuentes',
          imagen: '/img/transformacion/rubros/fintech/1-los-leads-entran-de-multiples-fuentes.webp',
        },
        {
          texto: 'El sistema califica cada prospecto automáticamente',
          imagen: '/img/transformacion/rubros/fintech/2-el-sistema-califica-cada-prospecto-automaticamente.webp',
        },
        {
          texto: 'El asesor recibe el briefing completo',
          imagen: '/img/transformacion/rubros/fintech/3-el-asesor-recibe-el-briefing-completo.webp',
        },
        {
          texto: 'Solo trabaja los prospectos que valen su tiempo',
          imagen: '/img/transformacion/rubros/fintech/4-solo-trabaja-los-prospectos-que-valen-su-tiempo.webp',
        },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:event-upcoming-outline-rounded',
        titulo: 'Detector de pólizas o productos por vencer',
        texto:
          'Identifica vencimientos próximos y dispara la renovación o el contacto comercial antes de perder al cliente.',
      },
      {
        icon: 'material-symbols:loyalty-outline-rounded',
        titulo: 'Asistente de cross-selling personalizado',
        texto:
          'Cruza el perfil y la cartera de cada cliente para sugerir el producto financiero o seguro con mayor probabilidad de cierre.',
      },
      {
        icon: 'material-symbols:policy-outline-rounded',
        titulo: 'Evaluador automático de siniestros',
        texto:
          'Analiza la documentación de un siniestro y arma un informe preliminar con cobertura aplicable y montos estimados.',
      },
    ],
  },
  'servicios-profesionales': {
    h1: 'Servicios profesionales',
    nombre: 'servicios profesionales',
    subtitulo: 'Tecnología que libera al profesional de lo operativo para que haga lo que mejor sabe hacer.',
    imagenHero: '/img/transformacion/rubros/hero_servicio_profesionales.webp',
    parrafo:
      'Trabajamos con <span class="text-amarillo font-medium">estudios contables y jurídicos</span>, <span class="text-amarillo font-medium">consultoras</span>, <span class="text-amarillo font-medium">agencias</span> y <span class="text-amarillo font-medium">profesionales independientes</span>. Si tu equipo pierde horas cargando comprobantes, armando propuestas y persiguiendo pagos, te ayudamos a automatizar la operación para que el tiempo facturable vuelva a ser la prioridad.',
    problemas: [
      {
        icon: 'material-symbols:schedule-outline-rounded',
        titulo: '¿Cuántas horas trabajadas se te escapan sin facturar?',
        texto:
          'Implementamos registro automático de tiempos por cliente y proyecto, conectado directo a la facturación. Cada hora trabajada queda registrada y se cobra.',
      },
      {
        icon: 'material-symbols:folder-shared-outline-rounded',
        titulo: '¿Vives persiguiendo a tus clientes para que te manden la documentación?',
        texto:
          'Armamos un asistente que pide, recibe y ordena la documentación de cada cliente, con recordatorios automáticos. Tú recibes todo completo, sin perseguir a nadie.',
      },
      {
        icon: 'material-symbols:notifications-active-outline-rounded',
        titulo: '¿Los vencimientos dependen de la memoria de alguien del equipo?',
        texto:
          'Diseñamos sistemas de alertas de vencimientos impositivos, procesales y contractuales por cliente, con responsables y avisos escalonados. Ningún plazo se pasa.',
      },
      {
        icon: 'material-symbols:search-rounded',
        titulo: '¿La información de cada cliente vive repartida entre mails, WhatsApp y carpetas?',
        texto:
          'Centralizamos historial, documentos y conversaciones por cliente, con búsqueda inteligente sobre todo el archivo. Encuentras cualquier dato en segundos, no en una tarde.',
      },
    ],
    pasos: {
      subtitulo:
        'Un agente que lee tus comprobantes, los carga en un Excel y genera un informe de gastos automático. Sin cargar nada a mano.',
      items: [
        {
          texto: 'Sacas la foto del comprobante',
          imagen: '/img/transformacion/rubros/servicios-profesionales/1-sacas-la-foto-del-comprobante.webp',
        },
        {
          texto: 'La IA extrae los datos',
          imagen: '/img/transformacion/rubros/servicios-profesionales/2-la-ia-etxrae-los-datos.webp',
        },
        {
          texto: 'Se carga solo en el Excel',
          imagen: '/img/transformacion/rubros/servicios-profesionales/3-se-carga-solo-en-excel.webp',
        },
        {
          texto: 'El dashboard se actualiza',
          imagen: '/img/transformacion/rubros/servicios-profesionales/4-el-dashboard-se-actualiza.webp',
        },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:contract-outline-rounded',
        titulo: 'Asistente de contratos y términos de servicio',
        texto:
          'Redacta contratos y adendas a partir de los datos ya cargados del cliente; el responsable solo revisa y firma.',
      },
      {
        icon: 'material-symbols:receipt-long-outline-rounded',
        titulo: 'Asistente de facturación y cobranzas',
        texto:
          'El sistema detecta facturas vencidas, envía recordatorios automáticos y concilia pagos contra la cuenta corriente de cada cliente.',
      },
      {
        icon: 'material-symbols:request-quote-outline-rounded',
        titulo: 'Generador automático de propuestas y presupuestos',
        texto:
          'El cliente completa un brief o lo pide por mail; el sistema arma la propuesta con precios, alcance y condiciones en minutos.',
      },
    ],
  },
  'servicio-al-cliente': {
    h1: 'Servicio al cliente',
    nombre: 'servicio al cliente',
    subtitulo: 'Vende más en todos tus canales sin que la operación te pase por encima.',
    imagenHero: '/img/transformacion/rubros/hero_servicio_al_cliente.webp',
  },
  'e-commerce': {
    h1: 'Retail y E-commerce',
    nombre: 'e-commerce',
    subtitulo: 'Vende más en todos tus canales sin que la operación te pase por encima.',
    imagenHero: '/img/transformacion/rubros/hero_ecommerce.webp',
    parrafo:
      'Trabajamos con <span class="text-amarillo font-medium">tiendas online</span>, <span class="text-amarillo font-medium">mayoristas</span>, <span class="text-amarillo font-medium">marcas propias</span> y <span class="text-amarillo font-medium">retailers</span> que venden en TiendaNube, Shopify o Mercado Libre. Si el catálogo, el stock y las consultas te comen el día, y cada canal es una planilla distinta, te ayudamos a que toda la operación funcione sincronizada y sin carga manual.',
    problemas: [
      {
        icon: 'material-symbols:local-shipping-outline-rounded',
        titulo: '¿Tu bandeja explota de "¿dónde está mi pedido?"?',
        texto:
          'Automatizamos el seguimiento post-venta: el cliente recibe el estado de su envío en cada etapa, sin escribirte. Tu equipo deja de responder lo mismo cien veces por día.',
      },
      {
        icon: 'material-symbols:sync-rounded',
        titulo: '¿Vendiste en Mercado Libre algo que ya no tenías en stock?',
        texto:
          'Sincronizamos el stock entre todos tus canales de venta en tiempo real: tienda, marketplaces y local físico. Nunca más una venta que no puedes entregar.',
      },
      {
        icon: 'material-symbols:sell-outline',
        titulo: '¿Cambian los costos y actualizas los precios producto por producto?',
        texto:
          'Implementamos reglas de precios automáticas: cargas el nuevo costo y el sistema recalcula y publica en todos los canales. Tus márgenes quedan protegidos sin tocar nada a mano.',
      },
      {
        icon: 'material-symbols:shopping-cart-outline-rounded',
        titulo: '¿Cuántos carritos abandonados quedaron sin recuperar este mes?',
        texto:
          'Armamos secuencias automáticas de recuperación por mail y WhatsApp, adaptadas al producto y al momento del abandono. Ventas que dabas por perdidas vuelven solas.',
      },
    ],
    pasos: {
      subtitulo:
        'Un agente que lee tu catálogo en PDF y carga todos los productos en TiendaNube, Shopify, etc.',
      items: [
        {
          texto: 'Subes el catálogo en PDF',
          imagen: '/img/transformacion/rubros/ecommerce/1-subis-el-catalogo-en-pdf.webp',
        },
        {
          texto: 'La IA lee y extrae los productos con sus precios',
          imagen: '/img/transformacion/rubros/ecommerce/2-la-ia-lee-y-extrae-los-productos-y-precios.webp',
        },
        {
          texto: 'Se cargan solos en tu tienda web',
          imagen: '/img/transformacion/rubros/ecommerce/3-se-cargan-solos-en-tu-tienda-nube.webp',
        },
        {
          texto: 'Tu tienda está actualizada',
          imagen: '/img/transformacion/rubros/ecommerce/4-tu-tienda-esta-actualizada.webp',
        },
      ],
    },
    automatizaciones: [
      {
        icon: 'material-symbols:support-agent-rounded',
        titulo: 'Bot de IA automático para consultas pre-venta',
        texto:
          'El sistema lee tu catálogo y stock, y responde preguntas de talles, precios y disponibilidad por WhatsApp o chat al instante.',
      },
      {
        icon: 'material-symbols:photo-camera-outline-rounded',
        titulo: 'Generador de descripciones y fotos de producto',
        texto:
          'A partir de una foto y datos básicos, la IA redacta la descripción, arma variantes y optimiza la imagen para la tienda.',
      },
      {
        icon: 'material-symbols:query-stats-rounded',
        titulo: 'Reporte automático de ventas y rotación',
        texto:
          'Cruza ventas, stock y campañas para mostrarte qué productos rotan, cuáles reponer y dónde estás perdiendo margen.',
      },
    ],
  },
}
