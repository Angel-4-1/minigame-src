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
    { name: "Basic boy" , id: 0, icon: "assets/characters/boy_face.png" , 
        data: [ 
            "This character represents that inexperienced user who enters a social media for the first time, so he does not have sufficient knowledge about what he should and should not publish on the network since he is unaware of the risks of publishing his private information to the outside world and the effects that this would mean",
            "Este personaje representa a ese usuario sin experiencia que ingresa a un medio social por primera vez, por lo que no dispone del conocimiento suficiente sobre lo que debe y no debe publicar en la red ya que desconoce los riesgos de publicar su información privada al mundo exterior y los efectos que esto supondría" 
        ], 
        has_ability: false, ability: [ "None" , "Ninguna"] , sprite: "assets/characters/boy_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },

    { name: "Basic Girl" , id: 1, icon: "assets/characters/girl_face.png" , 
        data: [ 
            "This character represents that inexperienced user who enters a social media for the first time, so he does not have sufficient knowledge about what he should and should not publish on the network since he is unaware of the risks of publishing his private information to the outside world and the effects that this would mean",
            "Este personaje representa a ese usuario sin experiencia que ingresa a un medio social por primera vez, por lo que no dispone del conocimiento suficiente sobre lo que debe y no debe publicar en la red ya que desconoce los riesgos de publicar su información privada al mundo exterior y los efectos que esto supondría" 
        ], 
        has_ability: false, ability: [ "None" , "Ninguna"] , sprite: "assets/characters/girl_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },

    { name: "Froze Girl" , id: 2, icon: "assets/characters/froze_face.png" , 
        data: [
            "Something",
            "Algo"
        ], 
        has_ability: true, ability: [ "Froze time" , "Relantizar tiempo"] , sprite: "assets/characters/froze_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },
    
    { name: "Amateur" , id: 3, icon: "assets/characters/senior_face.png" , 
        data: [
            "This user posses the power of knowledge, it may help you during the quiz questions by discarding an answer",
            "Este usuario posee el poder del concocimiento, quizas te ayudará durante las preguntas quiz descartando una de las respuestas"
        ],
        has_ability: true, ability: [ "Knowledge" , "Conocimiento"] , sprite: "assets/characters/senior_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    },
    
    { name: "Punky" , id: 4, icon: "assets/characters/punky_face.png" , 
        data: [
            "Something",
            "Algo"
        ],
        has_ability: true, ability: [ "None" , "Ninguna"] , sprite: "assets/characters/punky_spritesheet.png" , 
        sprite_size_x: 128, sprite_size_y: 165 , frames: 4, 
        animation: [ 
            [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
            [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
            [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
            [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
        ]
    }
];

export const LEVELS = [
    { id: 0 , name: [ "LEVEL 1: CLASSIC", "NIVEL 1: CLÁSICO" ] , 
        description: [ 
            "Learn the basics of the game by playing the classic version. Are you ready ? Let's start !", 
            "Aprende los fundamentos del juego al jugar a la versión clásica. ¿Estas preparado? ¡A por ello!"
        ]
        , isActive: true  , difficulty: "easy" , icon: "assets/levels/1.png" , map: [ 0 ] 
    },

    { id: 1 , name: [ "LEVEL 2: OSCILATING" , "NIVEL 2: OSCILANDO" ], 
        description: [
            "The obstacles do not follow a straight line anymore",
            "Los obstáculos ya no siguen una linea recta"
        ]
        , isActive: false , difficulty: "medium" , icon: "assets/levels/2.png" , map: [ 0 ]
    },

    { id: 2 , name: [ "LEVEL 3: MORE OBSTACLES", "NIVEL 3: MÁS OBSTÁCULOS" ], 
        description: [
            "Now there are more obstacles!",
            "Ahora hay más obstáculos!"
        ]
        , isActive: false , difficulty: "hard" , icon: "assets/levels/3.png" , map: [ 2 ]
    },

    { id: 3 , name: [ "LEVEL 4: BAD INFLUENCES", "NIVEL 4: MALAS INFLUENCIAS" ], 
        description: [
            "Some obstacles seem good for you but they are not. Do not trust anyone!",
            "Algunos obstáculos parecen buenos pero no lo son. ¡No confies en nadie!"
        ]
        , isActive: false , difficulty: "hard" , icon: "assets/levels/3b.png" , map: [ 0 ]
    },

    { id: 4 , name: [ "LEVEL 5", "NIVEL 5" ], 
        description: [ 
            "Coming soon", 
            "Próximamente"
        ], isActive: false , difficulty: "hard" , icon: "assets/levels/4.png" , map: [ 0 ]
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
        ] },    
        /* Character Selection */
        { title: [ "OKAY THEN", "SIGAMOS" ], content: [
            "Now choose a character, but remember, each of them has unique abilities",
            "Ahora selecciona un personaje, pero recuerda, cada uno de ellos tiene habilidades únicas"
        ] },    
        /* Main Game */
        { title: [ "LET'S START", "EMPECEMOS" ], content: [
            "Avoid as many obstacles as you can",
            "Evita tantos obstáculos cómo puedas"
        ] }
    ]}
];

export const QUIZ_QUESTIONS = [
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
        "Question *_*", 
        "Pregunta *_*" 
        ], answers: [
            { name: [ "Answer True", "Respuesta Verdadera" ], status: true },
            { name: [ "Answer False", "Respuesta Falsa" ], status: false },
            { name: [ "Answer False", "Respuesta Falsa" ], status: false },
            { name: [ "Answer False", "Respuesta Falsa" ], status: false }
        ] 
    }
];

export const AUDIO_FILES = {
    AUDIO_INTRO: 'assets/audio/Scene1.ogg',
    AUDIO_AMBIENT: 'assets/audio/Gameover1.ogg',
    AUDIO_WRITE: 'assets/audio/Write.ogg',
    AUDIO_RESOURCE: 'assets/audio/Item.ogg',
    AUDIO_HEALTH: 'assets/audio/Item2.ogg',
    AUDIO_QUIZ_BAD: 'assets/audio/QuizBad.ogg',
    AUDIO_QUIZ_GOOD: 'assets/audio/QuizGood.ogg',
    AUDIO_QUIZ_COUNTDOWN: 'assets/audio/Countdown.ogg',
    AUDIO_COLLISION: 'assets/audio/Blow.ogg',
    AUDIO_GAMEOVER: 'assets/audio/Gameover1.ogg'
};

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

