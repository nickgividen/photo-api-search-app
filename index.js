var apiKey = "563492ad6f91700001000001e5e7dd55592545cea6224f947b3d30bb";

var searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      var response = JSON.parse(xhttp.responseText);
      var photoData = response.photos.map(function (photos) {
        return photos;
      });

      console.log(photoData);

      var container = document.getElementById("container");
      container.innerHTML = "";

      photoData.forEach(function (photo) {
        var photoDiv = document.createElement("div");
        photoDiv.classList.add("photo-div");
        photoDiv.innerHTML = `
      <img src=${photo.src.large} class="photo">
      <a href="${photo.url}" target=_blank class="photographer-link">
      Photographer: ${photo.photographer}
      </a>
      `;
        container.appendChild(photoDiv);
      });
    }
  };

  var header = document.getElementById("header");

  function fixedSearch() {
    if (window.scrollY >= 265) {
      searchForm.classList.add("fixed");
      header.classList.remove("hidden");
    } else {
      searchForm.classList.remove("fixed");
      header.classList.add("hidden");
    }
  }

  window.addEventListener("scroll", fixedSearch);

  var textValue = document.getElementById("search-bar").value;
  console.log(textValue);
  xhttp.open(
    "GET",
    `https://api.pexels.com/v1/search?&query=${textValue}`,
    true
  );
  xhttp.setRequestHeader(
    "Authorization",
    "563492ad6f91700001000001e5e7dd55592545cea6224f947b3d30bb"
  );
  xhttp.send();
});
