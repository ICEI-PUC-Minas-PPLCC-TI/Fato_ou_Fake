//  definição de constantes
const TOAST_ERROR = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
});

const URLS = {
    home: '../../',
    commonUser: {
        index: '../common-user/', 
        pesquisaNoticia: '../common-user/pesquisa-noticia.html'
    },
    admUser: {
        index: '../adm-user/',
    }
};

// função para logOut
function logout(e) {
    localStorage.removeItem("usuario_logado");
    window.location = URLS.home;
}

// função para mostrar o menu
const showMenu = () => {
    const nav = $('#navBar'),
        bodyPd = $('#bodyPd'),
        headerPd = $('#header');
  
    if (nav && bodyPd && headerPd) {
        nav.toggleClass('show-menu');

        $('#headerToggle').toggleClass('bx-x');

        bodyPd.toggleClass('body-pd');

        headerPd.toggleClass('body-pd');
    } 
}

onload = () => {
    const toggle = $('#headerToggle'),
          link = $('.nav-link'),
          btnLogout = $('#btnHeaderUser'),
          userLogado = JSON.parse(localStorage.getItem("usuario_logado"));

    $('#headerUser').text(userLogado.nome);

    toggle.click(showMenu);

    btnLogout.click(function(e) {
        e.preventDefault();

        logout();
    });

    if (link) {
        link.click(function() {
            link.each(function(i) {
                $(this).removeClass('active');
            });

            $(this).addClass('active');
        });
    }
}