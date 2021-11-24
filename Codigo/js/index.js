// verificar se existe usuário logado antes de carregar a página
if (!localStorage.getItem("usuario_logado")) window.location.href = './pages/home.html';

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