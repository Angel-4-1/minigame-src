<!-- POP UP MESSAGE FROM THE INSTRUCTOR -->
<template>
    <div class="flipCard-container">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <ul class="flashcard-list">
        <li v-on:click="toggleCard(card)" v-for="(card, index) in cards" :key="index">
            <transition name="flip">
                <p v-bind:key="card.flipped" class="card">
                    {{ card.flipped ? card.back : card.front }}
                    <span v-on:click="cards.splice(index, 1)" class="delete-card">X</span>
                </p>
            </transition>
        </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'FlipCard',
    data() {
        return {
            show: true,
            cards: [
                {
                    front: 'The "First Computer Programmer"',
                    back: 'Ada Lovelace',
                    flipped: false,
                },
                {
                    front: 'Invented the "Clarke Calculator"',
                    back: 'Edith Clarke',
                    flipped: false,
                },
            ]
        }
    },
    methods: {
        toggleCard: function(card) {
            card.flipped = !card.flipped;
        },
        addNew: function() {
            if(!this.newFront || !this.newBack) {
                this.error = true;
            } else {
                this.cards.push({
                front: this.newFront,
                back: this.newBack,
                flipped: false
                });
                // set the field empty
                this.newFront = '';
                this.newBack = '';
                // Make the warning go away
                this.error= false;
            }
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped>
* {
    font-family: 'Press Start 2P', 'Carter One', 'arial';
    text-align: center;
}

ul {
    padding-left: 0;
    display: flex;
    flex-flow: row wrap;
}

li {
    list-style-type: none;
    padding: 10px 10px;
    transition: all 0.3s ease;
}

.flipCard-container {
    max-width: 100%;
    padding: 2em;
}

.card {
    display: block;
    width: 150px;
    height: 175px;
    padding: 80px 50px;
    background-color: #51aae5;
    border-radius: 7px;
    margin: 5px;
    text-align: center;
    line-height: 27px;
    cursor: pointer;
    position: relative;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    -webkit-box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
    -moz-box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
    box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
    will-change: transform;
}

li:hover{
    transform: scale(1.1);
}

li:nth-child(-n+3) .card{
    background-color: #e65f51;
}

li:nth-child(2n+1) .card{
    background-color: #a17de9;
}

li:nth-child(4n) .card{
    background-color: #feca34;
}

li:nth-child(5n-2) .card{
    background-color: #51aae5;
}

li:nth-child(4n+4) .card{
    background-color: #feca34;
}

li:nth-child(-7n+7) .card{
    background-color: #e46055;
}

.delete-card {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 15px;
    opacity: .4;
    transition: all 0.5s ease;
}

.delete-card:hover, .error {
    opacity: 1;
    transform: rotate(360deg);
}

/**FLIP TRANSITION**/
.flip-enter-active {
    transition: all 0.4s ease;
}

.flip-leave-active {
    display: none;
}

.flip-enter-from, .flip-leave-to {
    transform: rotateY(180deg);
    opacity: 0;
}
</style>