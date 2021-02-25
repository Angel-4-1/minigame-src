//import '../game/canvas-confetti.js';
const confetti = require('../game/canvas-confetti');


export const launchConfetti = () => {
    var duration = 1 * 1000;
    const end = Date.now() + duration;

    const colors = ['#41B883', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}