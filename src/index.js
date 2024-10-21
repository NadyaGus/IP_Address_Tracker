import 'babel-polyfill';
import { addTileLayer, getAddress, validateIp } from "./helpers";
import L from 'leaflet';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

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
        getAddress(ipInput.value)
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
    const { lat, lng, country, region, timezone } = mapData.location;

    ipInfo.textContent = mapData.ip;
    locationInfo.textContent = `${country} ${region}`;
    timezoneInfo.textContent = timezone;
    ispInfo.textContent = mapData.isp;

    map.setView([lat, lng], 13);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}