const input = document.querySelector(".input");
const infoText = document.querySelector(".info-text");
const meaningContainer = document.querySelector(".search-container");
const titleOfWord = document.querySelector(".title");
const meaningOfWord = document.querySelector(".meaning");
const audio = document.querySelector(".audio");
const wordTitle = document.querySelector(".word-title");

async function fetchAPI(word) {
  try {
    infoText.style.display = "block";
    meaningContainer.style.display = "none";
    infoText.innerHTML = `Seaching the meaning of '${word}' `;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainer.style.display = "block";
      infoText.style.display = "none";
      titleOfWord.style.display = "none";
      wordTitle.style.display = "none";
      meaningOfWord.innerHTML = "Not available";
      audio.style.display = "none";
    } else {
      infoText.style.display = "none";
      titleOfWord.style.display = "block";
      wordTitle.style.display = "block";
      meaningContainer.style.display = "block";
      audio.style.display = "inline-flex";

      titleOfWord.innerHTML = result[0].word;
      meaningOfWord.innerHTML = result[0].meanings[0].definitions[0].definition;
      audio.src = result[0].phonetics[0].audio;
    }
  } catch (err) {
    infoText.innerHTML = `An error has happened,try again later...`;
  }
}

input.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
