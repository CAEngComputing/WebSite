

// Fecha o menu de navegação automaticamente quando a página é carregada ou atualizada
window.addEventListener('load', function() {
    var nav = document.getElementById("navMenu");
    if (window.innerWidth <= 600){
        nav.style.display = 'none';
    }

});

function toggleNavOverlay() {
    var nav = document.getElementById("navMenu");
    if (window.innerWidth <= 600) {
        if (nav.style.display === 'block') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'block';
        }
    }
}

// Exibe o menu de navegação automaticamente em telas maiores
window.addEventListener('resize', function() {
    var nav = document.getElementById("navMenu");
    if (window.innerWidth > 600) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
});



//ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
function init() {
    gapi.load('client', start);
}

async function start() {
    // 1. Carregar a biblioteca cliente do Google Sheets
    await gapi.client.init({
        'apiKey': 'AIzaSyAlo7cHn7onfmt1toqphJKiiuJbYmEJgEA',
        // Your API key will be automatically added to the Discovery Document URLs.
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    });

    // 2. Carregar os valores da planilha
    let response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1hf8UC5AwSu3jy7RuLA4Pm3pOj5_vvCBKt3n04rdh5kk',
        range: 'Página1!A1:B6',
    });

    // 3. Mostrar os valores da planilha
    let range = response.result;
    if (range.values.length > 0) {
        document.getElementById('PretoP').innerText = `${range.values[1][0]}`;
        document.getElementById('BrancoP').innerText = `${range.values[1][1]}`;
        document.getElementById('PretoM').innerText = `${range.values[2][0]}`;
        document.getElementById('BrancoM').innerText = `${range.values[2][1]}`;        
        document.getElementById('PretoG').innerText = `${range.values[3][0]}`;
        document.getElementById('BrancoG').innerText = `${range.values[3][1]}`;
        document.getElementById('PretoGG').innerText = `${range.values[4][0]}`;
        document.getElementById('BrancoGG').innerText = `${range.values[4][1]}`;
        document.getElementById('PretoEG').innerText = `${range.values[5][0]}`;
        document.getElementById('BrancoEG').innerText = `${range.values[5][1]}`;
    } else {
        console.log('No data found.');
    }


}

init();