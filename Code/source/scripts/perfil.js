


$(document).ready(function () {

    var userId = localStorage.getItem('userId');
    var username = localStorage.getItem('whoAmI');

    $('.card-body a').attr('href', './visualizar.html?userId='.concat(userId));

    $('#profilename').text(username);

    
    /*         Código previamente incluído no .html               */

    var menuItems = document.getElementById("menuItems");
        menuItems.style.maxHeight = "0px";
        function menuHam() {
            // console.log("ok");
            if (menuItems.style.maxHeight == "0px") {
                menuItems.style.maxHeight = "200px";
            } else {
                menuItems.style.maxHeight = "0px";
            }

        }

        // Função para abrir a janela de seleção de arquivo quando a imagem do banner é clicada
        document.getElementById('the_banner').addEventListener('click', function () {
            document.getElementById('inputImage').click();
        });

        // Função para exibir a nova imagem selecionada do banner e salvá-la no localStorage
        document.getElementById('inputImage').addEventListener('change', function () {
            const file = this.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const imgData = e.target.result;
                document.getElementById('the_banner').src = imgData;
                localStorage.setItem('bannerImage', imgData); // Salva a imagem do banner no localStorage
            }

            reader.readAsDataURL(file);
        });

        // Função para abrir a janela de seleção de arquivo quando a imagem do perfil é clicada
        document.getElementById('output').addEventListener('click', function (event) {
            document.getElementById('input-image-hidden').click();
            event.stopPropagation();
        });

        // Função para exibir a nova imagem selecionada do perfil e salvá-la no localStorage
        document.getElementById('input-image-hidden').addEventListener('change', function () {
            const file = this.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const imgData = e.target.result;
                document.getElementById('output').src = imgData;
                localStorage.setItem('profileImage', imgData); // Salva a imagem do perfil no localStorage
            }

            reader.readAsDataURL(file);
        });

        // Função para carregar a imagem do banner e do perfil do localStorage ao carregar a página
        window.onload = function () {
            const savedBannerImage = localStorage.getItem('bannerImage');
            if (savedBannerImage) {
                document.getElementById('the_banner').src = savedBannerImage;
            }

            const savedProfileImage = localStorage.getItem('profileImage');
            if (savedProfileImage) {
                document.getElementById('output').src = savedProfileImage;
            }

            const savedProfileName = localStorage.getItem('profileName');
            if (savedProfileName) {
                document.getElementById('profileName').textContent = savedProfileName;
            }

            const savedProfileBio = localStorage.getItem('profileBio');
            if (savedProfileBio) {
                document.getElementById('profileBio').textContent = savedProfileBio;
            }
        }

        // Função para permitir a edição do nome e da bio
        document.getElementById('profileName').addEventListener('click', function (event) {
            const nameElement = document.getElementById('profileName');
            const currentName = nameElement.textContent;
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = currentName;
            nameInput.id = 'nameInput';
            nameElement.replaceWith(nameInput);
            document.getElementById('saveChangesBtn').style.display = 'block';
            event.stopPropagation();
        });

        document.getElementById('profileBio').addEventListener('click', function (event) {
            const bioElement = document.getElementById('profileBio');
            const currentBio = bioElement.textContent;
            const bioInput = document.createElement('textarea');
            bioInput.value = currentBio;
            bioInput.id = 'bioInput';
            bioElement.replaceWith(bioInput);
            document.getElementById('saveChangesBtn').style.display = 'block';
            event.stopPropagation();
        });

        document.getElementById('saveChangesBtn').addEventListener('click', function () {
            const nameInput = document.getElementById('nameInput');
            const bioInput = document.getElementById('bioInput');

            if (nameInput) {
                const newName = nameInput.value;
                const nameElement = document.createElement('h3');
                nameElement.id = 'profileName';
                nameElement.textContent = newName;
                nameInput.replaceWith(nameElement);
                localStorage.setItem('profileName', newName);
            }

            if (bioInput) {
                const newBio = bioInput.value;
                const bioElement = document.createElement('h4');
                bioElement.className = 'bio';
                bioElement.id = 'profileBio';
                bioElement.textContent = newBio;
                bioInput.replaceWith(bioElement);
                localStorage.setItem('profileBio', newBio);
            }

            document.getElementById('saveChangesBtn').style.display = 'none';

            // Re-attach the event listeners to the new elements
            document.getElementById('profileName').addEventListener('click', function (event) {
                const nameElement = document.getElementById('profileName');
                const currentName = nameElement.textContent;
                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.value = currentName;
                nameInput.id = 'nameInput';
                nameElement.replaceWith(nameInput);
                document.getElementById('saveChangesBtn').style.display = 'block';
                event.stopPropagation();
            });

            document.getElementById('profileBio').addEventListener('click', function (event) {
                const bioElement = document.getElementById('profileBio');
                const currentBio = bioElement.textContent;
                const bioInput = document.createElement('textarea');
                bioInput.value = currentBio;
                bioInput.id = 'bioInput';
                bioElement.replaceWith(bioInput);
                document.getElementById('saveChangesBtn').style.display = 'block';
                event.stopPropagation();
            });
        });

 })