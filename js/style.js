var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


var c = canvas.getContext("2d");

function Circle(x, y, dx, dy, r, colorIndex) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.colorIndex = colorIndex;
    this.update = function () {

        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 360); //(x,y,r,stAngle,endAngle)
        c.fillStyle = color[this.colorIndex];
        c.fill();
        c.closePath();



        if (this.x > window.innerWidth || this.x < 0) {
            this.x = Math.random() * window.innerWidth;

            this.dx = (Math.random() - 0.5) * 5;
            this.dy = (Math.random() - 0.5) * 5;

            (Math.random() > 0.5) ? this.y = 0 : this.y = window.innerHeight;
            this.colorIndex = parseInt(Math.random() * color.length);
            this.r = (Math.random() * 30) + 10;
        }

        if (this.y > window.innerHeight || this.y < 0) {
            this.y = Math.random() * window.innerHeight;

            this.dx = (Math.random() - 0.5) * 5;
            this.dy = (Math.random() - 0.5) * 5;

            (Math.random() > 0.5) ? this.x = 0 : this.x = window.innerWidth;
            this.colorIndex = parseInt(Math.random() * color.length);
            this.r = (Math.random() * 30) + 10;
        }

        this.y += this.dy;
        this.x += this.dx;

    }

}
var color = ["#ffff01", "#ffc801", "#ff9000", "#ff6400", "#fe0000", "#c8007d", "#c8007d", "#6400a0", "#0011a9", "#005eb5", "#01a0c8", "#0eaf01", "#8bc800"];

var circleArray = [];

for (var i = 0; i < 100; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;
    var r = (Math.random() * 30) + 10;

    var colorIndex = parseInt(Math.random() * color.length);

    circleArray.push(new Circle(x, y, dx, dy, r, colorIndex));
}


//-------PLAYER------------

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

window.addEventListener("mousemove", (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})

var player = {
    radius: 20,
    increment: 0,
    finish: false
};

function animate() {
    requestAnimationFrame(animate);

    c.beginPath();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.closePath();

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        var dist = Math.sqrt(Math.pow(circleArray[i].x - mouse.x, 2) + Math.pow(circleArray[i].y - mouse.y, 2));

        if (dist < player.radius + 10 && circleArray[i].r < player.radius) {
            if (Math.random() > 0.5) {
                circleArray[i].x = window.innerWidth;
            }
            else {
                circleArray[i].x = 0;
            }
            circleArray[i].y = Math.random() * window.innerHeight;
            player.increment = circleArray[i].r / 5;
            circleArray[i].r += player.radius + ((Math.random() - 0.5) * 20);

        }
        else if (dist < player.radius + 10 && circleArray[i].r > player.radius) {

            player.finish = true;
        }
    }


    c.beginPath();
    c.arc(mouse.x, mouse.y, player.radius, 0, 360);
    c.fillStyle = "white";
    c.fill();
    c.closePath();

    if (player.increment > 0) {
        player.radius += player.increment;
        player.increment = 0;
    }

    if (player.finish) {
        alert("gameOver");
        return;
    }



}
animate();