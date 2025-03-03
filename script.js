const gomb = document.getElementById('gomb');

const csaladNev = document.getElementById('csalad_nev');
const keresztNev = document.getElementById('kereszt_nev');

const kartyaSzam = document.getElementById('kartyaszam');
const lejaratiDatum = document.getElementById('lejarati_datum');
const cvc = document.getElementById('cvc');

document.addEventListener('DOMContentLoaded', () => {
    cookieTorlo.src = "imgs/trashcan1.svg";
    csaladNev.value = getCookie('lastName') || "";
    keresztNev.value = getCookie('firstName') || "";
    kartyaSzam.value = getCookie('cardNumber') || "";
    lejaratiDatum.value = getCookie('expDate') || "";
    cvc.value = getCookie('cvc') || "";
});

cookieTorlo.addEventListener('click', () => {
    setCookie("cardNumber", '', -1);
    setCookie("lastName", '', -1);
    setCookie("firstName", '', -1);
    setCookie("expDate", '', -1);
    setCookie("cvc", '', -1);
})

cookieTorlo.addEventListener('pointerenter', () => {
    cookieTorlo.src = "imgs/trashcan2.svg";
});

cookieTorlo.addEventListener('pointerleave', () => {
    cookieTorlo.src = "imgs/trashcan1.svg";
});

gomb.addEventListener('click', () => {
    checkDate();
    checkCVC();

    setCookie("cardNumber", kartyaSzam.value, 7);
    setCookie("lastName", csaladNev.value.trim(), 7);
    setCookie("firstName", keresztNev.value.trim(), 7);
    setCookie("expDate", lejaratiDatum.value, 7);
    setCookie("cvc", cvc.value, 7);
});

kartyaSzam.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 16); // Remove non-numeric characters
    let formattedValue = value.replace(/(\d{4})/g, "$1-").trim(); // Add dashes every 4 digits
    formattedValue = formattedValue.replace(/-$/, ""); // Remove trailing dash

    event.target.value = formattedValue;
});

cvc.addEventListener('input', (event) => {
    event.target.value = event.target.value.slice(0, 3);
});

lejaratiDatum.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 4); // Remove non-numeric characters , Limit to 4 digits

    // Format as MM/YY
    if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }

    event.target.value = value; // Update input field
});

function checkDate() {
    let split = lejaratiDatum.value.split('/');
    let honap = split[0];
    let ev = split[1];
    if(honap <= 0 ||
        honap > 12 ||
        ev < 25 ) {
        alert('A lejárati dátum nem valós');
        lejaratiDatum.value = '';
    };
}

function checkCVC() {
    if (cvc.value.length < 3) {
        alert('A CVC nem valós');
        cvc.value = '';
    }
}

function getCookie(key) {
    const cookie = document.cookie.split('; ').find((row => row.startsWith(`${key}=`)));
    return cookie ? cookie.split('=')[1] : null;
};

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}