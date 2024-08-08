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

function init() {
    // Configura o SDK do Mercado Pago
    const mp = new MercadoPago('APP_USR-1774256113553845-080816-fb4dc18c2e3a3155031158ecb0f455fd-205112629', {
        locale: 'pt-BR'
    });

    createPreference(mp);
}

async function createPreference(mp) {
    const preference = {
        items: [
            {
                id: "item-ID-1234",
                title: "Meu produto",
                currency_id: "BRL",
                picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                description: "Descrição do Item",
                category_id: "art",
                quantity: 1,
                unit_price: 75.76
            }
        ],
        payer: {
            name: "João",
            surname: "Silva",
            email: "user@email.com",
            phone: {
                area_code: "11",
                number: "4444-4444"
            },
            identification: {
                type: "CPF",
                number: "19119119100"
            },
            address: {
                street_name: "Street",
                street_number: 123,
                zip_code: "06233200"
            }
        },
        back_urls: {
            success: "https://www.success.com",
            failure: "http://www.failure.com",
            pending: "http://www.pending.com"
        },
        auto_return: "approved",
        notification_url: "https://www.your-site.com/ipn",
        statement_descriptor: "MEUNEGOCIO",
        external_reference: "Reference_1234",
        expires: true,
        expiration_date_from: "2016-02-01T12:00:00.000-04:00",
        expiration_date_to: "2016-02-28T12:00:00.000-04:00"
    };

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer PROD_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preference)
        });
        const data = await response.json();
        console.log(data);

        // Utilize o ID da preferência para iniciar o checkout
        initCheckout(mp, data.id);
    } catch (error) {
        console.error('Error creating preference:', error);
    }
}

function initCheckout(mp, preferenceId) {
    mp.checkout({
        preference: {
            id: preferenceId
        },
        render: {
            container: '.cho-container', // Classe do container onde o botão de checkout será renderizado
            label: 'Pagar' // Texto do botão
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Chama a função para criar a preferência e iniciar o checkout quando a página carregar
    init();
});

// Função existente para inicializar a API do Google
function initGoogleAPI() {
    gapi.load('client', start);
}

async function start() {
    await gapi.client.init({
        'apiKey': 'AIzaSyAlo7cHn7onfmt1toqphJKiiuJbYmEJgEA',
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    });

    let response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1hf8UC5AwSu3jy7RuLA4Pm3pOj5_vvCBKt3n04rdh5kk',
        range: 'Página1!A1:B6',
    });

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

initGoogleAPI();
