



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

let idx = 0;
var imgelement;
var divition_img;

// Definir uma função para atualizar os dados
function atualizarDados() {
    if (window.innerWidth <= 600) {
        divition_img = ((window.innerWidth/2)) ;
    }else{
        divition_img = ((window.innerWidth/3))  ;
    }

    // Coloque aqui o código para atualizar os dados conforme necessário
    for (let index = 0; index < imgelement.length; index++) {
        imgelement[index].style.width = (divition_img -10) +"px" ;
        imgelement[index].style.height = "auto";
    }
    idx = 0;
    const imgs = document.getElementById("img");
    imgs.style.transform = `translateX(${0}px)`;
}

// Adicionar um ouvinte de evento para o redimensionamento da tela
window.addEventListener('resize', function(event){
    // Chamar a função de atualização de dados quando o redimensionamento ocorrer
    atualizarDados();
});
document.addEventListener("DOMContentLoaded", function() {
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

            if (window.innerWidth <= 600) {
                divition_img = ((window.innerWidth/2)) ;
            }else{
                divition_img = ((window.innerWidth/3))  ;
            }


            var files = resp.files;
            if (files && files.length > 0) {
                console.log('Arquivos:');
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    console.log(file.name + ' (' + file.id + ')');

                        // Criar um elemento <img> para cada arquivo
                        var img = document.createElement('img');
                        img.src = 'https://drive.google.com/thumbnail?id=' + file.id + '&sz=w1000';
                        img.alt = file.name;
                        img.id = "aaaaa";
                        img.style.width = (divition_img - 10 )+"px";

                        img.style.marginLeft = "5px";
                        img.style.marginBottom = "10px"
                        img.style.marginRight = "5px";


                        // Adicionar o elemento <img> ao slideInner
                        document.querySelector('#img').appendChild(img);
                }

            } else {
                console.log('Nenhum arquivo encontrado.');
            }

            const imgs = document.getElementById("img");
            imgelement = imgs.querySelectorAll("*");

            
            
        
            function carrossel() {
                idx++;
        
                if (idx > imgelement.length - 3) {
                    idx = 0;
                }
                if (imgs) {
                    imgs.style.transform = `translateX(${-idx * (divition_img  )}px)`;
                }
            }
        
            setInterval(carrossel, 1800);
        });

    } catch (error) {
        console.error("Erro ao inicializar a API do Google Drive: ", error);
    }
   
       
    
}

init();
});
