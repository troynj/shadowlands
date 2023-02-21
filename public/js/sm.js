console.log("hi");

const icons = document.querySelectorAll(".icon");
icons.forEach((el) => {
  el.addEventListener("mouseenter", displaySelection);
  el.addEventListener("click", selectMonster);
});

function displaySelection(event) {
  const selectedId = event.target.id;
  const { 0: avatar, 1: stat } = document.querySelectorAll(
    `article[id="${selectedId}"]`
  );
  // console.log("itemArr", avatar, stat)
  avatar.classList.remove("hidden");
  avatar.classList.add("show");
  stat.classList.add("show");
  stat.classList.remove("hidden");

  this.addEventListener("mouseleave", hideSelection);
  function hideSelection(event) {
    const { 0: avatar, 1: stat } = document.querySelectorAll(
      `article[id="${selectedId}"]`
    );
    // console.log("itemArr", avatar, stat)
    avatar.classList.add("hidden");
    avatar.classList.remove("show");
    stat.classList.add("hidden");
    stat.classList.remove("show");
    this.removeEventListener("mouseleave", hideSelection);
  }
}