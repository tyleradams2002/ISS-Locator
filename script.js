const locationContainer = document.getElementById("totalContainer");
const locationTitleAndTime = document.getElementById("locationTitle");
const locationLongitude = document.getElementById("locationLongitude");
const locationLatitude = document.getElementById("locationLatitude");
const loader = document.getElementById("loader");
// APIS
const locationAPI = "http://api.open-notify.org/iss-now.json";
const unixConverterLink = "https://helloacm.com/api/unix-timestamp-converter/?cached&s="
// Initial DATA
let issDataArray = [];
let issDataLongitude;
let issDataLatitude;
let issDataUnix;
// UNIX Breakdown Information
let issDateYear;
let issDateMonth;
let issDateDay;
let issTimeHour;
let issTimeMinute;
let issTimeSecond;
// Show Loading
function loadingAnimation() {
    loader.hidden = false;
    locationContainer.hidden = true;
}
// Hide Loading
function completedLoadingAnimation() {
    loader.hidden = true;
    locationContainer.hidden = false;
}
// ISS API Location Function
async function fetchAPIData() {
    loadingAnimation();
    const response = await fetch(locationAPI);
    issDataArray = await response.json();
    issDataLongitude = issDataArray.iss_position.longitude;
    issDataLatitude = issDataArray.iss_position.latitude;
    issDataUnix = issDataArray.timestamp
}
// Time Stamp Unix Converter
async function unixConverter() {
    const response = await fetch(unixConverterLink + issDataUnix)
    const issUnixTimeTotal = await response.json();
    // Breaking the time and date apart
    const issUnixTimeBroken = issUnixTimeTotal.split(" ");
    // Setting the time and date to separate variables
    const issTotalDate = issUnixTimeBroken[0];
    const issTotalTime = issUnixTimeBroken[1];
    // Breaking the Date into year / month / day
    const issTotalDateBroken = issTotalDate.split("-");
    issDateYear = issTotalDateBroken[0];
    issDateMonth = issTotalDateBroken[1];
    issDateDay = issTotalDateBroken[2];
    // Breaking the time into hour / minute / second
    const issTotalTimeBroken = issTotalTime.split(":");
    issTimeHour = issTotalTimeBroken[0];
    issTimeMinute = issTotalTimeBroken[1];
    issTimeSecond = issTotalTimeBroken[2];
}
// Function to adjust the time and date of information
function timeAndDate() {
    monthCalculator();
    dayCalculator();
    function monthCalculator() {
        if (issDateMonth === '01') {
            issDateMonth = 'January';
        } else if (issDateMonth === '02') {
            issDateMonth = 'February';
        } else if (issDateMonth === '03') {
            issDateMonth = 'March';
        }  else if (issDateMonth === '04') {
            issDateMonth = 'April';
        } else if (issDateMonth === '05') {
            issDateMonth = 'May';
        } else if (issDateMonth === '06') {
            issDateMonth = 'June';
        } else if (issDateMonth === '07') {
            issDateMonth = 'July';
        } else if (issDateMonth === '08') {
            issDateMonth = 'August';
        } else if (issDateMonth === '09') {
            issDateMonth = 'September';
        } else if (issDateMonth === '10') {
            issDateMonth = 'October';
        } else if (issDateMonth === '11') {
            issDateMonth = 'November';
        } else if (issDateMonth === '12') {
            issDateMonth = 'December';
        }
    }
    function dayCalculator() {
        if (issDateDay === '01' || issDateDay === '21' || issDateDay === '31') {
            issDateDay = issDateDay + 'st';
        } else if (issDateDay === '02' || issDateDay === '22') {
            issDateDay = issDateDay + 'nd';
        } else if (issDateDay === '03' || issDateDay === '23') {
            issDateDay = issDateDay + 'rd';
        } else {
            issDateDay = issDateDay + 'th';
        }
    }
    locationTitleAndTime.textContent = `On the ${issDateDay} of ${issDateMonth} ${issDateYear}, at ${issTimeHour}:${issTimeMinute} UTC. The ISS is Located At...`
}
// Compiles the API's and their functions to create all the data for the site
async function gainData() {
    await fetchAPIData();
    await unixConverter();
}
// Updates the information on the site
async function frontSideInformationAsync() {
    await gainData();
    await siteUpdates();
    function siteUpdates() {
        timeAndDate();
        locationLongitude.textContent = `The Longitude is at ${issDataLongitude}`;
        locationLatitude.textContent = `The Latitude is at ${issDataLatitude}`;
    }
}

function FrontSideInformation() {
    frontSideInformationAsync();
    completedLoadingAnimation();
}
// Run on Site Launch
FrontSideInformation();

/*
```
loading animation
Google Maps to show location
conversion for your time zone
```
 */
