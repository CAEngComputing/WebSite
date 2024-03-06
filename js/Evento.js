
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



//carrosel 



// acesso do google drive
function init() {
    gapi.load('client', start);
}

async function start() {
    try {
        // 1. Carregar a biblioteca cliente do Google Drive
        await gapi.client.init({
            'apiKey': 'AIzaSyAlo7cHn7onfmt1toqphJKiiuJbYmEJgEA',
            // Your API key will be automatically added to the Discovery Document URLs.
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        });
        console.log("API do Google Drive inicializada com sucesso!");

        // 2. Definir o ID da pasta
        var folderId = '13WLHPHRWUbVEVm86l3QpseBZ7A-Gi5jB';

        // 3. Listar todos os arquivos .jpg na pasta
        var request = gapi.client.drive.files.list({
            'q': "'" + folderId + "' in parents and mimeType='image/jpeg'",
            'fields': "nextPageToken, files(id, name)"
        });

        request.execute(function(resp) {
            var files = resp.files;
            if (files && files.length > 0) {
                console.log('Arquivos:');
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    console.log(file.name + ' (' + file.id + ')');

                    // 4. Adicionar cada arquivo ao carrossel
                    var swiperContainer = document.querySelector('.mySwiper');
                    var slide = document.createElement('swiper-slide');
                    var img = document.createElement('img');
                    img.src = 'https://drive.google.com/thumbnail?id=' + file.id + '&sz=w1000';
                    slide.appendChild(img);
                    swiperContainer.appendChild(slide);
                }
            } else {
                console.log('Nenhum arquivo encontrado.');
            }
        });

    } catch (error) {
        console.error("Erro ao inicializar a API do Google Drive: ", error);
    }
}

init();

