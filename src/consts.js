//This file contains constants variables used in the program

export const STAGES = {
    STAGE: 0,
    INTRO_STAGE: 1,
    TUTORIAL_STAGE: 2,
    PLAY_STAGE: 3,
    FINAL_STAGE: 4
};

export const CHARACTERS = [
    { name: "Basic boy"   , id: 0, icon: "assets/characters/boy_face.png"   , data: "Something" , has_ability: false, ability: "Run" , sprite: "assets/characters/boy_spritesheet.png" , 
    sprite_size_x: 128, sprite_size_y: 165 , frames: 4, animation: [ 
        [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
        [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
        [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
        [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
    ], map: [ 0 ] },
    { name: "Basic Girl"  , id: 1, icon: "assets/characters/girl_face.png" , data: "Something" , has_ability: true, ability: "Froze" , sprite: "assets/characters/girl_spritesheet.png" , 
    sprite_size_x: 128, sprite_size_y: 165 , frames: 4, animation: [ 
        [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
        [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
        [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
        [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
    ], map: [ 0, 1 ] },
    { name: "Amateur" , id: 2, icon: "assets/characters/senior_face.png" , data: "Something" , has_ability: false, ability: "Run" , sprite: "assets/characters/senior_spritesheet.png" , 
    sprite_size_x: 128, sprite_size_y: 165 , frames: 4, animation: [ 
        [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
        [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
        [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
        [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
    ], map: [ 0 ] },
    { name: "Punky" , id: 3, icon: "assets/characters/punky_face.png"   , data: "Something" , has_ability: false, ability: "Run" , sprite: "assets/characters/punky_spritesheet.png" , 
    sprite_size_x: 128, sprite_size_y: 165 , frames: 4, animation: [ 
        [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
        [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
        [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
        [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
    ], map: [ 0 ] },
    { name: "Senior" , id: 4, icon: "assets/characters/gentleman_face.png" , data: "Something" , has_ability: false, ability: "Run" , sprite: "assets/characters/gentleman_spritesheet.png" , 
    sprite_size_x: 128, sprite_size_y: 165 , frames: 4, animation: [ 
        [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 } ],  /*Delante*/
        [ { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 } ],  /*Izquierda*/
        [ { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 } ],  /*Derecha*/
        [ { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 } ]   /*Detras*/
    ], map: [ 0 ] },
    { name: "Character 6" , id: 5, icon: "assets/characters/pig.png"   , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet2.png"},
    { name: "Character 7" , id: 6, icon: "assets/characters/pig.png"   , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet2.png"},
    { name: "Character 8" , id: 7, icon: "assets/characters/tiger.png" , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet2.png"}
];

export const LEVELS = [
    { id: 0 , name: "LEVEL 1: CLASSIC" , description: "Learn the basics of the game by playing the classic version. Are you ready ? Let's start !" , isActive: true  , difficulty: "easy" , icon: "assets/levels/1.png" },
    { id: 1 , name: "LEVEL 2: OSCILATING" , description: "The obstacles do not follow a straight line anymore" , isActive: false , difficulty: "medium" , icon: "assets/levels/2.png" },
    { id: 2 , name: "LEVEL 3: BAD INFLUENCES" , description: "Some obstacles seem good for you but they are not. Do not trust anyone!" , isActive: false , difficulty: "hard" , icon: "assets/levels/3.png" },
    { id: 2 , name: "LEVEL 4" , description: "Coming soon" , isActive: false , difficulty: "hard" , icon: "assets/levels/4.png" }
];

export const MAPS = [
    { id: 0, map : [1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 7, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 8, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 7, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 3, 3, 4, 3, 3, 4, 3, 3, 8], tileset: "assets/city_tileset.png" },
    { id: 1, map : [1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 7, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 8, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 7, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 6, 5, 4, 6, 5, 4, 6, 5, 2, 1, 3, 3, 4, 3, 3, 4, 3, 3, 8], tileset: "assets/winter_city_tileset.png"  }
]

export const INSTRUCTOR = [
    { id: 0, icon: "assets/characters/boy_face.png" , phrases: [ 
        { title: "WELCOME!", content: "It's time to start playing, but before you must choose a level"},    //Level Selection
        { title: "OKAY THEN", content: "Now choose a character, but remember, each of them has unique abilities"}   //Character Selection
    ]}
];

export const QUIZ_QUESTIONS = [
    { id: 0, question: "Which of the following content should you NOT publish?", answers: [
        { name: "Personal phone number", status: true },
        { name: "Image of a cat", status: false },
        { name: "Inspiring quote", status: false },
        { name: "Image of your new plant", status: false }
    ] },
    { id: 2, question: "Question *_*", answers: [
        { name: "Answer True", status: true },
        { name: "Answer False", status: false },
        { name: "Answer False", status: false },
        { name: "Answer False", status: false }
    ] }
];


