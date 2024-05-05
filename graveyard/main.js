import { list } from "./list.js";

list.forEach((item) => {
  const element = document.createElement("div");
  element.className = "bg-white/80 rounded-xl text-black p-6 gap-4";
  element.innerHTML = `
    <div class="flex gap-4 mb-4">
    ${
      item.image
        ? `<img src="${item.image}" class="size-14 object-contain">`
        : ""
    }
      <div>
        <h3 class="text-2xl">${item.name}</h3>
        ${
          item.added && item.removed
            ? `<h4>${item.added} - ${item.removed}</h4>`
            : ""
        }
      </div>
    </div>
    <p class="font-sans col-span-2">
    ${item.description ? item.description : "No description"}
    </p>
  `;
  items.append(element);
  console.log(item.name);
});
