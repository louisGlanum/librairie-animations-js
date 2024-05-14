window.addEventListener('DOMContentLoaded', () => {
waterEffect();
})

const waterEffect = () => {
    $('img').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04,
      });
}