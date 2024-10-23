let fileSystem = []; // Armazena arquivos e pastas
let currentFolder = fileSystem; // Pasta atual em que estamos
let selectedItem = null; // Item selecionado para renomear ou mover

// Cria uma nova pasta
function createFolder() {
    let folderName = prompt("Digite o nome da pasta:");

    if (folderName) {
        currentFolder.push({ name: folderName, type: 'folder', children: [] });
        renderFileSystem(); // Atualiza a tela
    }
}

// Cria um novo arquivo
function createFile() {
    let fileName = prompt("Digite o nome do arquivo:");
    if (fileName) {
        currentFolder.push({ name: fileName, type: 'file' });
        renderFileSystem(); // Atualiza a tela
    }
}

// Renderiza o sistema de arquivos
function renderFileSystem() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Limpa a lista de arquivos

    currentFolder.forEach((item, index) => {
        let li = document.createElement('li');
        li.textContent = item.name;
        li.classList.add(item.type);

        let actions = document.createElement('span');
        actions.innerHTML = `
            <button onclick="openItem(${index})">Abrir</button>
            <button onclick="prepareRename(${index})">Renomear</button>
            <button onclick="prepareMove(${index})">Mover</button>
            <button onclick="deleteItem(${index})">Excluir</button>
        `;
        li.appendChild(actions);
        fileList.appendChild(li);
    });
}

// Abre uma pasta ou um arquivo
function openItem(index) {
    let item = currentFolder[index];
    if (item.type === 'folder') {
        currentFolder = item.children; // Muda para a nova pasta
        renderFileSystem(); // Atualiza a tela
    } else {
        alert(`Abrindo arquivo: ${item.name}`); // Mostra mensagem para arquivos
    }
}

// Prepara para renomear um item
function prepareRename(index) {
    selectedItem = index;
    document.getElementById('renameModal').style.display = 'block';
}

// Renomeia um item
function renameItem() {
    let newName = document.getElementById('newName').value;
    if (newName) {
        currentFolder[selectedItem].name = newName; // Renomeia o item
        renderFileSystem(); // Atualiza a tela
        closeModal(); // Fecha a modal
    }
}

// Fecha a modal de renomear
function closeModal() {
    document.getElementById('renameModal').style.display = 'none';
}

// Prepara para mover um item
function prepareMove(index) {
    selectedItem = index;
    document.getElementById('moveModal').style.display = 'block';
}

// Move um item para uma nova pasta
function moveItem() {
    let folderName = document.getElementById('moveTo').value;
    let destinationFolder = findFolder(fileSystem, folderName);

    if (destinationFolder && destinationFolder.type === 'folder') {
        let itemToMove = currentFolder.splice(selectedItem, 1)[0]; // Remove o item da pasta atual
        destinationFolder.children.push(itemToMove); // Adiciona na nova pasta
        renderFileSystem(); // Atualiza a tela
        closeMoveModal(); // Fecha a modal
    } else {
        alert("Pasta não encontrada");
    }
}

// Fecha a modal de mover
function closeMoveModal() {
    document.getElementById('moveModal').style.display = 'none';
}

// Exclui um item
function deleteItem(index) {
    currentFolder.splice(index, 1); // Remove o item
    renderFileSystem(); // Atualiza a tela
}

// Encontra uma pasta pelo nome
function findFolder(folder, name) {
    for (let item of folder) {
        if (item.name === name && item.type === 'folder') {
            return item; // Retorna a pasta encontrada
        }
        if (item.type === 'folder') {
            let found = findFolder(item.children, name);
            if (found) return found; // Retorna a pasta encontrada em subpastas
        }
    }
    return null; // Se não encontrar
}

// Inicializa o sistema renderizando a tela
renderFileSystem();
