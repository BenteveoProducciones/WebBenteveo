export const equipo = [
  ['eze-director', 'Eze', 'Director'],
  ['floppy-disenadora', 'Floppy', 'Diseñadora'],
  ['mariano-coordinacion-de-cuentas', 'Mariano', 'Coordinación de cuentas'],
  ['nahuel-creatividad', 'Nahuel', 'Creatividad'],
  ['cami-video', 'Cami', 'Video'],
  ['leo-coordinacion-diseno', 'Leo', 'Coordinación de diseño'],
  ['karen-performance-meta', 'Karen', 'Performance Meta'],
  ['mateo-coordinacion-realizacion', 'Mateo', 'Coordinación de realización'],
  ['mariela-moderacion-y-contenidos', 'Mariela', 'Moderación y contenidos'],
  ['ivan-disenador', 'Iván', 'Diseñador'],
  ['mariana-administracion', 'Mariana', 'Administración'],
  ['tomi-creatividad', 'Tomi', 'Creatividad'],
  ['joaquin-performance-sem', 'Joaquín', 'Performance SEM'],
  ['jorgelina-moderacion-y-contenidos', 'Jorgelina', 'Moderación y contenidos'],
  ['mati-produccion', 'Mati', 'Producción'],
  ['eugenio-maquetador', 'Eugenio', 'Maquetador']
].map(([slug, nombre, rol]) => ({ nombre, rol, foto: `/img/nosotros/equipo/${slug}.webp` }))

export const paises = ['Argentina', 'Chile', 'Uruguay', 'Estados Unidos']

export const metricas = [
  { value: '+15', label: ['Años de', 'trayectoria'] },
  { value: '+100', label: ['Proyectos', 'realizados'] },
  { value: '+40', label: ['Marcas que', 'confiaron'] }
]

export const premios = [
  { anio: '2014', premio: 'Premios Diente' },
  { anio: '2015', premio: 'Premios Consejo Publicitario Argentino', categoria: 'Campaña bien público' },
  { anio: '2016', premio: 'Premios Buenos Anuncios' },
  { anio: '2017', premio: 'Premio Promax', categoria: 'Campaña digital' },
  { anio: '2020', premio: 'Premios Eikon', categoria: 'Campañas Social Media' },
  { anio: '2020', premio: 'Premios Lápiz de Platino' },
  { anio: '2022', premio: 'Premios FePI' }
]

export const sectores = [
  { nombre: 'E-Commerce', icono: 'material-symbols:shopping-cart-outline-rounded' },
  { nombre: 'Agroindustria', icono: 'material-symbols:agriculture-outline-rounded' },
  { nombre: 'Real Estate', icono: 'material-symbols:apartment-rounded' },
  { nombre: 'Turismo', icono: 'material-symbols:travel-explore-rounded' },
  { nombre: 'Salud', icono: 'material-symbols:medical-services-outline-rounded' },
  { nombre: 'Educación', icono: 'material-symbols:school-outline-rounded' },
  { nombre: 'Fitness', icono: 'material-symbols:fitness-center-rounded' },
  { nombre: 'Fintech', icono: 'material-symbols:account-balance-outline-rounded' },
  { nombre: 'Servicios profesionales', icono: 'material-symbols:business-center-outline-rounded' },
  { nombre: 'Servicio al cliente', icono: 'material-symbols:support-agent-rounded' }
]
