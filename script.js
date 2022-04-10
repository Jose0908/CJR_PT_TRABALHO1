/*  Usuarios pre cadastrados na tabela  */
let users = [
    {id:1,first_name:"Lauren",last_name:"Shaxby",email:"lshaxby0@php.net",created_at:"16/10/2021"},
    {id:2,first_name:"Ardenia",last_name:"Paddingdon",email:"apaddingdon1@nsw.gov.au", created_at:"27/07/2021"},
    {id:3,first_name:"Renaldo",last_name:"Alenichev",email:"ralenichev2@ftc.gov" ,created_at:"10/06/2021"},
    {id:4,first_name:"Nichole",last_name:"OHeneghan",email:"noheneghan3@flavors. me",created_at:"28/06/2021"},
    {id:5,first_name:"Haywood",last_name:"Daintry",email:"hdaintry4@nhs.uk",created_at:"18/03/2021"},
    {id:6,first_name:"Leslie",last_name:"Daile",email:"ldaile5@vimeo.com",created_at:"23/05/2021"},
    {id:7,first_name:"Byrann",last_name:"Slorance",email:"bslorance6@kickstarter.com",created_at:"15/05/2021"},
    {id:8,first_name:"My",last_name:"Swendell",email:"mswendell7@moonfruit.com", created_at:"15/12/2021"},
    {id:9,first_name:"Brier",last_name:"Esson",email:"besson8@usa.gov",created_at:"14/03/2021"},
    {id:10,first_name:"Seth",last_name:"Piddle",email:"spiddle9@nationalgeographic.com",created_at:"20/10/2021"},
    {id:11,first_name:"Fer",last_name:"Piddle",email:"ferspiddle9@nationalgeographic.com",created_at:"20/10/2022"},
]
/*  Variaveis 'globais'  */
let currentPage = 1;        // Pagina atual
const USERS_PER_PAGE = 5;   // Usuarios por pagina

/* Retorna o total de paginas */
function getTotalPages(){
    return Math.ceil(users.length / USERS_PER_PAGE);
}
/*  Deleta usuario  */
function deleteUser(userId){
    users = users.filter((user) => {
        return user.id !== userId;
    })
    render();
}
/*  Quais usuarios devo mostrar em cada pagina */
function getCurrentPageUsers() {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return users.slice(startIndex, endIndex);
}
/*  Cria botoes */
function createButtonElement(textContent) {
    const buttonElement = document.createElement('button')
    buttonElement.type = 'button'
    buttonElement.textContent = textContent
    return buttonElement
}
/* Insere linha na tabela */
function insertTableRow(user){
    const userRow = document.createElement('tr');

    const name = createUserNome(user);
    const email = createUserEmail(user);
    const createdat = createUserCreatedAt(user);
    const buttons = createUserActions(user);

    userRow.appendChild(name);
    userRow.appendChild(email);
    userRow.appendChild(createdat);
    userRow.appendChild(buttons);

    return userRow;
}
/* Cria elemento nome de usuario */
function createUserNome(user) {
    const userName = document.createElement('td');
    userName.textContent = user.first_name + ' ' + user.last_name;
    return userName;
}
/* Cria elemento email*/
function createUserEmail(user) {
    const userEmail = document.createElement('td')
    userEmail.textContent = user.email;
    userEmail.classList.add('userEmail');
    return userEmail;
}
/* Cria data de cadastro*/
function createUserCreatedAt(user) {
    const userCreatedAt = document.createElement('td');
    userCreatedAt.textContent = user.created_at;
    return userCreatedAt;
}
/* Cria botoes usados pelo usuario */
function createUserActions(user) {
    const userActionButtons = document.createElement('td');
    userActionButtons.classList.add('actions_buttons');

    const editar = createButtonElement('editar');
    editar.classList.add('edit_button');

    const excluir = createButtonElement('excluir')
    excluir.classList.add('delete_button');
    excluir.addEventListener('click', () => deleteUser(user.id));

    userActionButtons.appendChild(editar);
    userActionButtons.appendChild(excluir);
    return userActionButtons;
}
/* Insere todas as linhas da tabela */
function insertTableRows(userData) {
    return userData.map(insertTableRow);
}
/* Renderiza usuarios dentro de tbody*/
function renderUsers() {
    const userData = getCurrentPageUsers();
    const userTable = insertTableRows(userData);

    const userContainer = document.querySelector('.tbody');

    userContainer.replaceChildren();

    userTable.forEach(usersRow => {
        userContainer.appendChild(usersRow);
    });
}
/* Renderiza mudanca de pagina */
function changePage(newPage){
    const totalPages = getTotalPages();
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        render();
    }
}
/* Cria botao de voltar (<<) */
function createPrevPageButton() {
    const prevPageButton = document.createElement ('button');
    prevPageButton.classList.add('prevPageButton');
    prevPageButton.type = 'button';
    prevPageButton.textContent = '<<';
    prevPageButton.addEventListener('click', () => {
        changePage(currentPage -1);
    });
    return prevPageButton;
}
/* Cria botao de avancar (>>) */
function createNextPageButton() {
    const nextPageButton = document.createElement ('button');
    nextPageButton.classList.add('nextPageButton');
    nextPageButton.type = 'button';
    nextPageButton.textContent = '>>';
    nextPageButton.addEventListener('click', () => {
        changePage(currentPage + 1);
    });
    return nextPageButton;
}
/* Cria botoes de paginacao (1,2,3,..) */
function createPaginationButton (page) {
    const paginationButton = createButtonElement(page);
    if (page == currentPage) paginationButton.classList.add ('active');
    paginationButton.addEventListener('click', ()=> changePage(page))
    return paginationButton;
}
/* Renderiza a paginacao */
function renderPagination(totalPages) {
    const pagination = document.querySelector('.pagination')
    pagination.replaceChildren();

    if(totalPages){
        const prevPageButton = createPrevPageButton();
        pagination.appendChild(prevPageButton);
        for (let page = 1; page < totalPages + 1; page ++){
            const paginationButton = createPaginationButton(page);
            pagination.appendChild(paginationButton); 
        }
        const nextPageButton = createNextPageButton();
        pagination.appendChild(nextPageButton);
    }
}
/* Renderiza todo meu conteudo da tabela e da paginacao */
const render =() =>{
    const totalPages = getTotalPages();
    if (currentPage > totalPages) currentPage = totalPages;

    renderUsers();
    renderPagination(totalPages);
}

render();
