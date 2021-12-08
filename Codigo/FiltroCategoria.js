//Esse vetor será integrado com o resto do site, ou seja as notícias não serão as mesmas. Esse é só um exemplo antes de juntarmos as partes
var idsaude = 0;
var idpolitica = 1;
var db = {
    categorias: [
        {
            "idCategoria": "0", //Saúde
            "nomeCategoria": "Saúde",
            "noticias": [
                {
                    "titulo": "Comunidade Yanomami enfrenta superlotação em centro de saúde indígena",
                    "link":"https://g1.globo.com/jornal-nacional/noticia/2021/11/18/comunidade-yanomami-enfrenta-superlotacao-em-centro-de-saude-indigena.ghtml",
                    "descricao": "Noticias sobre bem estar e saúde."
                },
                {
                    "titulo": "Covid-19: Dados apontam eficácia a longo prazo da vacina da Pfizer em adolescentes",
                    "link":"https://g1.globo.com/saude/coronavirus/vacinas/noticia/2021/11/22/covid-19-dados-apontam-eficacia-a-longo-prazo-da-vacina-da-pfizer-em-adolescentes.ghtml",
                    "descricao": "Noticias sobre bem estar e saúde."
                },
                {
                    "titulo": "OMS anuncia acordo para produção de testes de Covid em países mais pobres",
                    "link":"https://g1.globo.com/saude/coronavirus/noticia/2021/11/23/oms-anuncia-acordo-para-producao-de-testes-de-covid-em-paises-mais-pobres.ghtml",
                    "descricao": "Noticias sobre bem estar e saúde."
                },
            ]
        },
        {
            "idCategoria": "1",//Política
            "nomeCategoria": "Política",
            "noticias": [
                {
                    "titulo": "Conselho de Ética da Câmara arquiva processo sobre Ricardo Barros no caso Covaxin",
                    "link":"https://g1.globo.com/politica/noticia/2021/11/23/conselho-de-etica-da-camara-arquiva-processo-sobre-ricardo-barros.ghtml",
                    "descricao": "Noticias verdadeiras de todas as categorias."
                },
                {
                    "titulo": "PSDB decide contratar novo aplicativo em busca de 'plano B' para dar continuidade às prévias",
                    "link":"https://g1.globo.com/politica/noticia/2021/11/23/psdb-decide-contratar-novo-aplicativo-em-busca-de-plano-b-para-as-previas.ghtml",
                    "descricao": "Noticias verdadeiras de todas as categorias."
                },
                {
                    "titulo": "STJ encerra investigação sobre Eduardo Paes por suposta fraude na Olimpíada de 2016",
                    "link":"https://g1.globo.com/politica/noticia/2021/11/23/stj-encerra-investigacao-sobre-eduardo-paes-por-suposta-fraude-na-olimpiada-de-2016.ghtml",
                    "descricao": "Noticias verdadeiras de todas as categorias."
                },
            ]
        },
        {
            "idCategoria": "2",
            "nomeCategoria": "Conspirações",
            "noticias": [
                {
                    "titulo": "",
                    "link":"",
                    "descricao": ""
                },
                {
                    "titulo": "",
                    "link":"",
                    "descricao": ""
                },
                {
                    "titulo": "",
                    "link":"",
                    "descricao": ""
                },
            ]
        },
        {
            "idCategoria": "3",
            "nomeCategoria": "Verdadeiro",
            "noticias": [
                {
                    "titulo": "",
                    "link":"",
                    "descricao": "Noticias verdadeiras de todas as categorias."
                },
                {
                    "titulo": "",
                    "link":"",
                    "descricao": ""
                },
                {
                    "titulo": "",
                    "link":"",
                    "descricao": ""
                },
            ]
        },
        {
            "idCategoria": "4",
            "nomeCategoria": "Falso",
            "noticias": [
                {
                    "titulo": "",
                    "link":"",
                    "descricao": "Noticias falsas"
                },
                {
                    "titulo": "",
                    "link":"",
                    "descricao": "Noticias falsas"
                },
                {
                    "titulo": "",
                    "link":"",
                    "descricao": "Noticias falsas"
                },
            ]
        },
    ]
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });

    return vars;
}


function exibe (){
    
    let id = getUrlVars()["id"] 

    let containerNoticias = document.getElementById('noticias');
    let noticias = db.categorias[id].noticias
    let texto = '';
    //Montando a tela
    for (i=0; i < noticias.length; i++) {
            let noticia  = noticias[i].link
            texto +=
            `
                <li class="noticia-container col-12 col-sm-12 col-md-12 col-lg-4 noticias">
                <iframe class="noticia1" allowtransparency="true" width="485" height="402"  src="${noticia}"  frameborder="0" allowfullscreen></iframe>
                <a href="${noticia}" target="blank"><p>${noticias[i].titulo}</p></a>
            </li>
          `
    }
    containerNoticias.innerHTML = texto

    let tituloPag = document.getElementById('categoria');
    tituloPag.innerHTML = `${db.categorias[id].nomeCategoria}`
    
}
