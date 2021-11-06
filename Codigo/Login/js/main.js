//  definição de constantes
const TOAST = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
});

const URLS = {
    index: "index.html",
    login: "login.html",
    register: "cadastro.html"
};

// função para gerar o id único do usuário 
function generateUIID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// função para criar usuários
function Usuario(attrs) {
    this.id = generateUIID();
    this.nome = attrs.nome;
    this.email = attrs.email;
    this.senha = attrs.senha;
    this.telefone = attrs.telefone;
    this.dataNascimento = attrs.dataNascimento;
    this.tipo = attrs.tipo;
}

// obtendo usuários do localStorage
function getDataInLocalStorage() {
    let users = JSON.parse(localStorage.getItem("db_usuarios")) || [];

    return users;
}

// setando dados no localStorage 
function setDataInLocalStorage(user) {
    let users = getDataInLocalStorage(); 

    users.push(user);

    localStorage.setItem("db_usuarios", JSON.stringify(users));
}

// obtendo dados no sessionStorage 
function getDataInSessionStorage() {
    let loggedUser = JSON.parse(sessionStorage.getItem("db_usuarios")) || [];

    return loggedUser;
}

// setando dados no sessionStorage
function setDataInSessionStorage(loggedUser) {
    localStorage.setItem("db_usuarios", JSON.stringify(loggedUser));
}

// setando o adm do sistema
function setAdmUser() {
    let users = getDataInLocalStorage(),
        adm = new Usuario({ 
            nome: "adm",
            email: "adm@adm", 
            senha: "123adm", 
            telefone: null,
            dataNascimento: null,
            tipo: "adm" 
        });

    // setando adm no local storage 
    if (users.length > 0) {
        let checkAdm = users.find(item => item.tipo == "adm");

        if (!checkAdm) {
            setDataInLocalStorage(adm);
        }
    } else {
        setDataInLocalStorage(adm);
    }
}

// função de login do sistema
function login(user, pass) {
    if (!user || !pass) {
        TOAST.fire({
            icon: 'error',
            title: 'Houve um erro ao efetuar o login! Por favor, tente novamente!'
        })
    } else {
        let users = getDataInLocalStorage();

        if (users.length > 0) {
            let checkUser = users.find(item => item.nome == user && item.senha == pass);

            if (checkUser) {
                // setando usuário logado;
                setDataInSessionStorage(checkUser);
                
                window.location = URLS.index;
            } else {
                TOAST.fire({
                    icon: 'error',
                    title: 'Usuário ou senha incorretos'
                });
            }
        } else {
            TOAST.fire({
                icon: 'error',
                title: 'Não existem usuários cadastrados'
            });
        }
    }
}
