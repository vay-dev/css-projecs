const image = document.querySelector("img");
const input = document.querySelector("input");
const button = document.getElementById("button")

input.addEventListener("change", () => {
  image.src = URL.createObjectURL(input.files[0]);
})

button.addEventListener('click', () => {
  input.click();
})