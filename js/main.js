let model = "";
function onSubmit(e) {
  e.preventDefault();
  document.querySelector(".image-container").hidden = true;
  document.querySelector(".msg").textContent = "";
  const divElement = document.querySelector(".image-container02"); // replace with your div ID
  while (divElement.firstChild) {
    divElement.removeChild(divElement.firstChild);
  }

  // document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  model = document.querySelector("#model").value;
  // const size = document.querySelector("#size").value;
  if (model === "") {
    alert("Please Select one opetion");
    return;
  }

  if (prompt === "") {
    alert("Please add some text");
    return;
  }
  switch (model) {
    case "text-generation":
      generateImageRequest(prompt);
      break;

    case "image-generation":
      imageGeneration();
      break;

    default:
      alert("error in model");
      return;
  }
}

async function generateImageRequest(prompt) {
  try {
    showSpinner();

    const response = await fetch("/api/Text-generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That text could not be generated");
    }

    const data = await response.json();
    removeSpinner();

    document.querySelector(".image-container").hidden = false;

    document.querySelector(".msg").innerText = data.data;
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);

// document
//   .querySelector("#model")
//   .addEventListener("onChange", onchange(target.value));

function change(event) {
  // console.log("on change true " + event.target.value);
  if (event.target.value === "image-generation") {
    document.querySelector("#size_div").hidden = false;

    // imageGeneration();

    document.querySelector("#prompt_div").hidden = true;
  } else {
    document.querySelector("#size_div").hidden = true;

    document.querySelector("#prompt_div").hidden = false;
  }
}
function img_size(event) {
  if (event.target.value !== "") {
    document.querySelector("#prompt_div").hidden = false;
  }
}

async function imageGeneration() {
  try {
    showSpinner();

    const prompt = document.querySelector("#prompt").value;

    const size = document.querySelector("#size").value;

    const response = await fetch("/api/Image-generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      removeSpinner();

      throw new Error("That text could not be generated");
    }

    removeSpinner();
    // adding image in front end
    if (data.success) {
      for (let i = 0; i < data.data.length; i++) {
        let div = document.querySelector(".image-container02");

        let img = document.createElement("img");

        let button = document.createElement("button");

        button.setAttribute(
          "onclick",
          "downloadImage('" + data.data[i].url + "')"
        );

        button.innerText = "Download Image";

        button.className = "btn";

        img.src = data.data[i].url;

        // img.className = "img";

        div.append(img);

        // div.append(button);
      }
    } else {
      removeSpinner();

      document.querySelector("#image-container02").textContent = data.data;
    }
  } catch (error) {
    removeSpinner();

    document.querySelector(".msg").textContent = error;
  }
}
function downloadImage(url) {
  const imageUrl = url; // replace with your image URL

  const fileName = "image.jpg"; // replace with your desired file name

  fetch(imageUrl, { mode: "no-cors" })
    .then((response) => response.blob())
    .then((blob) => {
      var link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);

      link.download = fileName;

      link.click();
    });

  // var blob = new Blob([imageUrl], { type: "image/png; charset=utf-8" });

  // var link = document.createElement("a");

  // link.href = window.URL.createObjectURL(blob);

  // link.download = fileName;

  // link.click();
}
