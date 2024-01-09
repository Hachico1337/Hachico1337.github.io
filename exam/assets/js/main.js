let currentPage = 1;
const itemsPerPage = 5;

function loadRoutes(page) {
    const API_KEY = '37a978a6-aa8e-4e4b-b8a8-a104ca96e237';
    const tableBody = document.querySelector('#routesTable tbody');
    tableBody.innerHTML = ''; 
 
    fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=${API_KEY}&page=${page}&limit=${itemsPerPage}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // select
        const selectElement = document.querySelector('select[name="Основной объект"]');
        selectElement.innerHTML = '';
        data.forEach(route => {
            const option = document.createElement('option');
            option.value = route.mainObject;
            option.textContent = route.mainObject;
            selectElement.appendChild(option);
        });
 
        selectElement.addEventListener('change', function() {
            const selectedValue = this.value;
            const rows = document.querySelectorAll('#routesTable tbody tr');
         
            rows.forEach(row => {
                const objectCell = row.children[2];
                if (selectedValue && objectCell.textContent !== selectedValue) {
                   row.style.display = 'none';
                } else {
                   row.style.display = '';
                }
            });
         });
 
        // Добавление строк в таблицу
        data.forEach(route => {
            const row = document.createElement('tr');
 
            const nameCell = document.createElement('td');
            nameCell.textContent = route.name;
            row.appendChild(nameCell);
 
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = route.description;
            row.appendChild(descriptionCell);
 
            const objectsCell = document.createElement('td');
            objectsCell.textContent = route.mainObject;
            row.appendChild(objectsCell);
 
            const buttonCell = document.createElement('td');
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-success');
            button.textContent = 'Выбрать';
            button.addEventListener('click', function() {
                loadGuide(route.id); 
            });
            buttonCell.appendChild(button);
            row.appendChild(buttonCell);
        
            tableBody.appendChild(row);
        });
 
        // searchName
        const searchInput = document.querySelector('#searchName');
        searchInput.addEventListener('input', function() {
            const filter = this.value.toUpperCase();
            const rows = document.querySelectorAll('#routesTable tbody tr');
 
            rows.forEach(row => {
                const nameCell = row.children[0]; 
                const nameText = nameCell.textContent || nameCell.innerText;
                if (nameText.toUpperCase().indexOf(filter) > -1) {
                   row.style.display = "";
                } else {
                   row.style.display = "none";
                }
            });
        });
    })
    .catch(e => {
        console.error('Проблема в' + e.message);
    });
 }

document.querySelector('.page-link[aria-label="Previous"]').addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        loadRoutes(currentPage);
    }
 });
 
 document.querySelector('.page-link[aria-label="Next"]').addEventListener('click', (event) => {
    event.preventDefault();
    currentPage++;
    loadRoutes(currentPage);
 });

loadRoutes(currentPage);

function updatePagination() {
    const paginationItems = document.querySelectorAll('.page-item');
    paginationItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentPage - 1) {
            item.classList.add('active');
        }
    });
 }
 
 (event) => {
    event.preventDefault();['Previous', 'Next'].forEach(direction => {
       document.querySelector(`.page-link[aria-label="${direction}"]`).addEventListener('click', (event) => {
           event.preventDefault();
           if (direction === 'Previous' && currentPage > 1) {
               currentPage--;
           } else if (direction === 'Next') {
               currentPage++;
           }
           loadRoutes(currentPage);
           updatePagination();
       });
    });
    if (currentPage > 1) {
        currentPage--;
        loadRoutes(currentPage);
        updatePagination();
    }
 }
 
 document.querySelector('.page-link[aria-label="Next"]').addEventListener('click', (event) => {
    event.preventDefault();
    currentPage++;
    loadRoutes(currentPage);
    updatePagination();
 });

const paginationItems = document.querySelectorAll('.page-item');
paginationItems.forEach((item, index) => {
   item.addEventListener('click', (event) => {
       event.preventDefault();
       currentPage = index + 1;
       loadRoutes(currentPage);
       updatePagination();
   });
});
 loadRoutes(currentPage);
 updatePagination();


// Блок гидов


let languages = [];

function loadGuide(routeId) {
   const API_KEY = '37a978a6-aa8e-4e4b-b8a8-a104ca96e237';
   const tableBody = document.querySelector('.guides tbody');
   tableBody.innerHTML = '';

    fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${routeId}/guides?api_key=${API_KEY}`)
    .then(response => {
       if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
       }
       return response.json();
   })
   .then(data => {
       data.forEach(route => {
           if (!languages.includes(route.language)) {
               languages.push(route.language);
           }

           const row = document.createElement('tr');

           const imgGuide = document.createElement('td');
            const img = document.createElement('img');
            img.src = 'https://rutensil.ru/uploads/kj8DXcMNKxKdXLWAA8ZX5gRzo953pjvh.jpeg'; 
            img.className = 'guide-photo';
            imgGuide.appendChild(img);
            row.appendChild(imgGuide);

           const nameGuide = document.createElement('td');
           nameGuide.textContent = route.name;
           row.appendChild(nameGuide);

           const languageGuide = document.createElement('td');
           languageGuide.textContent = route.language;
           row.appendChild(languageGuide);

           const workExperience = document.createElement('td');
           workExperience.textContent = route.workExperience;
           row.appendChild(workExperience);

           const pricePerHour = document.createElement('td');
           pricePerHour.textContent = route.pricePerHour;
           row.appendChild(pricePerHour);

           const buttonCell = document.createElement('td');
           const button = document.createElement('button');
           button.classList.add('btn', 'btn-success');
           button.textContent = 'Выбрать';     
           button.addEventListener('click', function() {
              alert("ошибка выбора гида");
           });
           buttonCell.appendChild(button);
           row.appendChild(buttonCell);

           tableBody.appendChild(row);
       });

       const languageSelect = document.querySelector('#languageSelect');
       languageSelect.innerHTML = '';
       languages.forEach(language => {
           const option = document.createElement('option');
           option.value = language;
           option.textContent = language;
           languageSelect.appendChild(option);
       });

       languageSelect.addEventListener('change', function() {
           const selectedLanguage = this.value;
           const rows = document.querySelectorAll('.guides tbody tr');

           rows.forEach(row => {
               const languageCell = row.children[2];
               if (selectedLanguage && languageCell.textContent !== selectedLanguage) {
                  row.style.display = 'none';
               } else {
                  row.style.display = '';
               }
           });
       });

    const experienceFromInput = document.querySelector('input[placeholder="от"]');
    const experienceToInput = document.querySelector('input[placeholder="до"]');

    experienceFromInput.addEventListener('input', filterGuidesByExperience);
    experienceToInput.addEventListener('input', filterGuidesByExperience);

    function filterGuidesByExperience() {
        const experienceFrom = parseInt(experienceFromInput.value);
        const experienceTo = parseInt(experienceToInput.value);

    const guideRows = document.querySelectorAll('.guides tbody tr');

        guideRows.forEach(row => {
            const experienceCell = row.children[3]; 
            const experience = parseInt(experienceCell.textContent);

        if ((experienceFrom && experience < experienceFrom) || (experienceTo && experience > experienceTo)) {
           row.style.display = 'none';
        } else {
           row.style.display = '';
        }
   });
}
   })
   .catch(e => {
       console.error('Проблема в' + e.message);
   });
}
