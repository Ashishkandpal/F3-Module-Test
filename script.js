// link for api
// https://api.nasa.gov/planetary/apod?date=${date}&api_key=${Ph4uRNW7VNWJiWqAlG2jWhbJL4moNZqlDwlJDP0W}

const getDate = document.querySelector(".insert-Date");
const btn = document.querySelector(".search-btn");
const section1 = document.querySelector(".section-1");
const historyDates = document.querySelector(".history");

const html = function (data) {
  return `
<div class="section-1-first">
<div class="heading">Picture on ${data.date}</div>
<div class="rel-img">
  <img
    src="${data.url}"
    alt="space"
  />
</div>
</div>
<div class="section-1-second">
<div class="title">
  ${data.title}
</div>
<div class="description">
  ${data.explanation}
</div>
</div>
`;
};

const apiKey = "Ph4uRNW7VNWJiWqAlG2jWhbJL4moNZqlDwlJDP0W";

const apiData = async function (insertedDate) {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${insertedDate}&api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const findingPOD = function (insertedDate) {
  const obj = apiData(insertedDate);
  obj.then((data) => {
    const content = html(data);
    section1.replaceChildren();
    section1.insertAdjacentHTML("afterbegin", content);
    getDate.value = data.date; // for changing the input date value if we jump through history
  });
};

const searched = [];

btn.addEventListener("click", function (e) {
  e.preventDefault();

  const insertedDate = new Date(getDate.value).toISOString().split("T")[0];

  // showing the date value in the history
  historyDates.insertAdjacentHTML(
    "beforeend",
    `<div><a href='#' value='${insertedDate}'>${insertedDate}</a></div>`
  );

  // setting the date value in the local storage
  searched.push({ date: insertedDate });
  localStorage.setItem("searches", JSON.stringify(searched));

  findingPOD(insertedDate);
});

historyDates.addEventListener("click", function (e) {
  const insertedDate = new Date(e.target.innerText).toISOString().split("T")[0];
  findingPOD(insertedDate);
});

// functionality for loading the image according to current date
window.addEventListener("load", function () {
  const currentDate = new Date().toISOString().split("T")[0];
  findingPOD(currentDate);
});
