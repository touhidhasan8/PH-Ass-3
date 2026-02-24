// allCards Length ->
let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

let total = document.getElementById("total");
let interview = document.getElementById("interview");
let rejected = document.getElementById("rejected");
let grandtotal = document.getElementById("grand-total");
let interviewOf = document.getElementById("interview-of");

const allCards = document.getElementById("allCards");
console.log(allCards.children.length);

function calculate() {
  total.innerText = allCards.children.length;
  grandtotal.innerText = allCards.children.length;
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;
  interviewOf.innerText = interviewList.length;
}

calculate();

// Button Toggling

let allbtn = document.getElementById("all-btn");
let interviewbtn = document.getElementById("interview-btn");
let rejectedbtn = document.getElementById("rejected-btn");

function toggling(id) {
  allbtn.classList.add("bg-[#CCF3FF]", "text[#18ACCC]");
  interviewbtn.classList.add("bg-[#CCF3FF]", "text[#18ACCC]");
  rejectedbtn.classList.add("bg-[#CCF3FF]", "text[#18ACCC]");

  allbtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewbtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedbtn.classList.remove("bg-[#3B82F6]", "text-white");

  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.remove("bg-[#CCF3FF]", "text-gray-500");
  selected.classList.add("bg-[#3B82F6]", "text-white");

  if (id == "interview-btn") {
    allCards.classList.add("hidden");
    filteredItems.classList.remove("hidden");
    renderInterview();
  } else if (id == "all-btn") {
    allCards.classList.remove("hidden");
    filteredItems.classList.add("hidden");
  } else if (id == "rejected-btn") {
    allCards.classList.add("hidden");
    filteredItems.classList.remove("hidden");
    renderReject();
  }
}

document
  .getElementById("main-container")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("interview-btn")) {
      const parentNode = event.target.parentNode.parentNode;
      const cardTittle = parentNode.querySelector(".card-title").innerText;
      const status = parentNode.querySelector(".btn-success");
      const jobName = parentNode.querySelector(".job-name").innerText;
      const salary = parentNode.querySelector(".salary").innerText;
      const description = parentNode.querySelector(".description").innerText;

      status.innerText = " Applied";

      const cardInfo = {
        cardTittle,
        jobName,
        salary,
        description,
        status: "Applied",
      };

      const interviewExist = interviewList.find(
        (item) => item.cardTittle == cardInfo.cardTittle,
      );
      if (!interviewExist) {
        interviewList.push(cardInfo);
      }
      rejectedList = rejectedList.filter(
        (item) => item.cardTittle !== cardInfo.cardTittle,
      );

      if (currentStatus == "rejected-btn") {
        renderReject();
      }

      calculate();
    }
  });
document
  .getElementById("main-container")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("reject-btn")) {
      const parentNode = event.target.parentNode.parentNode;
      const cardTittle = parentNode.querySelector(".card-title").innerText;
      const status = parentNode.querySelector(".btn-success");
      const jobName = parentNode.querySelector(".job-name").innerText;
      const salary = parentNode.querySelector(".salary").innerText;
      const description = parentNode.querySelector(".description").innerText;

      status.innerText = "Rejected";

      const cardInfo = {
        cardTittle,
        jobName,
        salary,
        description,
        status: "Rejected",
      };

      const rejectedExist = rejectedList.find(
        (item) => item.cardTittle == cardInfo.cardTittle,
      );
      if (!rejectedExist) {
        rejectedList.push(cardInfo);
      }
      interviewList = interviewList.filter(
        (item) => item.cardTittle !== cardInfo.cardTittle,
      );
      if (currentStatus == "interview-btn") {
        renderInterview();
      }
      // renderReject ()
      calculate();
    }
  });

// Delete Function Create

document
  .getElementById("main-container")
  .addEventListener("click", function (event) {
    const btn = event.target.parentNode;
    if (!btn.classList.contains("delete-btn")) return;
    const card = btn.parentNode.parentNode.parentNode;
    const cardTitle = card.querySelector(".card-title").innerText;
    card.remove();
    interviewList = interviewList.filter(
      (item) => item.cardTittle !== cardTitle,
    );

    rejectedList = rejectedList.filter((item) => item.cardTittle !== cardTitle);
    if (currentStatus === "interview-btn") {
      renderInterview();
    } else if (currentStatus === "rejected-btn") {
      renderReject();
    }

    calculate();
  });

let filteredItems = document.getElementById("filtered-items");

function renderInterview() {
  filteredItems.innerHTML = "";

  if (interviewList.length === 0) {
    const noJob = document.createElement("p");

    noJob.innerHTML = `<div class="text-center mt-5">
          <div class="flex justify-center">
            <img src="./img/jobs.png" alt="" />
          </div>
          <p class="text-xl">No jobs available</p>
          <p class="text-gray-500">Check back soon for new job opportunities</p>
        </div>`;
    filteredItems.appendChild(noJob);
    return;
  }

  for (const items of interviewList) {
    let div = document.createElement("div");
    div.innerHTML = ` <div class="card bg-base-100 w-full shadow-sm mt-5 space-y-5">
          <div class="p-5">
            <div class="flex justify-between">
              <h2 class="card-title">${items.cardTittle}</h2>
              <p class="delete-btn cursor-pointer text-red-400">
                <i class="fa-solid fa-trash-can"></i>
                </p>
            </div>
            <p class="job-name text-gray-400">${items.jobName}</p>
            <p class="salary text-gray-400">
              Remote • Full-time • $130,000 - $175,000
            </p>
            <button class="btn-success">${items.status}</button>
            <p class="description text-gray-600">
             ${items.description}
            </p>
            <div class="card-actions">
              <button class="btn btn-outline  interview-btn btn-success">Interview</button>
              <button class="btn btn-outline  reject-btn btn-error">Rejected</button>
            </div>
          </div>
        </div>`;
    filteredItems.appendChild(div);
  }
}
function renderReject() {
  filteredItems.innerHTML = "";
  if (interviewList.length === 0) {
    const noJob = document.createElement("p");

    noJob.innerHTML = `<div class="text-center mt-5">
          <div class="flex justify-center">
            <img src="./img/jobs.png" alt="" />
          </div>
          <p class="text-xl">No jobs available</p>
          <p class="text-gray-500">Check back soon for new job opportunities</p>
        </div>`;
    filteredItems.appendChild(noJob);
    return;
  }
  for (const reject of rejectedList) {
    let div = document.createElement("div");
    div.innerHTML = ` <div class="card bg-base-100 w-full shadow-sm mt-5 space-y-5">
          <div class="p-5">
            <div class="flex justify-between">
              <h2 class="card-title">${reject.cardTittle}</h2>
              <p class="delete-btn cursor-pointer text-red-400">
                <i class="fa-solid fa-trash-can"></i>
                </p>
            </div>
            <p class="job-name text-gray-400">${reject.jobName}</p>
            <p class="salary text-gray-400">
              Remote • Full-time • $130,000 - $175,000
            </p>
            <button class="btn-success">${reject.status}</button>
            <p class="description text-gray-600">
             ${reject.description}
            </p>
            <div class="card-actions">
              <button class="btn btn-outline  interview-btn btn-success">Interview</button>
              <button class="btn btn-outline  reject-btn btn-error">Rejected</button>
            </div>
          </div>
        </div>`;
    filteredItems.appendChild(div);
  }
}
