const {Products,Users, Categories} = require('../db')

const belleza =  [[ 
      {
        name: "Cepillo Alisador Babyliss Pro Eléctrico Nano Titanium",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_658652-MCO43349304753_092020-O.webp"],
        price: 148900,
        stock: 10,
        description:
          "Cepillo diseñado para retoque y acabados con resultados de salón, ayuda a conservar tus cepillados y alisados con planchas. Superficie con Tecnología Nano Titanium Sol-Gel para un agarre más fuerte y un alisado suave. Tecnología generadora de Iones para un cabello brillante y liso. Base de cerdas metálicas de una sola pieza para una óptima transferencia de calor. Cerdas con mezcla de silicona y plástico para un mejor agarre del cabello que distribuyen uniformemente el calor y agregan brillo mientras protege el cuero cabelludo.",
      },
      {
        name: "Crema Aclarante Despigmentante Intimo Piel De Oro Grande",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_630108-MCO43682659107_102020-O.webp"],
        price: 49900,
        stock: 10,
        description:
          "Despigmentante Íntimo Piel de Oro – Aclara y mejora el tono de la piel en zonas con pigmentaciones oscuras.",
      },
      {
        name: "Aerosol Antibacterial Con Alcohol Y Glicerina Y Aloe Vera",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_843977-MCO43181272914_082020-O.webp"],
        price: 9990,
        stock: 10,
        description:
          "Excelente producto para todas superficies y toda clase de pieles, cuida tu piel ya que trae glicerina y aloe vera.",
      },
      {
        name: "Secador de cabello Remington D3190 violeta 125V",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_694898-MLA48957358407_012022-O.webp"],
        price: 128000,
        stock: 10,
        description:
          "Si hay algo que no puede faltar en tu tocador es una secadora de cabello Remington D3190. En ondas, rulos, lacio, úsala como más te guste. Este producto se encargará de cuidar la salud del pelo y de crear el look perfecto para cada ocasión. Es pequeña, liviana y viene a completar tu set de belleza en el hogar.",
      },
      {
        name: "Labial Mate Studio Look – Cyzone",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_644558-MCO45828068953_052021-O.webp"],
        price: 12900,
        stock: 10,
        description:
          "El favorito de todas. Labial líquido Studio Look mate de larga duración, un must-have para combinar todos tus looks.",
      },
      {
        name: "Paleta De Sombras Eye Pro Ésika",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_813596-MCO46729099363_072021-O.webp"],
        price: 34900,
        stock: 10,
        description:
          "Paleta de sombras profesional Eye Pro. Sombras de ojos de alta pigmentación y ultra fijación, para que reflejes tu estilo con las últimas tendencias del maquillaje. Elige 12 tonos de tendencias de calidad profesional. Con texturas ultra suaves y de fácil difuminación para un acabado intenso y profesional. Su fórmula cuenta con pigmentos ultra finos que permiten dar color intenso desde la primera pasada. Acabados: mate y metálicos. No es testeado en animales. Capacidad: 7g.",
      },
      {
        name: "Paleta 56 Sombras Dolce Bella",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_997174-MCO40007027552_122019-O.webp"],
        price: 60900,
        stock: 10,
        description:
          "La paleta de la image es la que tenemos disponible en esta referencia. Si quieres ver más referencias te invitamos a hacer click en “ver más datos de este vendedor” en la sección información sobre el vendedor; Allí encontrarás todo lo que buscas para resaltar tu belleza.",
      },
      {
        name: "Serum Ácido Hialurónico Revital",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_674479-MCO47556716877_092021-O.webp"],
        price: 58990,
        stock: 10,
        description:
          "El Serum de Revitalift Acido hialuronico es un producto complementario a la rutina diaria. Tiene una concentracion de 1,5% de Acido Hialuronico Puro donde -40% de lineas de expresion visiblemente son reducidas en 4 semanas. Al aplicar el serum la piel se sentira hidratada, elsatica y fresca. En la semana 1, la piel luce radiante, se siente rellenada y firme. En la semana 2, las lineas de expresion se reducen (-19%) y las arrugas se reducen (-14%). Finalmente, en la cuarta semana las lineas de expresion se reducen (-40%) y las arrugasse reducen (-31%). Se recomienda utilizar el Serum cada mañana y noche, aplicando 2-3 gotas en el rostro y cuello, evitando el area de los ojos. Para mejores resultados, usa el resto de la gama Revitalift Acido hialuronico.",
      },
      {
        name: "Serum Express Aclara Antimancha",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_855452-MLA46194414342_052021-O.webp"],
        price: 26915,
        stock: 10,
        description:
          "El Booster Sérum Anti Manchas de Express Aclara tiene activos concentrados para resultados rápidos y una textura ligera y de toque seco. Este suero está enriquecido con Vitamina C°, extracto de limón y ácido salicílico. En sólo 3 días la piel se ve visiblemente uniforme*. Además, nuestro productos están aprobados oficialmente por Cruelty Free International en el marco del Leaping Bunny Programme. (°Derivado) (*Basado en estudios de eficacia y percepción).",
      },
      {
        name: "Cera Barbershop Moldeadora Y Fijadora",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_643585-MCO46520493141_062021-O.webp"],
        price: 18900,
        stock: 10,
        description:
          "Una manera extrema y moderna para dar forma a su cabello. Esta cera moldeadora y fijadora, da una fijación extrema ó fuerte, especial para dar forma al cabello. Contiene Biotina, Pantenol y Keratina, acondicionadores capilares ampliamente utilizados en la reparación de todo tipo de cabellos, especialmente los maltratados.",
      },
      {
        name: "Rechiol - Hendel - Crema Facial Hidratante Y Rejuvenecedora",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_966905-MCO46430888421_062021-O.webp"],
        price: 97500,
        stock: 10,
        description:
          "El bakuchiol activa la producción de colágeno de tipo I, III y IV (el retinol 'es responsable' solo del colágeno de tipo I) e inhibe el trabajo de las enzimas que interrumpen el metabolismo de las proteínas y las células de la piel. No solo actúa en la superficie de la epidermis, sino que también penetra en las capas más profundas de la dermis, desencadenando el mecanismo de renovación celular desde el interior.",
      },
      {
        name: "Maquina Afeitar Electrica Barbera Patillera Accesorios Prof.",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_918522-MCO49256699539_032022-O.webp"],
        price: 100000,
        stock: 10,
        description:
          "HTC1201 Corte de pelo, afeitado y otros usos. Recortador de nariz, 5 en 1, completo. Puede cambiar la cabeza para adaptarse al uso. Lo ayuda a cortar y afeitarse con diversión profesional. Las cuchillas están hechas de acero inoxidable, bien cortadas, adecuadas para muchas aplicaciones.",
      },
      {
        name: "Herbacol Flash Cubrecanas Tonic",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_649807-MCO47515954545_092021-O.webp"],
        price: 20390,
        stock: 10,
        description:
          "Elaborados con extractos de plantas herbales y pigmentos orgánicos, libre de amoniaco, peróxido y parabenos, nuestros cubrecanas naturales cubren la cana perfectamente dandole la apariencia de mechones naturales, ayudan a combatir la caída del cabello y lo dejan brillante, humectado y suave. especiales para personas en tratamientos medicos fuertes, alérgicos a los químicos. tenemos 3 diferente cubrecanas para cada necesidad.",
      },
      {
        name: "Kit Keratina Keratimask Liso Brasileño ",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_648097-MCO44041488019_112020-O.webp"],
        price: 52900,
        stock: 10,
        description:
          "Una solución perfecta para conseguir un cabello completamente liso hasta 12 semanas desde tu casa. Además, tu pelo se verá mucho más suave, el peinado se facilitará y no tendrás que utilizar en ningún momento planchas.",
      },
      {
        name: "Seda Dental Flossers X 100 Unid ",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_778385-MCO46485275678_062021-O.webp"],
        price: 15900,
        stock: 10,
        description: "Recibes Hilo Dental Gum Flossers Fuerte 100 Unidades,",
      },
      {
        name: "Gel Aloe Vera Bacc Sábila Hidrata Humecta Acné Quemaduras",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_664569-MCO48994873555_022022-O.webp"],
        price: 17900,
        stock: 10,
        description:
          "Es un producto 'Multibeneficios' que no puede faltar en tu hogar, apto para uso de toda la familia!",
      },
      {
        name: "Maquina De Afeitar Clásica En Ace ",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_662251-MCO47251245154_082021-O.webp"],
        price: 13490,
        stock: 10,
        description:
          "LA MEJOR MAQUINA EN ACERO 100% INOXIDABLE CON GARANTIA, CUCHILLA DOBLE FILO RIMEI IMPORTADA. promoción por tiempo limitado: maquina de afeitar clásica en acero inoxidable de calidad inmejorable garantizada + cuchilla doble filo. ",
      },
      {
        name: "Dosificador De Jabón Liquido, Alcohol 500 Ml ",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_930089-MCO49086201308_022022-O.webp"],
        price: 18000,
        stock: 10,
        description:
          "Fácil instalación por medio de chazos , válvula anti goteo, la cual entrega la medida necesaria del producto.",
      },
      {
        name: "Shampo Y Tratamiento Frenchs Gold 500ml Libre De Sal",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_665747-MCO45061174889_032021-O.webp"],
        price: 40000,
        stock: 10,
        description:
          "Shampo Especial para Conservar la keratina, permitiendo que tu cabello permanezca mas tiempo liso, Ofrece un Brillo Tipo espejo a tu cabello.",
      },
      {
        name: "Copa Menstrual Certificada Fda + Vaso Esterilizador",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_831203-MCO46799783068_072021-O.webp"],
        price: 25555,
        stock: 10,
        description:
          "COPA MENSTRUAL: es un recipiente reutilizable que se inserta en la vagina durante la menstruación para depositar el flujo menstrual.",
      }], "BELLEZA"
]

const muebles =  [[
      {
        name: "Juego De Sala Con Sofacama + Poltrona + Puff + Mesa De Centr",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_999523-MCO48711147536_122021-O.webp"],
        price: 2149900,
        stock: 10,
        description:
          "name: Juego De Sala Con Sofacama + Poltrona + Puff + Mesa De Centro Marca: Alameda",
      },
      {
        name: "Closet Tera Wengue",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_771941-MCO44514878145_012021-O.webp"],
        price: 353900,
        stock: 10,
        description:
          "Tenemos envíos totalmente gratis a ciudades principales e intermedias (zona urbana), consulta el listado completo de envíos en la última image de la publicación, si estás ubicado en otro municipio puedes preguntarnos por la cobertura.",
      },
      {
        name: "Combo Cama Closet Y Mesas De Noche Maderkit 01163-prm",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_833109-MCO48209107611_112021-O.webp"],
        price: 1199900,
        stock: 10,
        description:
          "Medidas: 254 cm Ancho x 200 cm Alto x 40 cm Fondo (Closet) - 140 cm Ancho x 31 cm Alto x 190 cm de Largo (Cama)",
      },
      {
        name:
          "Silla de escritorio Ergonomus Sally negra con tapizado de mesh y cuero sintético",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_865004-MLA48009568948_102021-O.webp"],
        price: 409200,
        stock: 10,
        description:
          "La selección de una silla adecuada es muy importante para prevenir futuras lesiones. Con esta silla Ergonomus, tendrás la comodidad y el bienestar que necesitas a lo largo de tu jornada. Además, puedes ubicarla en cualquier parte de tu casa u oficina ya que su diseño se adapta a múltiples entornos. ¡Dale a tus espacios un toque más moderno!",
      },
      {
        name: "Silla Sillon Ejecutivo Oficina Reclinable Ergonomica",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_768076-MCO48198147831_112021-O.webp"],
        price: 309900,
        stock: 10,
        description:
          "Esta Silla de Oficina ofrece la máxima comodidad y un diseño elegante y de líneas simples. Es apta para un uso profesional continuado durante una jornada laboral en despachos, oficinas u otros espacios de trabajo, ya que su asiento cuenta con doble acolchado para aumentar el confort.",
      },
      {
        name: "Sala Con Sofa Poliester + Mesa Centro + Juego De Comedor 4 P",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_922222-MCO48711065415_122021-O.webp"],
        price: 2599900,
        stock: 10,
        description:
          "name: Sala Con Sofa Poliester + Mesa Centro + Juego De Comedor 4 Puestos Marca: Alameda",
      },
      {
        name: "Silla Oficina Ergonómica Apoyacabezas Brazos Ajustables",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_986317-MCO41999916333_052020-O.webp"],
        price: 409900,
        stock: 10,
        description:
          "Material: Tela micro perforada tipo malla. Marco en polipropileno negro Dimensiones: 46 cm de ancho x 46 cm de alto.      Apoyacabezas basculante y graduable en altura",
      },
      {
        name: "Closet Bariloche Wengue",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_727618-MCO44347628385_122020-O.webp"],
        price: 773900,
        stock: 10,
        description:
          "*Amplio espacio y entrepaños para organizar *Seis ( 6 ) puertas abatibles. *Tres ( 3) tubos cromados para colgar ropa. *Dos ( 2 ) cajones organizadores multiuso *Manijas metálicas 4 *Deslizadores plásticos para apoyo al piso *Incluye manual de ensamble",
      },
      {
        name: "Natural - Combo: Cama + Mesas + Rack Tv Moderno",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_843146-MCO48269122509_112021-O.webp"],
        price: 909900,
        stock: 10,
        description:
          "name: Wengue - Combo: Cama + Mesas + Rack Tv Moderno Un estilo único moderno, con un diseño que encajara en todos tus espacios de calidad especial.",
      },
      {
        name: "Escritorio Axis Wengue",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_945737-MCO45043633570_032021-O.webp"],
        price: 220900,
        stock: 10,
        description:
          "Tenemos envíos totalmente gratis a ciudades principales e intermedias (zona urbana), consulta el listado completo de envíos en la última image de la publicación, si estás ubicado en otro municipio puedes preguntarnos por la cobertura.",
      },
      {
        name: "Sala De Jardín Brienz",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_891475-MCO45307016196_032021-O.webp"],
        price: 4429900,
        stock: 10,
        description:
          "Tenemos envíos totalmente gratis a ciudades principales e intermedias (zona urbana), consulta el listado completo de envíos en la última image de la publicación, si estás ubicado en otro municipio puedes preguntarnos por la cobertura.",
      },
      {
        name: "Combo Sofacama Tapizado + Poltrona + Puff + Mesa Centro",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_680272-MCO48711654471_122021-O.webp"],
        price: 2726400,
        stock: 10,
        description:
          "name: Combo Sofacama Tapizado + Poltrona + Puff + Mesa Centro 4 Sala Dominic En Tela + Mesa Centro Montreal",
      },
      {
        name: "Mesa De Noche Otom 63x40x35 Blanco Nevado Y Rovere",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_820856-MCO47588707035_092021-O.webp"],
        price: 179900,
        stock: 10,
        description: "Mesa De Noche Otom 63x40x35 Blanco Nevado y Rovere",
      },
      {
        name: "Cama Multifuncional 120 Cm Ancho Maderkit M01290-prm",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_624062-MCO48174391751_112021-O.webp"],
        price: 1999900,
        stock: 10,
        description:
          "Atributos: Cama semidoble para colchón de 120 cm x 190 cm (No incluye colchón), Cómoda con 3 cajones, compartimiento para colgar y entrepaños para doblar, puertas abatibles y cajones sin manija. Incluye escritorio extensible con entrepaños. Cuenta con escalera que se puede ubicar para ambos lados de la cama.",
      },
      {
        name: "Combo Sofa En Tela Poliester + Poltrona",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_738529-MCO48710852327_122021-O.webp"],
        price: 1629900,
        stock: 10,
        description:
          "name: Combo Sofa En Tela Poliester + Poltrona Marca: Alameda",
      },
      {
        name: "Escritorio Gamer Max Color Wengue Neo",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_673510-MCO46923104934_072021-O.webp"],
        price: 388900,
        stock: 10,
        description:
          "Consta de: Altillo para monitor, espacio para torre de computador, 1 cajón,1 puerta abatible Material: Fabricado en Madera Aglomerada (MDP) y Cubierta en Melamínico. Producto listo para armar (Requiere proceso de armado).",
      },
      {
        name: "Cama Abatible Multifuncional 90cm Ancho Maderkit M01310-prm",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_965257-MCO47081846369_082021-O.webp"],
        price: 1489900,
        stock: 10,
        description:
          "Atributos: Cama Sencilla Multifuncional, permite ocultar la cama cuando no se esta utilizando haciendo visible la repisa decorativa, cuenta con 8 compartimientos (4 con puertas). Un producto ideal para optimizar espacios. La cama sencilla soporta hasta 100 kg de peso y tiene capacidad para un colchón de 90 cm de ancho x 190 cm de largo, incluye tendido de tablas (No incluye colchón)",
      },
      {
        name: "Juego De Sala Para Exterior",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_817839-MCO45303295007_032021-O.webp"],
        price: 4774900,
        stock: 10,
        description:
          "Tenemos envíos totalmente gratis a ciudades principales e intermedias (zona urbana), consulta el listado completo de envíos en la última image de la publicación, si estás ubicado en otro municipio puedes preguntarnos por la cobertura.",
      },
      {
        name: "Closet Entretenimiento Eco, Wengue",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_860122-MCO48196318025_112021-O.webp"],
        price: 323900,
        stock: 10,
        description:
          "Tenemos envíos totalmente gratis a ciudades principales e intermedias (zona urbana), consulta el listado completo de envíos en la última image de la publicación, si estás ubicado en otro municipio puedes preguntarnos por la cobertura.",
      },
      {
        name: "Combo Cama Doble + 2 Mesas De Noche + Rack De Tv",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_920229-MCO48270279083_112021-O.webp"],
        price: 999900,
        stock: 10,
        description:
          "name: Combo Cama Doble + 2 Mesas de Noche + Rack de Tv Marca: Alameda",
      }], "MUEBLES"
]

const deportes =  [[
      {
        name: "Kit De Pesas Ejercicio Mancuernas Juego De Pesas Termoforrad",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_745562-MCO48775539939_012022-V.webp"],
        price: 159900,
        stock: 10,
        description:
          "Home Sale traen para ti esta espectacular Set de Mancuernas de 20 KG/40LB , ahora realizar tu rutina de ejercicio será más fácil, ya que cuentas con una de las mejores Set de Mancuernas calidad/price. El entrenamiento con pesas es uno de los deportes de fuerza más eficaces y es también muy bueno en el área de la salud y buen estado físico, así como para la rehabilitación. Los músculos se fortalecen y simultáneamente se moldean con el uso de las pesas. Por lo tanto, un entrenamiento de pesas no tiene sólo un efecto deportivo sino también un efecto estético. Con el entrenamiento de pesas la grasa corporal se reduce más eficientemente que, por ejemplo, con el ciclismo, la natación o las salidas a correr.",
      },
      {
        name: "Banco Para Pesas Abdominales Sportfitness Plegable Multiposi",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_627753-MCO43156408639_082020-O.webp"],
        price: 349900,
        stock: 10,
        description: "Banco Para Pesas Abdominales Plegable Multiposión",
      },
      {
        name: "Bicicleta estática Home Sale Spinning negra y roja",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_988811-MLA47962938252_102021-O.webp"],
        price: 649900,
        stock: 10,
        description:
          "Con esta bicicleta haz spinning, una de las actividades más completas para realizar en casa o en el gimnasio. La inercia del volante es resistente y permite mayores posibilidades de ejercicio. Diviértete al simular el pedaleo rápido, fuertes subidas de montaña y ejercítate al ritmo de la música.",
      },
      {
        name: "Kit De Pesas Ejercicio Mancuernas Juego De Pesas Termoforrad",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_722903-MCO49006414022_022022-O.webp"],
        price: 184900,
        stock: 10,
        description:
          "El entrenamiento con pesas es uno de los deportes de fuerza más eficaces y es también muy bueno en el área de la salud y buen estado físico, así como para la rehabilitación. Los músculos se fortalecen y simultáneamente se moldean con el uso de las pesas. Por lo tanto, un entrenamiento de pesas no tiene sólo un efecto deportivo sino también un efecto estético. Con el entrenamiento de pesas la grasa corporal se reduce más eficientemente que, por ejemplo, con el ciclismo, la natación o las salidas a correr.",
      },
      {
        name: "Kit Bandas Resistencia Tela, Alta Calidad 3",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_831983-MCO47780159336_102021-O.webp"],
        price: 38675,
        stock: 10,
        description:
          "Bandas con los mejores acabados y de alta calidad Elige el kit x 3 bandas que más le guste, Excelente en Calidad y price",
      },
      {
        name: "Maquina Para Abdominales Ab Slimmer Soporte Abdominal Gym",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_663426-MCO47261447265_082021-O.webp"],
        price: 119900,
        stock: 10,
        description:
          "En la comodidad de tu casa podrás realizar estos ejercicios que te ayudarán a conseguir abdominales sexys y a ejercitar brazos y piernas. Además, esta máquina de ejercicios no quita mucho espacio por su diseño ergonómico y plegable.",
      },
      {
        name: "Set Kit Mancuernas Pesas 2, 3 Y 5 Lbs Forro Neopreno Y Sopor",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_676364-MCO47695129914_092021-O.webp"],
        price: 169900,
        stock: 10,
        description:
          "Este kit incluye tres pares de mancuernas en tamaños de 2 libras, 3 libras y 5 libras, para que pueda elegir la cantidad de peso adecuada para su rutina, preferencia y número de repeticiones. El juego de mancuernas de 20 libras es una gran elección tanto para principiantes como para entusiastas avanzados del fitness.",
      },
      {
        name: "Lazo Cuerda Velocidad 3m Balinera Guaya Gym Crossfit Saltar",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_944742-MCO48246032783_112021-O.webp"],
        price: 24900,
        stock: 10,
        description:
          "Cuerda para saltar profesional de alta velocidad de 3 metros, mangos ajustables con DOBLE BALERO, cable de acero trenzado ligero con forro de poliuretano térmico, soporta hasta 200 revoluciones por minuto.",
      },
      {
        name:
          "Bicicleta estática plegable Home Sale X Bike tradicional gris y negra",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_901863-MLA47754578105_102021-O.webp"],
        price: 474900,
        stock: 10,
        description:
          "La bicicleta tradicional es una de las mejores elecciones a la hora de pensar la postura corporal, ya que al usarla el cuerpo toma su forma natural. Es el formato que menos espacio ocupa en el hogar y es práctica de trasladar.",
      },
      {
        name: "Pesas Discos Kit Barra Recta Ó Curva Ó Roma+mancuerna 57llb",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_942098-MCO46724036375_072021-O.webp"],
        price: 289900,
        stock: 10,
        description:
          "Robusto y sólido, discos en hierro de alta calidad. Comparado a las pesas normales, contiene cierres de rosca en sus barras para asegurar que los discos estén firmemente unidos a estas. Las barras y seguros mariposa están hechas en acero reforzado de alta calidad y recubiertas en cromo, Las barras de las mancuernas cuentan con agarre en caucho para mayor seguridad.",
      },
      {
        name: "Banda Caminadora Trotadora Eléctrica Plegable Hp",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_793633-MCO49004099860_022022-O.webp"],
        price: 1039900,
        stock: 10,
        description:
          "La CAMINADORA TROTADORA es la mejor opción para lograr resultados positivos, si su objetivo es: Bajar de peso, Tonificar, entrenar desde casa y tener una Vida Saludable. Con la Trotadora aumentará toda su capacidad cardiopulmonar mejorando su calidad de vida en grandes proporciones. La sensación al correr en esa trotadora será de plenitud y confianza al sentir la calidad de sus componentes y ergonomía.",
      },
      {
        name: "Set Kit De Bandas Elásticas Cerradas Pequeñas (juego 5)",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_883380-MCO44294247747_122020-O.webp"],
        price: 24900,
        stock: 10,
        description: "Set de bandas elásticas (juego x 5) Material: Latex",
      },
      {
        name: "Rueda Abdomen Gym Rodillo Doble Ejercicio De Brazo Espalda",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_822279-MCO27830638026_072018-O.webp"],
        price: 23900,
        stock: 10,
        description:
          "BENEFICIOS: FORTALECE ES SISTEMA CARDIOVASCULAR, MEJORA LA CIRCULACIÓN SANGUÍNEA ELIMINA LOS EXCESOS DE GRASA DEL CUERPO.",
      },
      {
        name: "Hand Grip Ejercitador Mano Muñeca Antebrazo Gradúa Rehabilit",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_621450-MCO43428070395_092020-O.webp"],
        price: 16900,
        stock: 10,
        description:
          "Se ajusta fácilmente de 10KG a 40 KG resistencia con un giro de la perilla roja.",
      },
      {
        name: "Bandas De Poder Elasticas Pesas Uso Como Pesas Mancuernas",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_783352-MCO42467689326_072020-O.webp"],
        price: 34900,
        stock: 10,
        description:
          "- Si no dispone de tiempo para ir al gimnasio a hacer musculación o fitness, las bandas ofrecen diferentes resistencias para distintos niveles de fuerza.",
      },
      {
        name: "Banda Caminadora 4 En 1 Plegable Con Twister Y Escalador",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_750732-MCO48775726586_012022-O.webp"],
        price: 759900,
        stock: 10,
        description: "-Estructura metálica de alta resistencia.",
      },
      {
        name: "Tabla Push Up Sistema Flexiones Pecho Hombro Brazo Espalada",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_719452-MCO45797645420_052021-O.webp"],
        price: 39400,
        stock: 10,
        description:
          "Tabla de entrenamiento push up sistema plegable multifunción 9 en 1 entrenamiento portátil gimnasio soportes de ejercicio para entrenamiento de fitness en casa.",
      },
      {
        name: "Colchoneta Profesional Sportfitness Ejercicio Abdominal Gym",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_852002-MCO49404532101_032022-O.webp"],
        price: 72900,
        stock: 10,
        description:
          "La Colchoneta para Abdominales Profesional Sportfitness ofrece la comodidad para mantener la alineación correcta del cuerpo protegiendo su espalda.",
      },
      {
        name: "Banco Pesas Abdominales Ufc Deluxe Mancuernas Plegable Gym",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_757046-MCO47837417109_102021-O.webp"],
        price: 925000,
        stock: 10,
        description:
          "El Banco Multifuncional Deluxe FID-UFC es un equipo muscular para moldear brazos, bíceps, tríceps y pecho.",
      },
      {
        name: "Banda Elastica Fortalecimiento Mano Dedos X 2u ¡envio Ya¡",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_751604-MCO47863558883_102021-O.webp"],
        price: 18549,
        stock: 10,
        description:
          "- La banda de resistencia y fuerza de dedos y Muñecas son ideales para escalada, entusiastas de los deportes de pelota y músicos, sirven para aumentar la fuerza y flexibilidad de los dedos; también es adecuado para personas que usan regularmente ordenadores y teléfonos móviles para aliviar la fatiga y la incomodidad de la mano, prevenir el dolor en las articulaciones y dolores musculares.",
      }], "DEPORTES"
]

const electrodomesticos =  [[
      {
        name: "Estufa Romero Torre Haceb 50 Cms Gas Natural Negra",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_865191-MCO45241779530_032021-O.webp"],
        price: 541112,
        stock: 10,
        description:
          "Con cuatro fogones de diferentes tamaños para versatilidad en la cocción, parrilla continua antideslizante que da estabilidad a los recipientes y horno de gran capacidad con visor amplio para hacer seguimiento a sus recetas. Además, el respaldo único de servicio Haceb.",
      },
      {
        name: "Nevera Haceb Siberia 240 Litros Manija Integrada Titanio",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_861351-MCO47311932385_082021-O.webp"],
        price: 1307600,
        stock: 10,
        description:
          "Con excelente diseño que se integra perfectamente con tu espacio y le dan un aire moderno y minimalista, gracias a su diseño de manija integrada.",
      },
      {
        name: "Freidora De Aire Imusa Easy Fry Deluxe 4,2l Digital",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_859295-MCO47877846824_102021-O.webp"],
        price: 389900,
        stock: 10,
        description:
          "La Freidora de Aire IMUSA Easy Fry Deluxe 4,2L digital, te permite realizar recetas saludables para toda la familia, requiere poco o inclusive nada de aceite, para freir, asar y hornear todas tus comidas favoritas. Su capacidad de 4,2 litros te permitirá realizar hasta 6 porciones a la vez. Su pantalla táctil digital hace más óptimo y fácil la preparación de las recetas.",
      },
      {
        name: "Lavadora Semiautomática Electrolux Etb14m3msupw 14kg",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_659073-MCO44116425716_112020-O.webp"],
        price: 999900,
        stock: 10,
        description:
          "La lavadora ETB14M3MSUPW Electrolux es semiautomática con doble tina de 14kg que con su fácil manejo y efectivo funcionamiento ahora podrás darle la limpieza y cuidado adecuado a toda tu ropa en un menor tiempo y sin desaprovechar tu tiempo libre.",
      },
      {
        name: "Nevera Himalaya 404 Litros Haceb - Control Interno - Titanio",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_977862-MCO46567699495_062021-O.webp"],
        price: 1828200,
        stock: 10,
        description:
          "Combinación de diseño, potencia, eficiencia y capacidad. Se integra perfectamente con tu espacio dándole un aire moderno y minimalista.",
      },
      {
        name: "Aspiradora Black+Decker Power Pro VCBD8530 2.5L verde 220V",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_982776-MLA47608794870_092021-O.webp"],
        price: 399900,
        stock: 10,
        description:
          "Cuenta con un eficiente sistema de filtrado que retiene la suciedad y hace que el aire que sale del aparato sea totalmente puro y libre de partículas que producen molestias respiratorias.",
      },
      {
        name: "Lonchera Eléctrica Kalley Porta Comida 1.1lt, Garantía 1 Año",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_641609-MCO46234428206_062021-O.webp"],
        price: 54900,
        stock: 10,
        description:
          "Ahora puedes llevar tus alimentos contigo a donde sea que vayas y calentarlos de forma inmediata, fácil y cómoda. La lonchera eléctrica Kalley K-MLE60G2 cuenta con una capacidad de 1.1 litros e incluye 2 recipientes y 1 cuchara para llevar tus preparaciones.",
      },
      {
        name:
          "Plancha de cabello Remington Frizz Therapy Frizz Control S8510 morada 120V/240V",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_697043-MLA46429695491_062021-O.webp"],
        price: 141550,
        stock: 10,
        description:
          "Remington es una marca líder en el mercado que impulsa la innovación y ofrece un servicio excepcional a sus usuarios. La plancha, al igual que su extensa línea de productos, está creada con materiales y tecnologías de gran nivel por lo que es una excelente compañera para tu rutina de belleza.",
      },
      {
        name:
          "Aspiradora trapeadora robot Eufy RoboVac G10 Hybrid negra 100V/240V",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_739390-MLA45993650271_052021-O.webp"],
        price: 999995,
        stock: 10,
        description:
          "La marca Eufy desarrolla electrodomésticos inteligentes, fáciles de usar y pensados para mejorar la vida de sus clientes. La G10 Hybrid hará la tarea por ti y te permitirá ahorrar tiempo y esfuerzo.",
      },
      {
        name: "Lavadora Carga Superior Con Agitador Electrolux L17ac 17kg",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_745630-MCO42230787264_062020-O.webp"],
        price: 1499900,
        stock: 10,
        description:
          "La lavadora L17AC Electrolux está diseñada pensando en el cuidado de la ropa, cuenta con un dispensador de suavizante y cloro, iluminación de estado de ciclo. Su tina es en acero inoxidable y su tapa es en cristal enmarcada",
      },
      {
        name: "Pesa Balanza Inteligente Bluetooth Grasa Peso Corporal",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_740684-MCO48256255595_112021-O.webp"],
        price: 41900,
        stock: 10,
        description:
          "La báscula inteligente es tu mejor asistente para la salud, te permite medir y controlar 8 métricas corporales diferentes, con sincronización directa con la APP para celular. Esta técnica con funcionalidad Bluetooth permiten que toda la familia comparta una sola báscula para llevar los registros de las mediciones necesarias para una óptima salud. Mantente a ti y a tu familia siempre saludables!",
      },
      {
        name: "Cafetera Italiana Aluminio Holstein Roja 6 Tazas",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_782967-MCO32547423511_102019-O.webp"],
        price: 54900,
        stock: 10,
        description:
          "Cafetera con cobertura en aluminio. Capacidad de 6 tazas tipo expresso (tazas con capacidad de 66ml cada una o capacidad de 2 tazas de tinto grandes). Color Rojo Metalizado. Diseño de asa ergonómico. Tiene válvula de seguridad. De fácil uso. Para lograr café recien hecho en casa. Tapa qua abre en sentido vertical. Elaborada en China.",
      },
      {
        name: "Kit 3 Repuestos Para Filtro Purificador Ecotrade Filters",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_601569-MCO49160389419_022022-O.webp"],
        price: 70000,
        stock: 10,
        description:
          "KIT 3 REPUESTOS PARA FILTRO PURIFICADOR AGUA ECOTRADE Y ECOFILTER",
      },
      {
        name: "Ventilador Altezza 3 En 1 Aspa Tiburon Blanco",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_833798-MCO47004843804_082021-O.webp"],
        price: 113900,
        stock: 10,
        description:
          "• Ventilador pedestal 16p base cruz. • Color: Blanco • 3 Velocidades • Hélice: tipo banana. • Material de la base: Metal. • Voltaje: 110V - 60Hz. • Potencia: 45 Watts. • Malla metálica. • Clavija de dos entradas.",
      },
      {
        name: "Licuadora Oster BEST02-E01 1.5 L gris con vaso de vidrio 120V",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_931606-MLA46238334742_062021-O.webp"],
        price: 289900,
        stock: 10,
        description:
          "Durante décadas Oster está comprometida en el lanzamiento de productos domésticos para que sientas la pasión de crear nuevas recetas con facilidad. Descubre un mundo de posibilidades en la cocina con la licuadora BEST02-E01 y dale rienda suelta a la creatividad.",
      },
      {
        name: "Plancha Para La Barba Y Pelo De Hombre Cepillo De Cabello",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_778426-MCO47753026552_102021-O.webp"],
        price: 15900,
        stock: 10,
        description:
          "Esta plancha calienta rápidamente, en aproximadamente 15 segundos, el calentamiento uniforme evita 'puntos calientes' evitando quemaduras.",
      },
      {
        name: "Mini Maquina Coser Portatil 2 Velocidades Control Pedal 4en1",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_932989-MCO32590764615_102019-O.webp"],
        price: 59800,
        stock: 10,
        description:
          "Mini máquina de coser de 2 velocidades ofrece doble hilo y un perfecto control de puntadas, Para cualquier costura de telas livianos; Interruptor de mano o pedal para iniciar La bobina superior permite un fácil enhebrado; Rebobinado automático de hilo",
      },
      {
        name: "Waflera Hamilton Beach",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_898432-MCO43696506909_102020-O.webp"],
        price: 123405,
        stock: 10,
        description:
          "• Versátil y delicioso • Acero inoxidable de calidad superior • Rejillas antiadherentes estilo belga prepara 2 wafles • Luces indicadoras de encendido y precalentado Indican cuando está encendida y cuando agregar la masa • Almacenamiento compacto vertical - la tapa se traba para un fácil almacenamiento • Selector de dorado selecciona de un dorado ligero a uno oscuro y crujiente • Dimensiones del artículo LxWxH: 8.66 x 4.53 x 7.72 pulgadas",
      },
      {
        name: "Plancha Antiadherente Durathon Hamilton Beach",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_737869-MCO43696507613_102020-O.webp"],
        price: 89910,
        stock: 10,
        description:
          "Elimina mejor las arrugas con más vapor continuo que el competidor principal. Su suela Durathon™ es 10 veces más resistente que las suelas antiadherentes tradicionales",
      },
      {
        name: "Horno de mesa eléctrico Kalley K-HE09B 9L blanco 110V-120V",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_894938-MLA46043486228_052021-O.webp"],
        price: 114641,
        stock: 10,
        description:
          "Si tu cocina es pequeña, el horno de mesa es la mejor solución. Disfrutarás de las mismas ventajas que con uno convencional y ganarás practicidad y comodidad.",
      }], "ELECTRODOMESTICOS"
]

const camping =  [[
      {
        name: "Carpa Coleman Doble Tendido 4 Personas Tienda De Campaña",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_710698-MCO45048021231_032021-V.webp"],
        price: 319900,
        stock: 10,
        description:
          "Somos Marca líder con más de 100 años en el Mercado, especializados en equipos y accesorios en la categoría Outdoor para el disfrute de las actividades recreativas al aire libre, como excursión, camping, playera, hogar y accesorios.",
      },
      {
        name: "Carpa Doble Tendido Coleman 4 Personas Tienda De Campaña",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_643971-MCO31537069095_072019-V.webp"],
        price: 379900,
        stock: 10,
        description:
          "- Resistencia: 35+ MPH / 56+ KPH - Columnas de Agua: 2.000 mm a 2.500 mm. Armado en 8 minutos. - Maleta para trasportar. - Caben 4 tapetes y 4 Colchones. - Material varillas: Fibra de vidrio. - Sistema impermeable. - Sistema weather Tec TM a prueba de cualquier clima. - Toldo extra grande para una mayor resistencia al frió. - Piso tipo tina para evitar filtraciones. - Las ventanas laterales se pueden abrir y cerrar dependiendo del clima. - Peso: 5.1 kg. - Medidas aproximadas: 2.40mts x 2.00mts. Altura: 1.4mts.",
      },
      {
        name: "Combo Carpa 4 Personas Klimber+colchon +almohadas+inflador+",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_903618-MCO49326131937_032022-V.webp"],
        price: 199927,
        stock: 10,
        description:
          "Combo Carpa 4 personas Klimber + Colchon Doble + Almohadas + Inflador Bomba Pie + ENVIO GRATIS",
      },
      {
        name: "Carpa Coleman Doble Tendido 4 Personas Tienda De Campaña",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_710698-MCO45048021231_032021-V.webp"],
        price: 319900,
        stock: 10,
        description:
          "- Dimensiones: 140 cm (Alto) x 260 com (Ancho) x 200 cm (Largo). - Resiste Columnas de Agua: 1.500 mm a 2.000 mm (Resistencia Media - Baja).  Resistencia: 35+ MPH / 56+ KPH.  Peso: 5 kg.  Util y eficaz.  Color agradable para la vista.  Ligera y de fácil instalación.  Probada en lluvias y viento.  Casa de campaña tipo domo.  Se arma en aproximadamente 8 minutos.  Materiales 100% de alta calidad y resistencia.",
      },
      {
        name: "Carpa Doble Tendido Coleman 4 Personas Tienda De Campaña",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_643971-MCO31537069095_072019-V.webp"],
        price: 379900,
        stock: 10,
        description:
          "- Dimensiones: 140 cm (Alto) x 260 com (Ancho) x 200 cm (Largo). - Resiste Columnas de Agua: 1.500 mm a 2.000 mm (Resistencia Media - Baja).  Resistencia: 35+ MPH / 56+ KPH.  Peso: 5 kg.  Util y eficaz.  Color agradable para la vista.  Ligera y de fácil instalación.  Probada en lluvias y viento.  Casa de campaña tipo domo.  Se arma en aproximadamente 8 minutos.  Materiales 100% de alta calidad y resistencia.",
      },
      {
        name: "Combo Carpa Camping 6 Personas Y Colchoneta Camping Confort",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_696567-MCO43918886613_102020-O.webp"],
        price: 134900,
        stock: 10,
        description:
          "- Dimensiones: 140 cm (Alto) x 260 com (Ancho) x 200 cm (Largo). - Resiste Columnas de Agua: 1.500 mm a 2.000 mm (Resistencia Media - Baja).  Resistencia: 35+ MPH / 56+ KPH.  Peso: 5 kg.  Util y eficaz.  Color agradable para la vista.  Ligera y de fácil instalación.  Probada en lluvias y viento.  Casa de campaña tipo domo.  Se arma en aproximadamente 8 minutos.  Materiales 100% de alta calidad y resistencia.",
      },
      {
        name: "Repuesto Varillas Camping Fibra De Vidrio X 2 Sets Asgard",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_939188-MCO40340362690_012020-O.webp"],
        price: 29900,
        stock: 10,
        description:
          "Varilla de repuesto para carpa de 2 personas, las varillas ya vienen armadas con su respectiva cuerda, unicamente las despliegas y reemplazas las que estan ya dañadas.",
      },
      {
        name: "Carpa Coleman Doble Tendido 4 Personas Tienda De Campaña",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_655497-MCO48588529022_122021-O.webp"],
        price: 408400,
        stock: 10,
        description:
          "- Peso: 4.55 Kg. - Dimensiones: 335 cm (Largo) x 198 cm (Ancho) x 130 cm (Alto). - Resistencia a Columnas de Agua: : 2500mm a 3000mm (Resistencia Alta). - Sistema WHEATHERTEC™ con esquinas soldadas y costuras invertidas y selladas para evitar la filtración de agua. - Tecnología UVGuard™ que ayuda a proteger la casa de los rayos dañinos del sol. - Estructura resistente para soportar vientos de hasta 56 km/h+. - Con vestíbulo que crea un área seca para la entrada y almacenamiento de equipo. - Puerta amplia que aumenta la facilidad de entrada y salida de la casa. - Cuenta con un bolsillo para tus almacenar tus dispositivos electrónicos. - Mangas para las varillas que protegen contra enganches. - Malla contra insectos que aporta excelente ventilación. - Flujo de ventilación transpirable asegurando comodidad. - Bolsa de transporte incluida. - Rápida instalación .",
      },
      {
        name: "Carpa Coleman Doble Tendido 4 Personas Tienda De Campaña",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_710698-MCO48957087093_012022-O.webp"],
        price: 332900,
        stock: 10,
        description:
          "- Peso: 4.25 Kg. - Dimensiones: 244cm (Largo) x 198cm (Ancho) x 130cm (Alto). - Resistencia a Columnas de Agua: 2.000 mm a 2.500mm (Resistencia Media – Alta) - Toldo ¾ con estructura que protege contra agentes externos. - Sistema WHEATHERTEC™ con esquinas soldadas y costuras invertidas y selladas para evitar la filtración de agua. - Tecnología UVGuard™ que ayuda a proteger la casa de los rayos dañinos del sol. - Estructura resistente para soportar vientos de hasta 56 km/h+. - Puerta amplia tipo D que aumenta la facilidad de entrada y salida de la casa. - Cuenta con un bolsillo para tus almacenar tus dispositivos electrónicos. - Liviana y compacta para aventuras mochileras y acampar. - Malla contra insectos que aporta excelente ventilación. - Mangas continuas para las varillas que protegen contra enganches. - Bolsa de transporte incluida. - Fácil instalación.",
      },
      {
        name: "Colchon Inflable Doble Reforzado + Inflador + Parche Refor",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_659086-MCO47255325112_082021-O.webp"],
        price: 89820,
        stock: 10,
        description:
          "Colchón DOBLE O 2 Plazas Inflable + inflador + 2 almohadas Incluye 1 colchón de 2 plazas. Soporta hasta 295Kg Ideal para uso interior y exterior. Ideal para irte de camping. De fácil inflado. Parte superior afelpada. Parche incluido. Inflador Volumen Sistólico 0,85L/Ciclo. Cámara de aire grande para Inflado rápido. Se infla subiendo y bajando. Tubo flexible.",
      },
      {
        name: "Carpa Camuflada Azul 2 Personas Asgard Camping 2x1.2",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_628430-MCO44022476622_112020-O.webp"],
        price: 64900,
        stock: 10,
        description:
          "Conoce la nueva colección de las Carpas Asgard, diseñadas y confeccionadas con la más alta tecnología, para brindarte la mayor comodidad y seguridad que te mereces, que tu única preocupación sea disfrutar de tus paseos y aventuras juntos a tu familia o amigos.",
      },
      {
        name: "Carpa 6 Personas Rain Forest Coleman",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_662423-MCO32688851036_102019-O.webp"],
        price: 489900,
        stock: 10,
        description:
          "Con gran capacidad de espacio, puede dormir 6 personas cómodamente, colocar 2 colchones inflables de tamaño queen, con toldo que protege de las lluvias manteniéndose fresca, de fácil armado con el sistema de anillo y clavija.",
      },
      {
        name: "Catre Militar Camilla Plegable Camping Coleman",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_760160-MCO46188107584_052021-O.webp"],
        price: 299900,
        stock: 10,
        description:
          "Soporta hasta 136.4kg Tres patas plegables estilo tijera Bolsa de almacenamiento con asa Medidas: 190x 88x 43cm",
      },
      {
        name: "Camping Lona Gruesa Aluminio Doble Capa Carpa Para 4 Persona",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_665937-MCO46452308697_062021-O.webp"],
        price: 95450,
        stock: 10,
        description:
          "Esta es de tela Lona por fuera en color por dentro metalizada para repeler el inclemente sol. Este producto tiene lona gruesa de alta densidad no es esa delgadita de las carpas baraticas, estas recibiendo un producto gama alta a price de gama baja. Este modelo al tener la cara interna en aluminio reduce la temperatura en dias soleados y en la lluvia es 50% mas impermeable que las carpas sencillas. Carpa de Camping para actividades al aire libre y con capacidad para 4 Personas, producto de alta calidad , puede ser utilizada para acampar en la playa, o campo.",
      },
      {
        name: "Carpa Alpes 4 Personas Eco + Colchón Inflable + Inflador",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_811092-MCO31916354879_082019-O.webp"],
        price: 239900,
        stock: 10,
        description:
          "Combo Carpa Alpes para 4 Personas Eco + Combo Colchón Inflable Doble más 2 Almohadas e Inflador Best Way",
      },
      {
        name: "Carpa Camping 6 Personas+colchoneta+lampara Para Camping",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_790155-MCO45387832453_032021-O.webp"],
        price: 139900,
        stock: 10,
        description:
          "COMBO CAMPING + COLCHONETA JUMBOLON AISLANTE DE FRIO +UNA LAMPARA PARA CAMPING; ENVIO INCLUIDO! Pensando en la comodidad de nuestros clientes, hemos diseñado este practico y económico combo de camping para 6 personas con colchoneta +lampara para camping, excelentes para actividades al aire libre",
      },
      {
        name: "Silla Plegable 30 Pulgadas - Truper 61025",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_634384-MCO48957864833_012022-O.webp"],
        price: 57900,
        stock: 10,
        description:
          "Silla Camping Plegable Portátil 30p  Truper Fabricada en poliéster Estructura de acero Con portavasos Logotipo impreso en serigrafia color naranja",
      },
      {
        name: "Mesa Plegable Portátil De Aluminio Para Camping Klatter",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_840830-MCO43989436067_112020-O.webp"],
        price: 55900,
        stock: 10,
        description:
          "1. Marca: Klatter 2. Modelo: 60C04F 3. Material: Aluminio  4. Medidas: 40 x 35 x 31 cm 6. Usos: Ideal para camping, senderismo, picnic y otras actividades al aire libre. 7. Ligera y compacta 8. Con bolsa para fácil transportación. 9. Peso máximo soportado: 15kg 10. País de origen: China",
      },
      {
        name: "Colchoneta Camping Multi Color Rayas",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_881160-MCO31005681881_062019-O.webp"],
        price: 32000,
        stock: 10,
        description:
          "ESPUMA FLEXIBLE DE POLIURETANO NO PERMITE EL CRECIMIENTO DE ACAROS E INSECTOS EN GENERAL. BUEN AISLANTE DE CALOR, BUENA DUREZA Y RESISTENCIA DIMENSIONES: 175 X 65 X 3.5 DENSIDAD 15 TELA EN POLITEX 75 GM X 1.50 M",
      },
      {
        name: "Carpa Toldo Armable Gazebo Normal De 2,4x2,4x3m En Rafia",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_982607-MCO48938124458_012022-O.webp"],
        price: 189900,
        stock: 10,
        description:
          "El Toldo Poliéster con Base 3x3 metros cuenta con una cubierta confeccionada en poliéster de alta gama, para que disfrutes de un producto duradero, práctico y de excelentes prestaciones. Este Toldo es ideal para espacios al aire libre, proporcionándote una eficiente protección contra la incidencia directa de los rayos del sol. Puedes usarlo en el jardín o patio, así como también en parques, playa o el campo.",
      }], "CAMPING"
]
    
const mascotas =  [[
      {
        name:
          "Alimento Pro Plan OptiRenal Sterilized para gato adulto sabor salmón y arroz en bolsa de 3kg",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_992265-MLA48982270357_012022-O.webp"],
        price: 119800,
        stock: 10,
        description:
          "La selección de un alimento adecuado para tu mascota es muy importante para garantizar su crecimiento, desarrollo y salud. Con esta opción de Pro Plan podrás cubrir las necesidades nutricionales y energéticas de tu gato.",
      },
      {
        name: "Tapete Alfombra Para Arenera Gato Recoge Arena",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_751996-MCO46758842922_072021-O.webp"],
        price: 26500,
        stock: 10,
        description:
          "Tapete recolector de arena, evita regueros de tu mascota gracias a este innovador producto Medidas: 50x40 cm",
      },
      {
        name: "Guante Quita Pelo Masajeador Silicona Perros Gatos Mascotas",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_650004-MCO45392272033_032021-O.webp"],
        price: 7000,
        stock: 10,
        description:
          "1. Material de caucho, puede dar a su mascota un buen cuidado sin dañar la piel del animal doméstico. 2. Imita el toque de su mano para un masaje; incluye 180 puntas de silicona blanda para el novio con facilidad. 3. El pelo se pega a la guante, por lo que es fácil de quitar y tirar del pelo después del aseo del perro y gato 4. Mantenga su casa limpia con el guante táctil reduciendo al mínimo derramamiento de pelos de perros y gatos. 5. Para todos los tamaños y razas. Especificaciones: Color: Azul Oscuro tamaño: aprox. 23x18x4 cm/9.44x6.29in Material: Caucho",
      },
      {
        name: "Hermosos Gimnasios Para Gato + Obsequio Juguete Envio Gratis",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_727736-MCO44300998032_122020-O.webp"],
        price: 139900,
        stock: 10,
        description:
          "Hermoso gimnasio para Gato, excelente calidad . Tela termica piel de conejo, muy suave y cómoda para tu gato . Variedad de colores y estampados disponibles Ya que somos fabricantes puedes elegir la combinación de colores que desees. Una vez realizada la compra nos contactaremos contigo para acordar el color deseado.",
      },
      {
        name: "Feliway Classic Spray 60 Ml Para Gato",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_888232-MCO42241453670_062020-O.webp"],
        price: 88400,
        stock: 10,
        description:
          "- Miedo: mejora la sensación de familiaridad. Ayuda a que los gatos se adapten a situaciones que pueden suponerles un reto y a los nuevos entornos.  - Uso en la clínica: Los gatos se dejan manipular más fácilmente, consiguiendo que el examen clínico sea más sencillo. - Viajes: Disminución significativa de los comportamientos asociados a la ansiedad causados por el viaje, como los vómitos, la diarrea y las vocalizaciones. - Nuevo hogar/nuevo entorno: Conseguimos que el 100% de los gatos se sientan en su hogar desde el primer día ( No realizan marcajes con orina y vuelven a casa cada dia). - Arañazos: disminución apreciable en el 80% de los gatos en una semana. - Marcaje con orina: disminución del 90% tras el primer mes. Disminución significativa desde la primera semana.",
      },
      {
        name:
          "Alimento Kirkland Signature Super Premium Maintenance Cat para gato adulto sabor pollo y arroz en bolsa de 25lb",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_923850-MLA46238178553_062021-O.webp"],
        price: 147900,
        stock: 10,
        description:
          "La selección de un alimento adecuado para tu mascota es muy importante para garantizar su crecimiento, desarrollo y salud. Con esta opción de Kirkland Signature podrás cubrir las necesidades nutricionales y energéticas de tu gato.",
      },
      {
        name: "Repelente Para Gatos",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_797000-MCO43473967557_092020-O.webp"],
        price: 70900,
        stock: 10,
        description:
          "Repelente para gatos Nature's Miracle Pet Block No requiere para mezclar, listo para usar Formulado para mantener gatos de zonas tratadas Canela Aceite y dejar atrás un aroma fresco, limpio de aceite de zacate de limón No contiene productos químicos nocivos Para uso en interiores y al aire última intervensión de formación Los quitamanchas y olores para mascotas de Nature's Miracle han sido una marca confiable para la limpieza de desechos de mascotas durante más de 35 años.",
      },
      {
        name: "Rascador Gato Pet Spa Divan Cartón",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_644765-MCO44935045470_022021-O.webp"],
        price: 38437,
        stock: 10,
        description:
          "Rascador multipropósito. Hecho con cartón corrugado para afilar uñas, hacer ejercicio y estiramiento, al igual que liberar estrés. Beneficios de los rascadores para los gatos: -Los ayuda a afilarse/renovar sus uñas. -Les permite marcar territorio durante el juego. -Hacen ejercicio y se estiran. -Liberan estrés. ",
      },
      {
        name: "Jeringa Dispensadora Dosificadora Pastillas Perros Y Gatos",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_813519-MCO45774471774_042021-O.webp"],
        price: 13000,
        stock: 10,
        description: "Jeringa Dispensadora Dosificadora Pastillas Perros Y Gatos",
      },
      {
        name: "Arenera Para Gatos Grande+filtro+pala +tapete+regalo",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_960319-MCO46714501656_072021-O.webp"],
        price: 143079,
        stock: 10,
        description:
          "La mejor calidad de areneras del mercado productos italianos de materiales 100% garantizados a excelente price.",
      },
      {
        name:
          "Alimento Hill's Prescription Diet Urinary Care c/d Multicare para perro senior todos los tamaños sabor pollo en bolsa de 8.5lb",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_920856-MLA46237810907_062021-O.webp"],
        price: 147000,
        stock: 10,
        description:
          "La selección de un alimento adecuado para tu mascota es muy importante para garantizar su crecimiento, desarrollo y salud. Con esta opción de Hill's podrás cubrir las necesidades nutricionales y energéticas de tu perro.",
      },
      {
        name: "Renovapet Elimina El Sarro Y Mal Aliento De Tus Mascotas",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_635505-MCO49118612120_022022-O.webp"],
        price: 84900,
        stock: 10,
        description:
          "RENOVAPETT es una solución que mejora y previene problemas bucales en tu mascota tales como: Lesiones bucales, Sarro, Gingivitis, Periodontitis, Halitosis (mal aliento). Además puedes aplicarlo en diferentes afecciones de la piel de tu mascota ya que higieniza y elimina bacterias potenciando el proceso de regeneración de tejidos afectados en tu mascota. Puedes usarlo para tratar las siguientes afecciones en la piel:",
      },
      {
        name: "Pelota Mediana Maciza Irrompible Goma Caucho Para Perro 2x3",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_983626-MCO45688056924_042021-O.webp"],
        price: 19000,
        stock: 10,
        description:
          "3 Pelotas Medianas ( Tamaño: pelota de Tenis) Irrompible de Goma Maciza",
      },
      {
        name: "Kong Classic - Juguete Interactivo Para Perro Talla M",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_947296-MCO31687065665_082019-O.webp"],
        price: 42950,
        stock: 10,
        description:
          "El KONG Classic ha sido el juguete Kong con más reconocimiento en los últimos 40 años. Su compuesto de goma natural roja rebota muy bien y es perfecto para perros a los que les gusta masticar.  -Perfecto para rellenar con cualquier tipo de alimento. -rebota de manera aleatoria para más diversión -Recomendado en todo el mundo por veterinarios, adiestradores y amantes de los perros -Fabricado en  los Estados Unidos. Medidas: 9 cm largo x 6 cm diámetro",
      },
      {
        name: "Juguete Mordedor Para Perro Multifunc",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_805477-MCO45586347317_042021-O.webp"],
        price: 57950,
        stock: 10,
        description:
          "Este juguete para mordedura de molar para mascotas hecho de material de goma no tóxico, duradero y resistente al desgaste, adecuado para todos los perros JUGUETE INTERACTIVO MULTIFUNCIONAL: El juguete interactivo de cuerdas de bolas multifuncionales no solo es una pelota de goma que se juega solo, sino que también puede ser una herramienta de limpieza de dientes. Ideal para el juego personal, tira y afloja, atrapa",
      },
      {
        name: "Peluche Mordedor Pollo Con Pito",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_605804-MCO45586678577_042021-O.webp"],
        price: 34105,
        stock: 10,
        description:
          "Peluche de Pollo para jugar con tu perro! El price solo incluye Un peluche. Este peluche con pito interno es ideal para pasar divertidos momentos con tu peludo mientras pasan el tiempo en casa o salen de paseo. Tela suave y resistente se convertirá en el preferido de tu peludo",
      },
      {
        name: "3 Juguetes Plasticos Medianos - Unidad a $6302",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_874754-MCO48941016716_012022-O.webp"],
        price: 18905,
        stock: 10,
        description:
          "Set por 3 Juguete Plástico Mediano surtidos con pito. Estos juguetes plásticos con forma son ideales morder, gracias a su tamaño y flexibilidad proporciona entretenimiento y diversión para el amo y su mascota al mismo tiempo que fortalece dientes y mandíbulas ",
      },
      {
        name: "Juguete Mascota Pollo Chillón De Hule Gallina De Goma",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_623971-MCO45344254622_032021-O.webp"],
        price: 10900,
        stock: 10,
        description:
          "Juguete mascota Pollo Chillón De Hule Gallina De Goma Platico Grande DIVERTIDÍSIMO SONIDO - La carga y la diversión del sonido de graznido le brindarán a usted y a su familia innumerables horas de entretenimiento. Es el juguete perfecto para mantener a su perro ocupado y a sus hijos también les encantará. Apto para todas las edades.",
      },
      {
        name: "Juguete Interactivo Perros Juguete Para Morder, Porta Comida",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_740111-MCO46157032111_052021-O.webp"],
        price: 46000,
        stock: 10,
        description:
          "Espectacular dispensador de snacks con lazo y chupa de succión, que se pega a superficies planas, haciendo que tu perro juegue con ella. Cuenta con un dispensador de alimentos o snacks que hará que tu perro esté feliz jugando e interactuando con su juguete dispensador. Su diseño ayuda también a la limpieza de los dientes de tu perro Tanto la chupa como la cuerda son de alta calidad y resistencia. El price publicado es por UNIDAD.",
      },
      {
        name: "Juguete Perro Pelota Loca Interactiva Con Vibración Y Sonido",
        image:
          ["https://http2.mlstatic.com/D_NQ_NP_864123-MCO49127838963_022022-O.webp"],
        price: 104760,
        stock: 10,
        description:
          "Este juguete ayudará a tu perro a hacer ejercicio con más diversión. Tu mascota se emocionará por perseguir, morder, y no querer soltar este estupendo juguete. Tu peludo sentirá que no es solo un peluche silencioso y estará feliz de perseguirle por todos los rincones de tu casa. Este juguete interactivo llama la atención de tu mascota ya que vibra y hace un sonido de perro que gruñe durante 12 segundos cuando se enciende y se activará de nuevo agitando o tocando poderosamente. La bonita funda de felpa se puede lavar para un tiempo de uso más largo y reducir el riesgo de enfermo del perro cuando se ensucia (recuerde retirar primero la pelota y lavar solo la cubierta).",
      }], "MASCOTAS"
]
adminUser={
    email: "latcom@gmail.com", 
    password: "Latcom", 
    name: "Latcom", 
    lastname: "Company", 
    birthday: "21/04/2022", 
    dni: "213123312", 
    nationality: "Argentina", 
    principalDirection: [{"direction":"Mitre 250","postalcode":"2102","city":"CABA","province":"Buenos Aires"}], 
    directions: [{"direction":"Mitre 250","postalcode":"2102","city":"CABA","province":"Buenos Aires"}], 
    phone: "111923819",
    isAdmin:true
  }

async function preloadProducts() {
  const array = [[...belleza], [...camping], [...deportes], [...electrodomesticos], [...mascotas], [...muebles]]
  if(await Products.count()===0){
    await array.forEach(async (list) => {
      const newCategory = await Categories.create({name: list[1], description: 'algo'})
      list[0].forEach(async (product) => {
        const newProduct = await Products.create(product)
        newProduct.addCategories(newCategory)
      })
    })
    await Users.create(adminUser)
  } 
}

module.exports = preloadProducts