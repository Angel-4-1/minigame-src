//This file contains constants variables used in the program

export const STAGES = {
    STAGE: 0,
    INTRO_STAGE: 1,
    LANGUAGE_STAGE: 2,
    PLAY_STAGE: 3,
    FINAL_STAGE: 4
};

export const LANGUAGES =  [
    { name: "English", id: 0 , screen_name : "English" , image: "assets/languages/english.png" },
    { name: "Spanish", id: 1 , screen_name : "Español" , image: "assets/languages/spain.png" }
];

export const CHARACTERS = [
    { name: ["Basic boy","Chico Básico"] , id: 0, icon: "assets/characters/boy_face.png" , 
        data: [ 
            "This character represents that inexperienced user who enters a social media for the first time, so he does not have sufficient knowledge about what he should and should not publish on the network since he is unaware of the risks of publishing his private information to the outside world and the effects that this would mean",
            "Este personaje representa a ese usuario sin experiencia que ingresa a un medio social por primera vez, por lo que no dispone del conocimiento suficiente sobre lo que debe y no debe publicar en la red ya que desconoce los riesgos de publicar su información privada al mundo exterior y los efectos que esto supondría" 
        ], 
        has_ability: false, ability: [ "None" , "Ninguna"] , health: 5 , sprite: "assets/characters/boy_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },

    { name: ["Basic Girl","Chica Básica"] , id: 1, icon: "assets/characters/girl_face.png" , 
        data: [ 
            "This character represents that inexperienced user who enters a social media for the first time, so he does not have sufficient knowledge about what he should and should not publish on the network since he is unaware of the risks of publishing his private information to the outside world and the effects that this would mean",
            "Este personaje representa a ese usuario sin experiencia que ingresa a un medio social por primera vez, por lo que no dispone del conocimiento suficiente sobre lo que debe y no debe publicar en la red ya que desconoce los riesgos de publicar su información privada al mundo exterior y los efectos que esto supondría" 
        ], 
        has_ability: false, ability: [ "None" , "Ninguna"] , health: 5 , sprite: "assets/characters/girl_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },

    { name: ["Froze Girl", "Chica de Hielo"] , id: 2, icon: "assets/characters/froze_face.png" , 
        data: [
            "This character will have the special ability of being able to slow down time for a short period of time so that you will have more time to analyze the environment since everything that happens in the game's world will see its speed reduced",
            "Este personaje tendrá la habilidad especial de poder ralentizar el tiempo durante un breve periodo de tiempo de tal manera que dispondras de más tiempo para analizar el entorno puesto que todo lo que suceda en el mundo del juego verá su velocidad reducida"
        ], 
        has_ability: true, ability: [ "Froze time" , "Relantizar tiempo"] , health: 3 , sprite: "assets/characters/froze_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },
    
    { name: ["Punky","Punky"] , id: 3, icon: "assets/characters/punky_face.png" , 
        data: [
            "He will give you 10 extra seconds for the quiz questions",
            "Te dará 10 segundos extra para las preguntas del cuestionario"
        ],
        has_ability: true, ability: [ "More Time" , "Mayor Tiempo"] , health: 3 , sprite: "assets/characters/punky_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },

    { name: ["The wise","El Sabio"] , id: 4, icon: "assets/characters/senior_face.png" , 
        data: [
            "This user posses the power of knowledge, it may help you during the quiz questions by discarding an answer",
            "Este usuario posee el poder del concocimiento, quizas te ayudará durante las preguntas quiz descartando una de las respuestas"
        ],
        has_ability: true, ability: [ "Knowledge" , "Conocimiento"] , health: 3 , sprite: "assets/characters/senior_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },
    
];

export const LEVELS = [
    { id: 0 , name: [ "LEVEL 1: CLASSIC", "NIVEL 1: CLÁSICO" ] , 
        description: [ 
            "Learn the basics of the game by playing the classic version. Are you ready ? Let's start !", 
            "Aprende los fundamentos del juego al jugar a la versión clásica. ¿Estas preparado? ¡A por ello!"
        ]
        , isActive: true  , difficulty: "easy" , icon: "assets/levels/1.png" , map: [ 0 ] , locked: false
    },

    { id: 1 , name: [ "LEVEL 2: OSCILATING" , "NIVEL 2: OSCILANDO" ], 
        description: [
            "The obstacles do not follow a straight line anymore",
            "Los obstáculos ya no siguen una linea recta"
        ]
        , isActive: false , difficulty: "medium" , icon: "assets/levels/2.png" , map: [ 0 ] , locked: false
    },

    { id: 2 , name: [ "LEVEL 3: MORE OBSTACLES", "NIVEL 3: MÁS OBSTÁCULOS" ], 
        description: [
            "Now there are more obstacles!",
            "Ahora hay más obstáculos!"
        ]
        , isActive: false , difficulty: "hard" , icon: "assets/levels/3.png" , map: [ 2 ] , locked: false
    },

    // { id: 3 , name: [ "LEVEL 4: BAD INFLUENCES", "NIVEL 4: MALAS INFLUENCIAS" ], 
    //     description: [
    //         "Some obstacles seem good for you but they are not. Do not trust anyone!",
    //         "Algunos obstáculos parecen buenos pero no lo son. ¡No confies en nadie!"
    //     ]
    //     , isActive: false , difficulty: "hard" , icon: "assets/levels/3b.png" , map: [ 0 ] , locked: false
    // },

    { id: 3 , name: [ "LEVEL 4", "NIVEL 4" ], 
        description: [ 
            "Coming soon", 
            "Próximamente"
        ], isActive: false , difficulty: "hard" , icon: "assets/levels/4.png" , map: [ 0 ] , locked: true
    }
];

export const MAPS = [
    { id: 0, map : [1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 7, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 8, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 7, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 3, 3, 4, 3, 3, 4, 3, 3, 8], tileset: "assets/city_tileset.png" },
    { id: 1, map : [1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 7, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 8, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 7, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 3, 3, 4, 3, 3, 4, 3, 3, 8], tileset: "assets/winter_city_tileset.png"  },
    { id: 2, map : [1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 8, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 7, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 8, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 7, 6, 4, 3, 4, 3, 4, 3, 5, 2], tileset: "assets/city4_tileset.png"  },
    { id: 3, map : [1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 8, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 7, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 1, 6, 4, 3, 4, 3, 4, 3, 5, 8, 1, 6, 4, 3, 4, 3, 4, 3, 5, 2, 7, 6, 4, 3, 4, 3, 4, 3, 5, 2], tileset: "assets/winter_city4_tileset.png"  }
]

export const INSTRUCTOR = [
    { id: 0, icon: "assets/characters/instructor_face.png" , phrases: [ 
        /* Level Selection */
        { title: [ "WELCOME!", "BIENVENIDO!" ], content: [
            "It's time to start playing, but before you must choose a level",
            "Es hora de empezar a jugar, pero antes has de seleccionar un nivel"
        ], has_survey: false, survey: "" },    
        /* Character Selection */
        { title: [ "WE ARE ALMOST READY", "YA CASI ESTAMOS" ], content: [
            "Now choose a character, but remember, each of them has unique abilities",
            "Ahora selecciona un personaje, pero recuerda, cada uno de ellos tiene habilidades únicas"
        ], has_survey: false, survey: "" },    
        /* Main Game */
        { title: [ "LET'S START", "EMPECEMOS" ], content: [
            "Avoid as many obstacles as you can, and remember to access to the pause menu to see in more detail what these obstacles represent. Good Luck!",
            "Evita tantos obstáculos cómo puedas, y recuerda acceder al menú de pausa para ver con más detalles que representan dichos obstáculos. Buena Suerte!"
        ], has_survey: false, survey: "" },    
        /* Survey */
        { title: [ "GAME OVER", "FIN DEL JUEGO" ], content: [
            "Thanks for playing! Please answer the following survey once you have finished the game",
            "Gracias por jugar! Por favor, contesta a la siguiente encuesta una vez des por finalizado el juego"
        ], has_survey: true, survey: "https://forms.gle/5dBo3r2tqzw3couo8" }
    ]}
];

export const QUIZ_QUESTIONS = [
    /* Contenido publicado */
    { id: 0, question: [
        "Which of the following content should you NOT publish?",
        "¿Cuál de las siguientes NO debes publicar?" 
        ], answers: [
            { name: [ "Personal phone number", "Número de teléfono personal" ], status: true },
            { name: [ "Image of a cat", "Imagen de un gato" ] , status: false },
            { name: [ "Inspiring quote", "Frase inspiratoria" ] , status: false },
            { name: [ "Image of your new plant", "Imagen de tu nueva planta" ], status: false }
        ] 
    },
    { id: 1, question: [
        "Which of the following content should be safer to post?",
        "¿Cuál de las siguientes seria más seguro publicar?" 
        ], answers: [
            { name: [ "Hobbies", "Aficiones" ], status: true },
            { name: [ "Phone number", "Número de teléfono" ] , status: false },
            { name: [ "Home adress", "Dirección de casa" ] , status: false },
            { name: [ "Personal data", "Datos personales" ], status: false }
        ]
    },
    /* Relacionadas con los medios sociales en general */
    { id: 2, question: [ 
        "You make a comment on your friend John's post, who can see it?", 
        "Realizas un comentario en la publicación de tu amigo John, ¿quien puede verlo?" 
        ], answers: [
            { name: [ "Anyone who sees the post", "Todo aquel que vea el post" ], status: true },
            { name: [ "Only John", "Solo John" ], status: false },
            { name: [ "John and his friends", "John y sus amigos" ], status: false },
            { name: [ "No one", "Nadie" ], status: false }
        ] 
    },
    { id: 3, question: [ 
        "How long does a post remain visible?", 
        "¿Cuánto tiempo permanece visible una publicación?" 
        ], answers: [
            { name: [ "Forever", "Para siempre" ], status: true },
            { name: [ "Until it has been removed", "Hasta que se haya eliminado" ], status: false },
            { name: [ "1 month", "1 mes" ], status: false },
            { name: [ "1 year", "1 año" ], status: false }
        ] 
    },
    { id: 4, question: [ 
        "What should you tell to a person you just met on social media?", 
        "¿Qué le puedes decir a una persona que acabas de conocer en las redes sociales?" 
        ], answers: [
            { name: [ "None of them", "Ninguna de las anteriores" ], status: true },
            { name: [ "Your home direction", "Tu dirección de casa" ], status: false },
            { name: [ "Your complete name", "Tu nombre completo" ], status: false },
            { name: [ "Your phone number", "Tu número de teléfono" ], status: false }
        ] 
    },
    { id: 5, question: [ 
        "You forgot to log out from your Facebook account on a public computer", 
        "Te has olvidado de cerrar la sesión de tu cuenta de Facebook en un ordenador público" 
        ], answers: [
            { name: [ "Someone could access your account and impersonate you", "Alguien podria acceder a tu cuenta y hacerse pasar por ti" ], status: true },
            { name: [ "No one will enter to your account", "Nadie va a entrar a tu cuenta" ], status: false }
        ] 
    },
    /* Relacionadas con contraseñas */
    { id: 6, question: [ 
        "What dangers are you exposing yourself to if you share your password?", 
        "¿A que peligros te expones si compartes tu contraseña?" 
        ], answers: [
            { name: [ "Someone could access your account and obtain / modify your data", "Podrian acceder a tu cuenta y obtener/modificar tus datos" ], status: true },
            { name: [ "Nobody is interested in entering to your account", "A nadie le interesa entrar a tu cuenta" ], status: false },
            { name: [ "The password is useless", "La contraseña no sirve para nada" ], status: false }
        ] 
    },
    { id: 7, question: [ 
        "What can you do in order to protect your account?", 
        "¿Que puedes hacer para proteger tu cuenta?" 
        ], answers: [
            { name: [ "Use a strong password", "Utilizar una contraseña fuerte" ], status: true },
            { name: [ "Give fake personal data", "Dar información personal falsa" ], status: false },
            { name: [ "Share your account with your friends", "Compartir la cuenta con tus amigos" ], status: false },
            { name: [ "Use your birthday as password", "Poner de contraseña tu fecha de nacimiento" ], status: false }
        ] 
    },
    { id: 8, question: [ 
        "What should contain a strong password?", 
        "¿Que debe contener una buena contraseña?" 
        ], answers: [
            { name: [ "Formed by a minimum of 8 characters and containing all the other options", "Formada por un mínimo de 8 carácteres y que contenga todas las otras opciones" ], status: true },
            { name: [ "Special characters", "Carácteres especiales" ], status: false },
            { name: [ "Uppercase and lowercase letters", "Letras mayúsculas y mínisculas" ], status: false },
            { name: [ "Numbers", "Números" ], status: false }
        ] 
    },
    { id: 9, question: [ 
        "Should you use the same passward for all of your accounts?", 
        "¿Deberias utilizar la misma contraseña en todas tus cuentas?" 
        ], answers: [
            { name: [ "No, if someone discovers your password they will be able to access all your accounts", "No, si alguien descubre tu contraseña podrá acceder a todas tus cuentas" ], status: true },
            { name: [ "Yes, it is easier to remember a single passward", "Si, es más fácil recordar una sola contraseña" ], status: false }
        ] 
    }
];

export const AUDIO_FILES = {
    /* Music by Marllon Silva (xDeviruchi) */
    AUDIO_INTRO: 'assets/audio/TitleTheme(xDeviruchi).wav',
    AUDIO_CONFIG: 'assets/audio/AndTheJourneyBegins(xDeviruchi).wav',
    AUDIO_AMBIENT: 'assets/audio/ExploringTheUnknown(xDeviruchi).wav',
    
    AUDIO_WRITE: 'assets/audio/Write.ogg',
    AUDIO_RESOURCE: 'assets/audio/Item.ogg',
    AUDIO_HEALTH: 'assets/audio/Item2.ogg',
    AUDIO_QUIZ_BAD: 'assets/audio/QuizBad.ogg',
    AUDIO_QUIZ_GOOD: 'assets/audio/QuizGood.ogg',
    AUDIO_QUIZ_COUNTDOWN: 'assets/audio/Countdown.ogg',
    AUDIO_COLLISION: 'assets/audio/Blow.ogg',
    AUDIO_GAMEOVER: 'assets/audio/TheFinalofTheFantasy(xDeviruchi).wav'
}

export const BUTTONS = {
    BUTTON_PAUSE_RESUME: [ "RESUME", "VOLVER" ],
    BUTTON_PAUSE_RESET: [ "RESET", "REINICIAR" ],
    BUTTON_PAUSE_OBSTACLES: [ "OBSTACLES", "OBSTÁCULOS" ],
    BUTTON_PAUSE_EXIT: [ "EXIT", "SALIR" ],
    BUTTON_POPUP: [ "Close", "Cerrar" ],
    BUTTON_SELECT: [ "SELECT", "SELECCIONAR" ],
    BUTTON_GAMEOVER_RESET: [ "RESET", "REINICIAR" ],
    BUTTON_GAMEOVER_HOME: [ "HOME", "INICIO" ],
}

export const TITLES = {
    TITLE_CHARACTER_LIST: [ "Choose a character", "Selecciona un personaje" ],
    TITLE_CHARACTER_DESCRIPTION: [ "Description" , "Descripción" ],
    TITLE_CHARACTER_ABILITY: [ "Ability" , "Habilidad" ],
    TITLE_CHARACTER_HEALTH: [ "Health" , "Salud" ],
    TITLE_PAUSE: [ "PAUSE" , "PAUSA" ],
    TITLE_OBSTACLES: [ "OBSTACLES" , "OBSTÁCULOS" ],
    TITLE_GAMEOVER: [ "GAME OVER" , "FIN DE LA PARTIDA" ],
    TITLE_GAMEOVER_TIME: [ "Time" , "Tiempo" ],
    TITLE_GAMEOVER_POINTS: [ "Score" , "Puntos" ],
    TITLE_GAMEOVER_BONUS: [ "Bonus" , "Bonus" ],
    TITLE_GAMEOVER_TOTAL: [ "Total Score" , "Total" ],
    TITLE_GAMEOVER_STANDINGS: [ "RANKING" , "RANKING" ]
}

export const OBSTACLES_INFO = [
    { name: [ 'DNI', 'DNI' ] , info: [ 'You will be revealing your personal data, such as: home address, date of birth or your full name' , 'Estarás revelando tus datos personales, tales como: domicilio, fecha de nacimiento o tu nombre completo'], icon: "assets/obstacles/dni.png" },
    { name: [ 'PASSWORD', 'CONTRASEÑA' ] , info: [ 'Anyone who has your passwords can access your accounts' , 'Todo aquel que tenga tus contraseñas podrá acceder a tus cuentas'], icon:"assets/obstacles/password.png" },
    { name: [ 'HOME ADRESS', 'DIRECCIÓN DE CASA' ] , info: [ 'It allows thiefs to locate your home' , 'Permite a los ladrones localizar tu casa'], icon: "assets/obstacles/home.png" },  
    { name: [ 'CREDIT CARD', 'TARJETA DE CRÉDITO' ] , info: [ 'Anyone who has your credit card number and its expiration date can order thing online without your conscent' , 'Cualquiera que tenga tu número de tarjeta de crédito y su fecha de vencimiento puede hacer un pedido en línea sin tu consentimiento.'], icon: "assets/obstacles/credit.png" },
    { name: [ 'BANK ACCOUNT', 'CUENTA BANCÁRIA' ] , info: [ 'Closely linked to the credit card problem' , 'Estrechamente vinculado al problema de la tarjeta de crédito'], icon: "assets/obstacles/bank.png" },  
    { name: [ 'HOLIDAY DETAILS', 'DETALLES VACACIONES' ] , info: [ 'You are telling the thieves that you are not going to be at home, so they can enter your house to steal' , 'Les estas diciendo a los ladrones que no vas a estar en casa, por lo que disponen de vía libre para entrar a tu casa a robar'], icon: "assets/obstacles/holiday.png" },
    { name: [ 'PHONE NUMBER', 'NÚMERO DE TELÉFONO' ] , info: [ 'Unless you want to be receiving calls all the time or let your number circulate through the internet' , 'A menos que quieras estar recibiendo llamadas a cada rato o que tu número este circulando por la red'], icon: "assets/obstacles/phone.png" }  
]

