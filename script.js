function readOrientation(event) {
    var angleAlpha = Math.round(event.alpha * 100) / 100; 
    alert(angleAlpha);

    var needle = document.querySelector(".needle");
    needle.style.transform = "rotate(" + (-angleAlpha) + "deg)";

    var result = document.getElementById("result");
    result.textContent = angleAlpha + "°";
}

window.onload = function() {
  window.addEventListener("deviceorientation", readOrientation, false);
}
