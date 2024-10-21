const apiKey = 'at_szVmSzB7IDvSkZ3IM29T3IlSn2Rhm';

export async function getAddress(ip = '8.8.8.8') {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`)

    return response.json();
}