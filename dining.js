const randomizer = (n) => {
    return Math.floor(Math.random() * n) + 1;
}

// Get the modal
const modal = document.getElementById("myModal");

const modal_yes = document.getElementById("modal-yes");
const modal_no = document.getElementById("modal-no");

const next_button = document.getElementById("time-button");
// Get the <span> element that closes the modal
const close = document.getElementById("close");

let tableId;

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

modal_yes.onclick = function() {
    document.getElementById("modal-title").innerHTML = "What time?";
    document.getElementById("modal-buttons").style.display = "none";
    document.getElementById("container-hour").style.display = "block";
    document.getElementById("container-time").style.display = "block";
    next_button.style.display = "block";
}

modal_no.onclick = function() {
    modal.style.display = "none";
}

next_button.onclick = function() {
    const space = document.createElement("br");
    const title = document.getElementById("modal-title");
    document.getElementById("modal-title").innerHTML = "How long?";
    title.appendChild(space);
    title.innerHTML += "(in minutes)"
    document.getElementById("container-hour").style.display = "none";
    document.getElementById("container-time").style.display = "none";
    document.getElementById("modal-range").style.display = "block";
    next_button.firstElementChild.innerHTML = "Confirm";
    next_button.onclick = function () {
        const slideValue = document.getElementById("slider").valueAsNumber;
        document.getElementById("modal-range").style.display = "none";
        next_button.style.display = "none";
        title.innerHTML = `The following table: \n ${tableId}`;
        title.appendChild(space);
        title.innerHTML += "has been reserved successfully ";
        const date = new Date();
        const dateString = date.toLocaleTimeString('en-US', 
        { hour12: false, 
            hour: "numeric", 
            minute: "numeric"});
        title.innerHTML += "at " + dateString + "!";
        title.appendChild(space);
        const textNode = document.createElement("p");
        textNode.classList.add("mt-4")
        title.append(textNode);
        var newDate = new Date(date.getTime() + slideValue*60000);
        var deadline = newDate.getTime();
        var x = setInterval(function() {
        var now = new Date().getTime();
        var t = deadline - now;
        var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        if (hours !== 0) {
            textNode.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
        } else {
            textNode.innerHTML = minutes + "m " + seconds + "s ";
        }
            if (t < 0) {
                clearInterval(x);
                textNode.innerHTML = "EXPIRED";
            }
        }, 1000);
    }
}


const hour = document.getElementById("hour");
for (let i = 7; i < 24; i++) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    h3.innerHTML = i;
    li.appendChild(h3);
    hour.appendChild(li);
}

const time = document.getElementById("time");
for (let i = 0; i < 60; i++) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    h3.innerHTML = i;
    li.appendChild(h3);
    time.appendChild(li);
}

const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = (()=>{
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = (value/2) + "%";
  slideValue.classList.add("show");
});
inputSlider.onblur = (()=>{
  slideValue.classList.remove("show");
});

for (let elem of document.querySelectorAll(".hidden")) {
    const nums = elem.querySelectorAll("b");
    const randomNum = randomizer(10);
    const card = elem.parentNode;
    if (randomNum < 3) {
        card.style.background = `rgb(158, 247, 166)`;
    } else if (randomNum < 6) {
        card.style.background = `rgb(245, 255, 153)`;
    } else {
        card.style.background = `rgb(224, 141, 147)`;
    }
    nums[0].innerHTML = randomNum;
    nums[1].innerHTML = Math.round(randomNum * 1.8);
}

const tableGenerator = () => {
    const random = randomizer(3);
    const table = document.createElement("button");
    const title = document.getElementById("modal-title");
    const yes_button = document.getElementById("modal-yes");
    if (random === 1) {
        table.style.background = "green";
        table.innerHTML = "✓";
    } else if (random === 2) {
        table.style.background = "yellow";
        table.style.color = "black";
        table.innerHTML = randomizer(6);
    } else {
        table.style.background = "red";
        table.innerHTML = "X";
    }
    table.onclick = function() {
        if (random === 1) {
            title.innerHTML = "Reserve?"
            yes_button.disabled = false;
            yes_button.style.filter = "brightness(1)";
            yes_button.style.cursor = "pointer";
            
        }
        else if (random === 2) {
            title.innerHTML = "The table that you selected is currently occupied."
            yes_button.disabled = true;
            yes_button.style.filter = "brightness(0.5)";
            yes_button.style.cursor = "not-allowed";
        }
        else {
            title.innerHTML = "The table that you selected is not available."
            yes_button.disabled = true;
            yes_button.style.filter = "brightness(0.5)";
            yes_button.style.cursor = "not-allowed";
        }
        tableId = table.id;
        modal.style.display = "block";
    }
    return table;
}

const render = (tables) => {
    // couches (left)
    const Couches = document.createElement("div");
    Couches.classList.add("couch");
    for (let i = 0; i < 7; i++) {
        const table = tableGenerator();
        table.id = `couch-${i+1}`
        Couches.appendChild(table);
    }

    // window round tables (bottom)
    const Windows = document.createElement("div");
    Windows.classList.add("window");
    for (let i = 0; i < 10; i++) {
        const table = tableGenerator();
        table.id = `window-${i+1}`
        Windows.appendChild(table);
    }
    
    // dessert tables (middle left)
    const Desserts = document.createElement("div");
    Desserts.classList.add("dessert");
    for (let i = 0; i < 3; i++) {
        const table = tableGenerator();
        table.id = `dessert-${i+1}`
        Desserts.appendChild(table);
    }
    
    // bakery tables (middle left)
    const Bakeries = document.createElement("div");
    Bakeries.classList.add("bakery");
    for (let i = 0; i < 3; i++) {
        const table = tableGenerator();
        table.id = `bakery-${i+1}`
        Bakeries.appendChild(table);
    }

    // wok tables (middle right)
    const Woks = document.createElement("div");
    Woks.classList.add("wok");
    for (let i = 0; i < 4; i++) {
        const table = tableGenerator();
        table.id = `wok-${i+1}`
        Woks.appendChild(table);
    }

    // sushi tables (middle right)
    const Sushi = document.createElement("div");
    Sushi.classList.add("sushi");
    for (let i = 0; i < 4; i++) {
        const table = tableGenerator();
        table.id = `sushi-${i+1}`
        Sushi.appendChild(table);
    }
    
    // beverage tables (right)
    const Beverages = document.createElement("div");
    Beverages.classList.add("beverage");
    for (let i = 0; i < 2; i++) {
        const table = tableGenerator();
        table.id = `beverage-${i+1}`
        Beverages.appendChild(table);
    }

    // kitchen tables (right)
    const Kitchens = document.createElement("div");
    Kitchens.classList.add("kitchen");
    for (let i = 0; i < 5; i++) {
        const table = tableGenerator();
        table.id = `kitchen-${i+1}`
        Kitchens.appendChild(table);
    }

    // annex tables (top)
    const AnnexTop = document.createElement("div");
    AnnexTop.classList.add("annexTop");
    for (let i = 0; i < 10; i++) {
        const table = tableGenerator();
        table.id = `annexTop-${i+1}`
        AnnexTop.appendChild(table);
    }

    // annex tables (bottom)
    const AnnexBottom = document.createElement("div");
    AnnexBottom.classList.add("annexBottom");
    for (let i = 0; i < 10; i++) {
        const table = tableGenerator();
        table.id = `annexBottom-${i+1}`
        AnnexBottom.appendChild(table);
    }

    tables.appendChild(Couches);
    tables.appendChild(Windows);
    tables.appendChild(Desserts);
    tables.appendChild(Bakeries);
    tables.appendChild(Woks);
    tables.appendChild(Sushi);
    tables.appendChild(Beverages);
    tables.appendChild(Kitchens);
    tables.appendChild(AnnexTop);
    tables.appendChild(AnnexBottom);
}

render(document.getElementById("tables"));