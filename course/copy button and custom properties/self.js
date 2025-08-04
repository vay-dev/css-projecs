document.querySelectorAll(".copy-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetElement = document.querySelector(btn.dataset.copy);
    const textToCopy = targetElement.textContent.replace(/\s+/g, " ").trim();

    const label = btn.querySelector(".label");
    navigator.clipboard.writeText(textToCopy).then(() => {
      btn.disabled = true;
      label.textContent = "Copied!";

      setTimeout(() => {
        btn.disabled = false;
        label.textContent = "Copy";
      }, 1000);
    });
  });
});
