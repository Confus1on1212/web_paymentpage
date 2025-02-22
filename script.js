const gomb = document.getElementById('gomb');

const csaladNev = document.getElementById('csalad_nev');
const keresztNev = document.getElementById('kereszt_nev');

const kartyaSzam = document.getElementById('kartyaszam');
const lejaratiDatum = document.getElementById('lejarati_datum');
const cvc = document.getElementById('cvc');


gomb.addEventListener('click', () => {
    
});

*

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