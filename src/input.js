export const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

export let gameReset = false;

window.addEventListener("keydown", (e) => {
  if (e.key in keys) {
    e.preventDefault();
    keys[e.key] = true;
  }
  if (e.key == 'r') {
    e.preventDefault();
    gameReset = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key in keys) {
    e.preventDefault();
    keys[e.key] = false;
  }
  if (e.key == 'r') {
    e.preventDefault();
    //gameReset = false;
    gameReset = false;
  }
});
