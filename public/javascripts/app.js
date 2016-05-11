'use strict';

let main = document.querySelector(".main");

main.addEventListener("click", function(e) {
  if(e.target.id == "get-user-location") {
    getGeoCoords().then(cords => {
      return fetch('/users/location', { 
        method: 'put', 
        credentials: 'include',
        headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: `latitude=${cords.latitude}&longitude=${cords.longitude}`
      })
    }).then(res => res.json())
      .then(() => {
        let p = document.createElement("p");
        p.innerHTML = "Searching for people nearby";
        e.target.parentNode.appendChild(p);
      })
      .catch((e) => {
        alert(e);
      });
  }
});

function getGeoCoords() {
  if(!navigator.geolocation) {
    throw new Error("UNSUPPORTED");
  } else {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function(position) {
        resolve({latitude: position.coords.latitude, longitude: position.coords.longitude });
      }, function() {
        reject(new Error("UNSUPPORTED"));
      });
    });
  }
}
