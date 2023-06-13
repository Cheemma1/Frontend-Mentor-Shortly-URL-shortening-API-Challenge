const burger = document.querySelector(".bullet");
const nav = document.querySelector(".navigation");
burger.addEventListener("click", function () {
  burger.classList.toggle("toggle");
  nav.classList.toggle("show-nav");
});


let output = document.getElementById("output");
let form = document.getElementById("form");
let inputEl = document.getElementById("text");
let error = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = inputEl.value;
  if (url === "") {
    inputEl.style.border = "1px solid red";
    error.style.display = "block";
    return;
  } else {
    inputEl.style.border = "1px solid green";
    error.style.display = "none";
    getData(url);
  }
});

async function getData(url) {
  try {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);

    const data = await response.json();
    // console.log(data.result.short_link)
    const newUrl = document.createElement("div");

    newUrl.innerHTML = ` <div class="output">
<div class="output-content">
<p class="original-link">${data.result.original_link}</p>
<div class="output-link">
<p>${data.result.short_link}</p>
<button class="new-btn">Copy</button>
</div>
</div>
</div>
`;
    output.appendChild(newUrl);

    // storing the newUrl in local storage
    localStorage.setItem("newUrlContents", newUrl.innerHTML);

    // Function to copy link
    let copyBtn = newUrl.querySelector(".new-btn");
    copyBtn.addEventListener("click", () => {
      const linkText = newUrl.querySelector(".output-link p").textContent;

      const textarea = document.createElement("textarea");
      textarea.value = linkText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      copyBtn.textContent = "Copied!";
      copyBtn.style.backgroundColor = "black";
      //   console.log(copyBtn);
    });
  } catch (error) {
    displayError(error);
  }
}
function displayError(linkerror) {
  console.log(linkerror.message);
}

// Function to load and display newUrl contents from localStorage
function displayStoredUrlContents() {
  const storedContents = localStorage.getItem("newUrlContents");
  if (storedContents) {
    output.innerHTML = storedContents;
  }
}

// Event listener to call displayStoredUrlContents when the window loads
window.addEventListener("load", displayStoredUrlContents);
