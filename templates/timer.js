var pomodoro = {
    number: 1,
    session_timer: 25,
    session_on: false
};

const page_location = document.URL;

function loadPage() {
    if (page_location.includes("break"))
    {
        document.getElementById("myAudio"); 
        window.location.replace(page_location.slice(0, -5));
        window.location.reload();
        pomodoro.number++;
    } else {
        document.getElementById("myAudio"); 
        window.location.replace(page_location.split("#")[0] + "#break");
        window.location.reload();
    }
}

function start_countdown(adder) {
    // GET DATE
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var monthName = monthNames[Number(mm) - 1].slice(0, 3);
    var current_date = monthName + " " + dd + ", " + yyyy;

    // GET TIME
    if (adder === 25) {
        if (Number(today.getMinutes()) < 35)
            var time = today.getHours() + ":" + (Number(today.getMinutes() + adder)).toString() + ":" + today.getSeconds();
        else
            var time = today.getHours() + 1 + ":" + (Number(today.getMinutes() + adder - 60)).toString() + ":" + today.getSeconds();
    } else {
        if (Number(today.getMinutes()) < 55)
            var time = today.getHours() + ":" + (Number(today.getMinutes() + adder)).toString() + ":" + today.getSeconds();
        else
            var time = today.getHours() + 1 + ":" + (Number(today.getMinutes() + adder - 60)).toString() + ":" + today.getSeconds();
    }

    // INITIATE COUNTDOWN
    var countDownDate = new Date(current_date + " " + time).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        console.log("session")

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("demo").innerHTML = minutes + ":" + seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
            document.getElementById("myAudio"); 

            if (adder === 5)
                pomodoro.number++;
            loadPage();
        }
    }, 1000);
}

document.querySelector("#skip-session").addEventListener("click", () => {
    loadPage();
});


if (page_location.includes("break")) {
    var break_timer = (pomodoro.number % 4 === 0) ? 35 : 5;
    start_countdown(break_timer);
}
else
    start_countdown(pomodoro.session_timer);