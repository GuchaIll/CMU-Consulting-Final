// Navigation bar disappear on scroll
var prevScrollpos = window.scrollY;

window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
}

// Geolocation to determine if user is in Qatar
var inQatar = false;

function checkLocation() {
  if ("geolocation" in navigator) {
    function pos(position) {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      if (isInQatar(latitude, longitude)) {
        inQatar = true;
      } else {
        // in case they are out of bounds 
        // check ISO code from IP address for if they are in Qatar
        checkLocationIp();
      }
    }
    
    function err(error) {
      console.error("Error getting user location:", error.message);
      checkLocationIp();
    }
    
    navigator.geolocation.getCurrentPosition(pos, err);
  } else {
    checkLocationIp();
  }
}

function isInQatar(latitude, longitude) {
  // check if coordinates are within lat/long Qatar bounds
  // boundaries are not necessarily exact
  return (
    latitude >= 24.5 &&
    latitude <= 26.25 &&
    longitude >= 50.75 &&
    longitude <= 51.75
  );
}

function checkLocationIp() {
  fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => {
      // check if user ISO code from IP is in Qata
      if (data.country === 'QA') {
        inQatar = true;
      } else {
        inQatar = false;
      }
    })
    .catch(error => {
      console.error("Error getting user location: ", error.message);
    });
}

// On-load to update navigation links to relate to html in the Qatar folder 

var qatarPrefix = "/qatar/"

function updateForQatar() {
  if (inQatar) {
    document.querySelectorAll('#location-specific')
      .forEach(linkElement => {
        // Updates all links leading to location-specific content with Qatar prefix
        var link = linkElement.getAttribute('href')
        linkElement.setAttribute('href', qatarPrefix + link);
      });
    document.querySelectorAll('#not-qatar')
      .forEach(shownElement => {
        // Updates all elements that should be hidden if in Qatar
        shownElement.hidden = true;
      });
  }
}

// Window on-load functions to be called:

window.onload = checkLocation();
window.onload = updateForQatar();