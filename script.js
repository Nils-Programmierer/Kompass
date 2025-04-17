function getCompassHeading(alpha, beta, gamma) {
    let degtorad = Math.PI / 180;

    let _x = beta  * degtorad;
    let _y = gamma * degtorad;
    let _z = alpha * degtorad;

    let cX = Math.cos(_x);
    let cY = Math.cos(_y);
    let cZ = Math.cos(_z);
    let sX = Math.sin(_x);
    let sY = Math.sin(_y);
    let sZ = Math.sin(_z);

    let Vx = -cZ * sY - sZ * sX * cY;
    let Vy = -sZ * sY + cZ * sX * cY;

    let heading = Math.atan(Vx / Vy);

    if (Vy < 0) {
        heading += Math.PI;
    } else if (Vx < 0) {
        heading += 2 * Math.PI;
    }

    heading = heading * (180 / Math.PI);
    return Math.round(heading);
}

function readOrientation(event) {
    let heading;

    if (event.absolute === true && event.alpha != null) {
        heading = Math.round(event.alpha);
    } else {
        heading = getCompassHeading(event.alpha, event.beta, event.gamma);
    }

    document.querySelector(".needle").style.transform = "rotate(" + (-heading) + "deg)";
    document.getElementById("result").textContent = heading + "°";
}

function initCompass() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(response => {
            if (response === 'granted') {
                window.addEventListener('deviceorientation', readOrientation, false);
            } else {
                alert('Permission denied');
            }
        }).catch(console.error);
    } else {
        if ('ondeviceorientationabsolute' in window) {
            window.addEventListener('deviceorientationabsolute', readOrientation, false);
        } else {
            window.addEventListener('deviceorientation', readOrientation, false);
        }
    }
}

window.onload = initCompass;
