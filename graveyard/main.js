import { list } from "./list.js";

const items = document.getElementById("items");

list.forEach((item) => {
  const element = document.createElement("div");
  element.className = "bg-white/80 backdrop-blur text-black py-6 px-10 gap-4";
  element.style =
    "clip-path: polygon(1rem 0%, 100% 0%, calc(100% - 1rem) 100%, 0% 100%);";
  element.innerHTML = `
    <div class="flex gap-4 mb-4">
      <img src="${item.image}" class="size-14">
      <div>
        <h3 class="text-2xl">${item.name}</h3>
        <h4>${item.added} - ${item.removed}</h4>
      </div>
    </div>
    <p class="font-sans col-span-2">${item.description}</p>
  `;
  items.append(element);
  console.log(item.name);
});
