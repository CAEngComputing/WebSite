    var cellA1Value;  // Variável para armazenar o valor da célula A1
    
        // Adicionar um ouvinte de eventos para o botão de início dentro da barra de navegação
        document.addEventListener("DOMContentLoaded", function() {
            var btnInicio = document.getElementById("btnInicio");
            btnInicio.addEventListener("click", function(event) {
                event.preventDefault(); // Evita o comportamento padrão do link
                extractCellValueFromCSV();
                console.log(cellA1Value);

            });
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
        }else{
            nav.style.display = 'none';
        }
    });

// URL do arquivo CSV
var csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT5COFcqaZWhDQ5ILBB7j2isfEQnZGbfh5eayiY_bfQUn0aN7n9RdHNGWjXUsmUPfCFHoLVW12QHLdD/pub?output=csv";

// Função para extrair o valor da célula A1
function extractCellValueFromCSV() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            // Dividir o texto do CSV em linhas e células
            var rows = data.split('\n');
            var cells = rows[0].split(',');
            
            // Obter o valor da célula A1
            var cellA1Value = cells[0]; // A1 é a primeira célula na primeira linha
            
            // Exibir o valor da célula A1
            console.log("Valor da célula A1:", cellA1Value);
        })
        .catch(error => console.error('Erro ao extrair o valor da célula A1:', error));
}




    