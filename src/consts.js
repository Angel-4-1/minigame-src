//This file contains constants variables used in the program

export const STAGES = {
    STAGE: 0,
    INTRO_STAGE:1,
    TUTORIAL_STAGE: 2,
    PLAY_STAGE: 3,
    FINAL_STAGE: 4
};

export const CHARACTERS = [
    { name: "Basic boy"   , id: 0, icon: "assets/characters/pig.png"   , data: "Something" , ability: "Run" , sprite: "assets/characters/animation.png"},
    { name: "Basic Girl"  , id: 1, icon: "assets/characters/tiger.png" , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet.png"},
    { name: "Character 3" , id: 2, icon: "assets/characters/pig.png"   , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet.png"},
    { name: "Character 4" , id: 3, icon: "assets/characters/tiger.png" , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet.png"},
    { name: "Character 5" , id: 4, icon: "assets/characters/pig.png"   , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet.png"},
    { name: "Character 6" , id: 5, icon: "assets/characters/tiger.png" , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet.png"},
    { name: "Character 7" , id: 6, icon: "assets/characters/pig.png"   , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet.png"},
    { name: "Character 8" , id: 7, icon: "assets/characters/tiger.png" , data: "Something" , ability: "Run" , sprite: "assets/characters/spritesheet.png"}
];

export const LEVELS = [
    { id: 0 , name: "LEVEL 1" , description: "Description of level 1" , isActive: true  , difficulty: "easy" , adress: "assets/levels/1.png" },
    { id: 1 , name: "LEVEL 2" , description: "Description of level 2 Description of level 2 Description of level 2 Description of level 2 Description of level 2 Description of level 2 Description of level 2 Description of level 2Description of level 2Description of level 2Description of level 2 Description of level 2" , isActive: false , difficulty: "medium" , adress: "assets/levels/2.png" },
    { id: 2 , name: "LEVEL 3" , description: "Description of level 3" , isActive: false , difficulty: "hard" , adress: "assets/levels/3.png" }
];
