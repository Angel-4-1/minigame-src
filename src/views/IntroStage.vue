<!--INTRO STAGE-->

<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <div class="introstage-div">
        <svg id="logo" width="877" height="196" viewBox="0 0 877 196" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 73V3H53.5V13H63.5V23H73.5V53H63.5V63H53.5V73H3.5ZM23.5 63H43.5V53H53.5V23H43.5V13H23.5V63Z" stroke="black" stroke-width="5"/>
            <path d="M83.5 73V3H153.5V13H103.5V33H143.5V43H103.5V63H153.5V73H83.5Z" stroke="black" stroke-width="5"/>
            <path d="M163.5 73V3H233.5V13H183.5V33H223.5V43H183.5V73H163.5Z" stroke="black" stroke-width="5"/>
            <path d="M243.5 73V3H313.5V13H263.5V33H303.5V43H263.5V63H313.5V73H243.5Z" stroke="black" stroke-width="5"/>
            <path d="M323.5 73V3H343.5V13H353.5V23H363.5V33H373.5V3H393.5V73H373.5V53H363.5V43H353.5V33H343.5V73H323.5Z" stroke="black" stroke-width="5"/>
            <path d="M403.5 73V3H453.5V13H463.5V23H473.5V53H463.5V63H453.5V73H403.5ZM423.5 63H443.5V53H453.5V23H443.5V13H423.5V63Z" stroke="black" stroke-width="5"/>
            <path d="M593.5 73V43H583.5V33H573.5V3H593.5V33H613.5V3H633.5V33H623.5V43H613.5V73H593.5Z" stroke="black" stroke-width="5"/>
            <path d="M653.5 73V63H643.5V13H653.5V3H703.5V13H713.5V63H703.5V73H653.5ZM663.5 63H693.5V13H663.5V63Z" stroke="black" stroke-width="5"/>
            <path d="M733.5 73V63H723.5V3H743.5V63H773.5V3H793.5V63H783.5V73H733.5Z" stroke="black" stroke-width="5"/>
            <path d="M803.5 73V3H863.5V13H873.5V43H853.5V53H863.5V63H873.5V73H843.5V63H833.5V53H823.5V73H803.5ZM823.5 43H843.5V33H853.5V13H823.5V43Z" stroke="black" stroke-width="5"/>
            <path d="M163.5 193V123H223.5V133H233.5V163H223.5V173H183.5V193H163.5ZM183.5 163H213.5V133H183.5V163Z" stroke="black" stroke-width="5"/>
            <path d="M243.5 193V123H303.5V133H313.5V163H293.5V173H303.5V183H313.5V193H283.5V183H273.5V173H263.5V193H243.5ZM263.5 163H283.5V153H293.5V133H263.5V163Z" stroke="black" stroke-width="5"/>
            <path d="M333.5 193V183H353.5V133H333.5V123H393.5V133H373.5V183H393.5V193H333.5Z" stroke="black" stroke-width="5"/>
            <path d="M433.5 193V183H423.5V173H413.5V163H403.5V123H423.5V153H433.5V163H443.5V153H453.5V123H473.5V163H463.5V173H453.5V183H443.5V193H433.5Z" stroke="black" stroke-width="5"/>
            <path d="M483.5 193V143H493.5V133H503.5V123H533.5V133H543.5V143H553.5V193H533.5V173H503.5V193H483.5ZM503.5 163H533.5V143H523.5V133H513.5V143H503.5V163Z" stroke="black" stroke-width="5"/>
            <path d="M583.5 193V183H573.5V173H563.5V143H573.5V133H583.5V123H623.5V133H633.5V143H613.5V133H593.5V143H583.5V173H593.5V183H613.5V173H633.5V183H623.5V193H583.5Z" stroke="black" stroke-width="5"/>
            <path d="M673.5 193V163H663.5V153H653.5V123H673.5V153H693.5V123H713.5V153H703.5V163H693.5V193H673.5Z" stroke="black" stroke-width="5"/>
        </svg>

        <button class="btn-start blinking" @click="changeState(destination)">START</button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';

export default {
    name: 'IntroStage',
    data() {
        return {
            destination: stages_constants.LANGUAGE_STAGE,
            id: stages_constants.INTRO_STAGE
        }
    },
    computed: {
        ...mapState( ['stage'])
    },
    methods: {
        changeState(mydestination) {
            this.$store.commit('changeState', { index: this.id, destination: mydestination})
        }
    }, mounted() {
        /*
        const logo = document.querySelectorAll("#logo path");

        for ( let i = 0; i < logo.length; i++ ) {
            console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
        }
        */
    }
}
</script>

<style scoped>
* {
    font-family: 'Press Start 2P', 'Carter One', 'arial';
}

.introstage-div{
    position: relative;
    align-content: center;
    padding: 10px;
    background: #f88f8f;
    height: 100vh;
    /* font-family: 'Carter One', arial; */
}
.btn-play {
    position: absolute;
    /*queda colocado respecto a uno de los vertices*/
    left: 50%;
    /*colocarlo bien*/
    transform: translate(-50%, -50%);
    bottom: 20%;

    padding: 10px;
    
    text-decoration: none;
    color: #000000;
    padding: 10px;
    margin-top: 10px;
    font-size: 1.5rem;
    cursor: pointer;

    outline: none;
    border: none;
    border-radius: 20px;
    background: rgb(122, 235, 235);
    border: 3px solid rgb(255, 255, 255);
    font-size: 3vh;
}

.btn-play:hover {
    background: rgb(106, 141, 236);
    color: white;
}

.btn-start {
    position: absolute;
    /*queda colocado respecto a uno de los vertices*/
    left: 50%;
    /*colocarlo bien*/
    transform: translate(-50%, -50%);
    bottom: 20%;

    background: none;
    border: none;
    outline: none;
    text-decoration: none;
    font-size: 4vh;
    cursor: pointer;
}

.btn-start:hover {
    color: #fff;
}

.blinking {
    animation: blinkingText 1.2s infinite;
}

@keyframes blinkingText{
    0%, 40% { 
        opacity: 0; 
    } 
    50%, 99% { 
        opacity: 1; 
    }
}

/*****LOGO*****/
#logo {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%,-50%);
    animation: fill-anim 0.5s ease forwards 6.4s;
    width: 80vw;
}

#logo path:nth-child(1) {   /* D */
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    animation: line-anim 2s ease forwards;
}

#logo path:nth-child(2) {   /* E */
    stroke-dasharray: 460;
    stroke-dashoffset: 460;
    animation: line-anim 2s ease forwards 0.3s;
}

#logo path:nth-child(3) {   /* F */
    stroke-dasharray: 360;
    stroke-dashoffset: 360;
    animation: line-anim 2s ease forwards 0.6s; 
}

#logo path:nth-child(4) {   /* E */
    stroke-dasharray: 460;
    stroke-dashoffset: 460;
    animation: line-anim 2s ease forwards 0.9s; 
}

#logo path:nth-child(5) {   /* N */
    stroke-dasharray: 420;
    stroke-dashoffset: 420;
    animation: line-anim 2s ease forwards 1.2s; 
}

#logo path:nth-child(6) {   /* D */
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    animation: line-anim 2s ease forwards 1.5s; 
}

#logo path:nth-child(7) {   /* Y */
    stroke-dasharray: 320;
    stroke-dashoffset: 320;
    animation: line-anim 2s ease forwards 1.8s; 
}

#logo path:nth-child(8) {   /* O */
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    animation: line-anim 2s ease forwards 2.1s; 
}

#logo path:nth-child(9) {   /* U */
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    animation: line-anim 2s ease forwards 2.4s; 
}

#logo path:nth-child(10) {   /* R */
    stroke-dasharray: 480;
    stroke-dashoffset: 480;
    animation: line-anim 2s ease forwards 2.7s; 
}

#logo path:nth-child(11) {   /* P */
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    animation: line-anim 2s ease forwards 2.9s; 
}

#logo path:nth-child(12) {   /* R */
    stroke-dasharray: 480;
    stroke-dashoffset: 480;
    animation: line-anim 2s ease forwards 3.2s; 
}

#logo path:nth-child(13) {   /* I */
    stroke-dasharray: 340;
    stroke-dashoffset: 340;
    animation: line-anim 2s ease forwards 3.5s; 
}

#logo path:nth-child(14) {   /* V */
    stroke-dasharray: 360;
    stroke-dashoffset: 360;
    animation: line-anim 2s ease forwards 3.8s; 
}

#logo path:nth-child(15) {   /* A */
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    animation: line-anim 2s ease forwards 4.1s; 
}

#logo path:nth-child(16) {   /* C */
    stroke-dasharray: 420;
    stroke-dashoffset: 420;
    animation: line-anim 2s ease forwards 4.4s; 
}

#logo path:nth-child(17) {   /* Y */
    stroke-dasharray: 320;
    stroke-dashoffset: 320;
    animation: line-anim 2s ease forwards 4.7s; 
}


@keyframes line-anim {
    to {
        stroke-dashoffset: 0;
    }
}

/*rellar el texto de manera progresiva*/
@keyframes fill-anim {
    from {
        fill: transparent;
    }
    to {
        fill: black;
    }
}
</style>