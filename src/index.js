import { addTileLayer, validateIp } from "./helpers";
import L from 'leaflet';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const apiKey = 'at_szVmSzB7IDvSkZ3IM29T3IlSn2Rhm';

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

const mapArea = document.querySelector('.map');
const map = L.map(mapArea).setView([51.505, -0.09], 13);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
})

addTileLayer(map);
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

btn.addEventListener('click', () => {
    getData();
})

ipInput.addEventListener('keydown', (e) => {
    handleKey(e);
})

function getData() {
    if (validateIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipInput.value}`)
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
    const { lat, lng, country, region, timezone, isp, ip } = mapData.location;

    ipInfo.textContent = ip;
    locationInfo.textContent = `${country} ${region}`;
    timezoneInfo.textContent = timezone;
    ispInfo.textContent = isp;

    map.setView([lat, lng], 13);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}