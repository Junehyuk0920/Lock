const server = io();
const pw = [9, 20, 12];
let unlocked = false;
let match = 0;

function drawClock()
{
    for(let i = 1; i <= 3; i++)
    {
        for (let cnt = 0; cnt < 40; cnt++)
        {
            let dom = cnt % 10 == 0 ? `<div class="tick major" style="transform: rotate(${cnt * 9}deg);"></div>` : `<div class="tick" style="transform: rotate(${cnt * 9}deg);"></div>`;
            document.querySelector(`#dial${i}`).insertAdjacentHTML("beforeend", dom);
        }
    }
}

drawClock();

server.on("newData", data => {
    data = data.trim().split(',').map(d => parseInt(d));
    match = 0;

    for (let i = 0; i < 3; i++)
    {
        if (Math.abs(data[i] - pw[i]) == 0) match++;
    }

    if (match == 3)
    {
        document.querySelector("h1").innerText = "unlocked";
    }
    else if (!unlocked) document.querySelector("h1").innerText = data;

    document.querySelector("#dial1").style.transform = `rotate(${data[0] * 9}deg)`;
    document.querySelector("#dial2").style.transform = `rotate(${data[1] * 9}deg)`;
    document.querySelector("#dial3").style.transform = `rotate(${data[2] * 9}deg)`;
});

document.querySelector(".door").addEventListener("mouseenter", () => {
    setTimeout(() => {
        if (match == 3) document.querySelector(".safe > div").style.transform = "rotateY(90deg)";
        else alert("incorrect password");
    }, 2500);
})

document.querySelector(".safe").addEventListener("mouseleave", () => {
    document.querySelector(".safe > div").style.transform = "rotateY(0deg)";
})