let slides = document.querySelectorAll('.slideshow');
let dots = document.querySelectorAll('.dot');
let slideIndex = 1;
let timeoutID;

const showSlides = (n) => {
    let i;

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < slides.length; i++) {
        dots[i].setAttribute('class', 'dot');
    }


    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].setAttribute('class', 'dot ativo');
    clearTimeout(timeoutID);
    timeoutID = setTimeout(autoSlides, 4000);
};

const plusSlides = (n) => {
    showSlides(slideIndex += n);
};

const currentSlide = (n) => {
    showSlides(slideIndex = n);
};

function autoSlides() {
    let i;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    for (i = 0; i < slides.length; i++) {
        dots[i].setAttribute('class', 'dot');
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].setAttribute('class', 'dot ativo');
    timeoutID = setTimeout(autoSlides, 4000);
}

autoSlides();

var loadFile = function(event, id_image) 
{
    var output = document.getElementById(id_image);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() 
    {
        URL.revokeObjectURL(output.src)
    }
};

var handleBrowseClick = function (hidden_input_image)
{
    // alert("teste");
    var fileinputElement = document.getElementById(hidden_input_image);
    fileinputElement.click();
}

// Verifica se há uma imagem armazenada em localStorage
const storedImagePath = localStorage.getItem('uploadedImagePath');

// Se houver uma imagem armazenada, exibe-a na página
if (storedImagePath) {
    const img = document.createElement('img');
    img.src = storedImagePath;
    document.body.appendChild(img);
}

// Função para lidar com o upload da imagem
function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        document.body.appendChild(img);

        // Armazena o caminho da imagem em localStorage
        localStorage.setItem('uploadedImagePath', event.target.result);
    };

    reader.readAsDataURL(file);
}

// Adiciona um ouvinte de evento para o input de upload de imagem
const uploadInput = document.getElementById('upload-input');
uploadInput.addEventListener('change', handleImageUpload);