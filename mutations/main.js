import { list } from "./list.js";

console.log(list.length);

const searchInput = document.getElementById("search");
const brawlerList = document.getElementById("list");

function updateList() {
  const searchString =
    new URLSearchParams(window.location.search).get("q") || "";

  searchInput.value = searchString;

  const filteredList = list.filter((brawler) => {
    return brawler.name.toLowerCase().includes(searchString.toLowerCase());
  });

  brawlerList.innerHTML = "";

  if (filteredList.length === 0) {
    const element = document.createElement("li");
    element.innerHTML = `
    <p>No brawlers found, or this brawler might not have a mutation</p>
    `;
    brawlerList.append(element);
  }

  filteredList.forEach((brawler) => {
    const element = document.createElement("li");
    element.className = "brawler";
    element.innerHTML = `
    <img src="https://cdn-old.brawlify.com/brawler/${transformString(
      brawler.name
    )}.png">
  
    <div class="meta">
      ${brawler.mutation}
    </div>
  
    `;

    const copyEmbedLink = document.createElement("button");
    copyEmbedLink.innerText = "Copy embed link";
    copyEmbedLink.addEventListener("click", () => {
      // prettier-ignore
      const embedLink = `[${brawler.name.charAt(0).toUpperCase() + brawler.name.slice(1)}${brawler.name.slice(-1) === "s" ? "'" : "'s"} mutation (from brawl.page)](https://embed.jns.gg/🧬+${encodeURIComponent(brawler.name.charAt(0).toUpperCase()+ brawler.name.slice(1)).replace("%20", "+")}${brawler.name.slice(-1) === "s" ? "'" : "'s"}+mutation?provider=wiki.brawl.page%2Fmutations&providerurl=https://wiki.brawl.page/mutations&description=${encodeURIComponent(brawler.mutation)}&color=90e77a&image=https://cdn-old.brawlify.com/brawler/${transformString(brawler.name)}.png&imagetype=thumbnail&redirect=https://wiki.brawl.page/mutations)`;
      navigator.clipboard.writeText(embedLink);
      nToast("Copied Discord embed link to clipboard");
    });
    element.getElementsByClassName("meta")[0].append(copyEmbedLink);
    brawlerList.append(element);
  });
}

updateList();

searchInput.addEventListener("input", () => {
  const queryParams = new URLSearchParams(window.location.search);
  let newUrl;
  if (searchInput.value === "") {
    queryParams.delete("q");
    newUrl = `${window.location.pathname}`;
  } else {
    queryParams.set("q", searchInput.value);
    newUrl = `${window.location.pathname}?${queryParams.toString()}`;
  }
  window.history.replaceState({}, "", newUrl);
  updateList();
});

function transformString(inputString) {
  const words = inputString.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  const transformedString = capitalizedWords.join("-");

  return transformedString;
}
