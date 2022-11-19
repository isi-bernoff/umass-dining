const randomizer = (n) => {
    return Math.floor(Math.random() * n) + 1;
}

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