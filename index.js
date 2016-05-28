//TODO maybe remove unnecessary data in <img> declarations
// INITIALISATION
// Do we need a constructor for spaceship? No!
var TEAM_GOOD = "teamGood",
    TEAM_BAD = "teamBad";
var pieces = [];
var spaceship = new Movable(5, 500, 500, 0, 3, 5, document.getElementById("spaceshipImg"), TEAM_GOOD);
var drones = [];
var explosionImgs = [];
var enemies = 0;
for (i = 0; i < 4; i++)
    drones.push(new Drone(i));

var laserBolts = [];

var patrolPoint = {
    x: 300,
    y: 300
}
var gameOver = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// GAME FUNCTIONS
function init() {
    console.log("init");
    var ix;
    for (ix in drones)
        drones[ix].redraw();
    spaceship.redraw();

    //place structures
    placeStructure(patrolPoint.x, patrolPoint.y);

    // show start screen and wait for pressed key
    document.onkeydown = undefined;
    document.getElementById("startScreen").style.visibility = "hidden";
    setTimeout("gameLoop()", 1);
}

function gameLoop() {
    document.getElementById("arena").style.zIndex = "-1";

    //document.getElementById("arena").style.visibility="hidden";

    //document.onkeydown = spaceship.move;

    // TODO: list of Automatons!!!!
    for (xyx in pieces)
        pieces[xyx].move();

    checkForCollisions();
    verifyExplosionImgs();

    // TODO check for victory : pieces.contains(TEAM_BAD)
    if (enemies == 0)
        document.getElementById("victoryScreen").style.visibility = "visible";
    else if (!gameOver)
        requestAnimationFrame(gameLoop);
    else
        document.getElementById("gameOverScreen").style.visibility = "visible";
}
document.getElementById("startScreen").style.zIndex = "5";
document.getElementById("gameOverScreen").style.zIndex = "5";
document.getElementById("victoryScreen").style.zIndex = "5";
document.onkeydown = init;
//init
//setTimeout("gameLoop()", 1);

function verifyExplosionImgs() {
    var expImg;
    for (xyx in explosionImgs) {
        expImg = explosionImgs[xyx];
        var expLife = parseInt(expImg.life);
        expImg.life = --expLife;
        if (expLife == 0) {
            expImg.style.visibility = "hidden";
            explosionImgs.splice(explosionImgs.indexOf(expImg), 1);
        }
    }
}

function checkForCollisions() {
    for (coll1 in pieces) {
        for (coll2 = parseInt(coll1) + 1; coll2 < pieces.length; coll2++) {

            if (distance(pieces[coll1], pieces[coll2]) > 10)
                continue;
            if (pieces[coll1].team == pieces[coll2].team)
                continue;

            var xC = pieces[coll1].x,
                yC = pieces[coll1].y;

            // delete collided
            var piecesLength = pieces.length;
            pieces[coll1].hit();
            if (pieces.length < piecesLength) //TODO: only if
                coll2--;
            pieces[coll2].hit();

            // explosion.gif animation
            var img = document.createElement("img");
            img.src = "img/explosion.gif";
            var src = document.getElementById("firt");
            src.appendChild(img);

            img.style.zIndex = "1";
            img.style = "position:absolute";
            img.style.top = xC + "px";
            img.style.left = yC + "px";

            img.life = "50";
            explosionImgs.push(img);
        }
    }
}

function placeStructure(xCo, yCo) {
    //TODO Movable with speeds = 0 & shooting rockets

    for (ind = 0; ind < 4; ind++) {
        var struc;
        // structure
        var img = document.getElementById("struct" + ind);

        img.style.top = xCo + parseInt(img.style.top) + "px";
        img.style.left = yCo + parseInt(img.style.left) + "px";
        struc = new Movable(3, parseInt(img.style.top.substring(0, img.style.top.length - 2)), parseInt(img.style.left.substring(0, img.style.left.length - 2)), 0, 0, 0, img, TEAM_BAD);
        struc.move = function () {
        }
        // connection
        img = document.getElementById("link" + ind);
        img.style.top = xCo + parseInt(img.style.top) + "px";
        img.style.left = yCo + parseInt(img.style.left) + "px";
        struc = new Movable(2, parseInt(img.style.top.substring(0, img.style.top.length - 2)), parseInt(img.style.left.substring(0, img.style.left.length - 2)), 0, 0, 0, img, TEAM_BAD);
        struc.move = function () {
        }
    }
    //rotate connections
    rotateImage(document.getElementById("link1"), 90);
    rotateImage(document.getElementById("link3"), 90);
}
// GAME FUNCTIONS

// PROTOTYPES
function Movable(lives, x, y, orientation, speed, rotationSpeed, image, team) {
    // abstract prototype of spaceship & drones
    this.lives = lives;
    this.x = x;
    this.y = y;
    this.orientation = moduloAngle(orientation);
    this.speed = Math.abs(speed);
    this.rotationSpeed = Math.abs(rotationSpeed);
    this.image = image;
    // Add to pieces
    if (arguments.length >= 2) {//2 for x & y, so as not to add e.g. "Drone.prototype = new Movable()"
        pieces.push(this);
        if (team == TEAM_BAD)
            enemies++;
    }
    this.team = team;


    this.translate = function (forNotBackwards) {
        this.x += Math.cos(toRadians(this.orientation)) * this.speed * (forNotBackwards ? 1 : -1);
        this.y += Math.sin(toRadians(this.orientation)) * this.speed * (forNotBackwards ? 1 : -1);
        reModuloCoords(this);
        this.redraw();
    };

    this.rotate = function (leftNotRight) {
        this.orientation += this.rotationSpeed * (leftNotRight ? 1 : -1);
        reModuloCoords(this);
        this.redraw();
    };

    this.redraw = function () {
        this.image.style.top = this.x + "px";
        this.image.style.left = this.y + "px";
        rotateImage(this.image, -moduloAngle(this.orientation + 180));
    };

    this.hit = function () {
        this.lives--;
        if (this == spaceship)
            document.getElementById("heart" + this.lives).style.visibility = "hidden";
        if (this.lives == 0)
            this.disappear();
    };

    // destructor
    this.disappear = function () {
        // remove from pieces
        pieces.splice(pieces.indexOf(this), 1);
        // hide image
        this.image.style.visibility = "hidden";
        // decrement enemies count
        if (this.team == TEAM_BAD)
            enemies--;
    };

    this.lastShotTime = 0;
    this.shootInterval = 1.5; //seconds
    this.tryShoot = function (shootFunc) { // maybe also give shootInterval as parameter
        var now = Date.now() / 1000;
        if (this.lastShotTime + this.shootInterval < now) {
            console.log("'now'=" + now);
            this.lastShotTime = now;
            shootFunc();
        }
    }
}

// LASERBOLT
function LaserBolt(x, y, direction, speed, team) {
    var img = document.createElement("img");
    img.src = "img/" + team + "Laser.gif";
    var src = document.getElementById("firt");
    src.appendChild(img);

    img.style.zIndex = "1";
    img.style = "position:absolute; top:500px; left:885px";

    Movable.call(this, 1, x, y, direction, speed, 0, img, team);

    this.distanceTravelled = 0;

    this.move = function () {
        if (this.distanceTravelled >= 300) {
            //remove image
            document.getElementById("firt").removeChild(img);
            //remove from laserBolts
            laserBolts.splice(laserBolts.indexOf(this), 1);
            // remove from pieces
            pieces.splice(pieces.indexOf(this), 1);
        }
        else {
            this.translate(true);
            this.distanceTravelled += this.speed;
        }
    }

}
LaserBolt.prototype = new Movable();

// ROCKET
function Rocket() {

}

// DRONE
function Drone(index) {
    // constructor for drone
    Movable.call(this, 2, index * 30, index * 120, 0, 1, 5, document.getElementById("drone" + index), TEAM_BAD);

    this.move = function () {
        if (this.spaceshipInSight()) {//chase
            //console.log("drone: go to spaceship");
            this.goTo(spaceship);
            // create function to shoot ship

            var angleL = this.calcAngleToFollow(spaceship),
                xL = this.x,
                yL = this.y,
                speedL = this.speed + 1,
                teamL = this.team;
            var shootShip = function () {
                //laserBolts.push(new LaserBolt(this.x, this.y, angleToShoot, this.speed+1, this.team));
                laserBolts.push(new LaserBolt(xL, yL, angleL, speedL, teamL));
            }

            this.tryShoot(shootShip);
        }
        else // patrol
            this.goPatrol();
    };

    this.shootSpaceship = function () {
        var angleToShoot = this.calcAngleToFollow(spaceship);
        laserBolts.push(new LaserBolt(this.x, this.y, angleToShoot, this.speed + 1, this.team));
    };

    this.spaceshipInSight = function () {
        var lineOfSight = 175;
        return distance(this, spaceship) < lineOfSight;
    };

    this.calcAngleToFollow = function (coord) {
        //calculate  and in directionwhich direction to rotate
        var xDiff = coord.x - this.x;
        var yDiff = coord.y - this.y;

        // calculate
        return toDegrees(Math.atan2(yDiff, xDiff));
    };

    this.goTo = function (coord) {
        var angleToFollow = this.calcAngleToFollow(coord);

        // Rotation to follow correctly
        var angleDiff = moduloAngle(angleToFollow - this.orientation);
        //console.log("to follow: " + angleToFollow);
        //console.log("To follow:" + angleToFollow + " diff:" +angleDiff + " myAngle:" + this.orientation );
        if (Math.abs(angleDiff) >= 5) {
            ////console.log("rotate" + (angleDiff>0?"left":"right"));
            this.rotate(angleDiff > 0);
        }
        else if (distance(this, coord) < 5) {
            //console.log("chilling");
        }
        else {
            ////console.log(Math.abs(angleDiff)<90?"forward":"backward");
            // Movement: forwards or backwards?
            // Forwards if going forward would bring you closer, else not.
            this.translate(Math.abs(angleDiff) < 90); //=>stupid
        }
    };

    this.shoot = function (coord) {
        var angleToShoot = this.calcAngleToFollow(coord);
        laserBolts.push(new LaserBolt(this.x, this.y, angleToShoot, this.speed + 1, this.team));
    };

    this.goPatrol = function () {
        var dist = distance(this, patrolPoint);
        if (dist > 100) {
            // drone too far to circle patrolPoint: go to it.
            //console.log("drone" + this.index + ": patrol: go to patrolPoint (distance:" + dist);
            this.goTo(patrolPoint);
            return;
        }

        var xDiff = patrolPoint.x - this.x;
        var yDiff = patrolPoint.y - this.y;
        // angle to follow is orthogonal to the distance-vector,
        // +90 => counterclockwise
        //var angleToFollow = toDegrees(Math.atan(yDiff/xDiff))+90;

        var angleToFollow = 90 + toDegrees(Math.atan2(yDiff, xDiff));
        var angleDiff = moduloAngle(angleToFollow - this.orientation);


        if (Math.abs(angleDiff) > 5)
            this.rotate(angleDiff > 0);
        else
            this.translate(true);

    };
}
// see:  http://stackoverflow.com/questions/13040684/javascript-inheritance-object-create-vs-new
// necessary for inheritance => without it:
//	//console.log(new Drone()	instanceof Movable); => "false"
Drone.prototype = new Movable();

// SPACESHIP
var rightPressed,
    leftPressed,
    downPressed,
    upPressed,
    spacePressed;

function keyDownHandler(e) {
    switch (e.keyCode) {
        case 38:
            upPressed = true;
            break;
        case 40:
            downPressed = true;
            break;
        case 37:
            leftPressed = true;
            break;
        case 39:
            rightPressed = true;
            break;
        case 32:
            spacePressed = true;
            break;
    }
}

function keyUpHandler(e) {
    switch (e.keyCode) {
        case 38:
            upPressed = false;
            break;
        case 40:
            downPressed = false;
            break;
        case 37:
            leftPressed = false;
            break;
        case 39:
            rightPressed = false;
            break;
        case 32:
            spacePressed = false;
            break;
    }
}

spaceship.move = function () {
    // TODO inertia!
    if (upPressed) //forward
        spaceship.translate(true);
    if (downPressed) //backward
        spaceship.translate(false);
    if (leftPressed) //left
        spaceship.rotate(true);
    if (rightPressed) //right
        spaceship.rotate(false);
    if (spacePressed)
        spaceship.tryShoot(spaceship.shoot);
}

spaceship.shoot = function () {
    laserBolts.push(new LaserBolt(spaceship.x, spaceship.y, spaceship.orientation, spaceship.speed + 1, spaceship.team));
}

spaceship.disappear = function () {
    //remove from pieces
    pieces.splice(pieces.indexOf(this), 1);
    //hide image
    this.image.style.visibility = "hidden";
    gameOver = true;
}
spaceship.shootInterval = 0.25;

// MATHEMATICAL FUNCTIONS
function reModuloCoords(elem) { // with side-effect!
    elem.x = moduloValue(elem.x, parseInt(document.getElementById("arena").height));
    elem.y = moduloValue(elem.y, parseInt(document.getElementById("arena").width));
    elem.orientation = moduloAngle(elem.orientation);
}

// Returns a value between -180 and 180
function moduloAngle(degrees) {
    return ((degrees + 180) % 360) - 180;
}

function moduloValue(value, mod) {
    return ((value % mod) + mod) % mod;
}

function distance(pointA, pointB) {
    var xDiff = pointB.x - pointA.x;
    var yDiff = pointB.y - pointA.y;
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function rotateImage(elem, degrees) {
    if (navigator.userAgent.match("Chrome"))
        elem.style.WebkitTransform = "rotate(" + degrees + "deg)";
    else if (navigator.userAgent.match("Firefox"))
        elem.style.MozTransform = "rotate(" + degrees + "deg)";
    else if (navigator.userAgent.match("MSIE"))
        elem.style.msTransform = "rotate(" + degrees + "deg)";
    else if (navigator.userAgent.match("Opera"))
        elem.style.OTransform = "rotate(" + degrees + "deg)";
    else
        elem.style.transform = "rotate(" + degrees + "deg)";
}