const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const apiKey = 'at_szVmSzB7IDvSkZ3IM29T3IlSn2Rhm'

btn.addEventListener('click', () => {
    getData();
})

ipInput.addEventListener('keydown', (e) => {
    handleKey(e);
})

function getData() {
    fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipInput.value}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}