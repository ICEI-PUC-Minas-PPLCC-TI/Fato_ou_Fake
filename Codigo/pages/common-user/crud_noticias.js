var dbn = getNoticiasInLocalStorage();
var db = getCategoriasInLocalStorage();

function exibeInformacoes() {
    $("#tbl-noticias").html("");
    for (i = 0; i < dbn.length; i++) {
        let noticia = dbn[i];
        $("#tbl-noticias").append(`<tr>
                                <td>${noticia.id}</td>
                                <td>${noticia.usuario}</td>
                                <td>${noticia.titulo}</td>
                                <td>${noticia.descricao}</td>
                                <td>${noticia.categoria}</td>
                                <td>${noticia.fonte}</td>
                                <td>${noticia.data}</td>
                            </tr>`);
    }
}

function getNoticiasInLocalStorage() {
    let noticias = JSON.parse(localStorage.getItem("db_noticias"));
    return noticias;
}

function getCategoriasInLocalStorage() {
    let categorias = JSON.parse(localStorage.getItem("db_categorias"));
    return categorias;
}

function FormatarData(data) {
    var dia = data.split("-")[2];
    var mes = data.split("-")[1];
    var ano = data.split("-")[0];
    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
}


function init() {
    $("#pesquisa").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#grid-noticias tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    exibeInformacoes();
}