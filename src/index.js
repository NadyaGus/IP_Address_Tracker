import { validateIp } from "./helpers";

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const apiKey = 'at_szVmSzB7IDvSkZ3IM29T3IlSn2Rhm';

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', () => {
    getData();
})

ipInput.addEventListener('keydown', (e) => {
    handleKey(e);
})

function getData() {
    if (validateIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(data => {
            setInfo(data)
        })
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    ipInfo.textContent = mapData.ip;
    locationInfo.textContent = `${mapData.location.country} ${mapData.location.region}`;
    timezoneInfo.textContent = mapData.location.timezone;
    ispInfo.textContent = mapData.isp;
}