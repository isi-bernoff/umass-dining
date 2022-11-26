const next_button = document.getElementById("time-button");

next_button.onclick = function() {
    const space = document.createElement("br");
    const title = document.getElementById("modal-title");
    document.getElementById("modal-title").innerHTML = "Order list";
    document.getElementById("container-hour").classList.remove("d-block");
    document.getElementById("container-time").classList.remove("d-block");
    document.getElementById("order-list").style.display = "block";
    title.appendChild(space);
    next_button.firstElementChild.innerHTML = "Confirm";
    next_button.onclick = function () {
        document.getElementById("order-list").style.display = "none";
        document.getElementById("time-button").classList.remove("d-block");
        next_button.style.display = "none !important";
        title.innerHTML = "Order placed!";
        title.appendChild(space);
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
        var newDate = new Date(date.getTime() + 30*60000);
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