//  definição de constantes
const TOAST_ERROR = Swal.mixin({
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
function createUsuario(attrs) {
    return {
        id: generateUIID(),
        nome: attrs.nome, 
        email: attrs.email, 
        senha: attrs.senha, 
        dataNascimento: attrs.dataNascimento, 
        tipo: attrs.tipo
    }
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
    let loggedUser = JSON.parse(sessionStorage.getItem("usuario_logado")) || undefined;

    return loggedUser;
}

// setando dados no sessionStorage
function setDataInSessionStorage(loggedUser) {
    sessionStorage.setItem("usuario_logado", JSON.stringify(loggedUser));
}

// setando o adm do sistema
function setAdmUser() {
    let users = getDataInLocalStorage(),
        adm = createUsuario({ 
            nome: "adm",
            email: "adm@adm", 
            senha: "123adm", 
            dataNascimento: null,
            tipo: "adm" 
        });

    // setando adm no local storage 
    let checkAdm = users.find(item => item.tipo == "adm");

    if (!checkAdm) {
        setDataInLocalStorage(adm);
    }
}

// função de login do sistema
function login(email, pass) {
    if (!email || !pass) {
        TOAST_ERROR.fire({
            icon: 'error',
            title: 'Houve um erro ao efetuar o login! Por favor, tente novamente!'
        })
    } else {
        let users = getDataInLocalStorage(),
            checkUser = users.find(item => item.email == email && item.senha == pass);

        if (checkUser) {
            // setando usuário logado;
            setDataInSessionStorage(checkUser);
            
            window.location = URLS.index;
        } else {
            TOAST_ERROR.fire({
                icon: 'error',
                title: 'Usuário ou senha incorretos'
            });
        }
    }
}

// função para conferir data de nascimento 
function isUderAge(date) {
    let birthDate = new Date(date),
        today = new Date(),
        year = today.getFullYear() - birthDate.getFullYear(),
        month = today.getMonth() - birthDate.getMonth();
    
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        year--;
    } 
    
    return (year < 18) ? true : false;
}

// função para cadastrar novo usuário no sistema 
function singUp(name, email, dataNascimento, pass, confirmPass) {
    if (!name || !email || !dataNascimento || !pass || !confirmPass) {
        TOAST_ERROR.fire({
            icon: 'error',
            title: 'Houve um erro ao cadastrar novo usuário! Por favor, tente novamente!'
        })
    } else {
        if (isUderAge(dataNascimento)) {
            TOAST_ERROR.fire({
                icon: 'error',
                title: 'Usuário é menor de idade'
            })
        } else if (pass != confirmPass) {
            TOAST_ERROR.fire({
                icon: 'error',
                title: 'Senhas não coincidem'
            })
        } else {
            let users = getDataInLocalStorage(),
                newUser = createUsuario({
                    nome: name,
                    email, 
                    senha: pass, 
                    dataNascimento: dataNascimento,
                    tipo: "user" 
                }),
                toastSuccess = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didDestroy: (toast) => {
                        // fazer login se caso tudo estiver correto
                        login(newUser.email, newUser.senha);
                    }
                });
            
            let checkUser = users.find(item => item.email == newUser.email);

            if (checkUser) {
                TOAST_ERROR.fire({
                    icon: 'error',
                    title: 'Esse e-mail já está cadastrado!'
                })
            } else {
                setDataInLocalStorage(newUser);
                
                toastSuccess.fire({
                    icon: 'success',
                    title: 'Usuário cadastrado com sucesso'
                })
            }
        }
    }
}

// função para deslogar do sistema 
function logout(e) {
    sessionStorage.removeItem("usuario_logado");
    window.location = URLS.login;
}

// função para listar o usuário logado 
function listUsers(table, loggedUser) {
    let users = getDataInLocalStorage(),
        rows = "";

    if (loggedUser.tipo == 'adm') {
        for (user of users) {
            rows += 
            `<tr>
                <td scope="row">${user.nome}</td>
                <td>${user.dataNascimento}</td>
                <td>${user.email}</td>
                <td>${user.senha}</td>
            </tr>`;
        }
    } else {
        rows = 
        `<tr>
            <td scope="row">${loggedUser.nome}</td>
            <td>${loggedUser.dataNascimento}</td>
            <td>${loggedUser.email}</td>
            <td>${loggedUser.senha}</td>
        </tr>`;
    }

    table.innerHTML = rows;
}
