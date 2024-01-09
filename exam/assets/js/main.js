let currentPage = 1;
const itemsPerPage = 13;
const totalPages = 9;
let allRoutes = [];
let filteredRoutes = [];

function loadRoutes(page) {
 const API_KEY = '37a978a6-aa8e-4e4b-b8a8-a104ca96e237';
 const tableBody = document.querySelector('#routesTable tbody');
 tableBody.innerHTML = ''; 

 fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=${API_KEY}&limit=100`)
 .then(response => {
     if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
     }
     return response.json();
 })
 .then(data => {
     allRoutes = data;
     updateSelectOptions(data);
     applyFilters();
 })
 .catch(e => {
     console.error('Проблема в' + e.message);
 });
}

function updateSelectOptions(data) {
    const selectElement = document.querySelector('select[name="Основной объект"]');
    selectElement.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Ничего';
    selectElement.appendChild(defaultOption);
    data.forEach(route => {
        const option = document.createElement('option');
        option.value = route.mainObject;
        option.textContent = route.mainObject;
        selectElement.appendChild(option);
    });
  }

function applyFilters() {
   const selectedValue = document.querySelector('select[name="Основной объект"]').value;
   const searchInputValue = document.querySelector('#searchName').value.toUpperCase();

   filteredRoutes = allRoutes.filter(route => {
       const matchesObject = !selectedValue || route.mainObject === selectedValue;
       const matchesSearch = !searchInputValue || route.name.toUpperCase().includes(searchInputValue);
       return matchesObject && matchesSearch;
   });

   displayRoutes(currentPage);
}

function displayRoutes(page) {
   const tableBody = document.querySelector('#routesTable tbody');
   tableBody.innerHTML = '';

   const startIndex = (page - 1) * itemsPerPage;
   const endIndex = Math.min(startIndex + itemsPerPage, filteredRoutes.length);

   for (let i = startIndex; i < endIndex; i++) {
       const route = filteredRoutes[i];
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
   }

   updatePagination();
}



loadRoutes(currentPage);

function updatePagination() {
   const paginationItems = document.querySelectorAll('.page-item');
   paginationItems.forEach((item, index) => {
     if (index === 0 || index > totalPages) {
       item.style.display = 'none';
     } else {
       item.style.display = 'block';
       item.classList.remove('active');
       if (index === currentPage) {
         item.classList.add('active');
       }
     }
   });
}

document.querySelector('select[name="Основной объект"]').addEventListener('change', applyFilters);
document.querySelector('#searchName').addEventListener('input', applyFilters);

function resetFilters() {
    const selectElement = document.querySelector('select[name="Основной объект"]');
    selectElement.value = '';
 
    const searchInput = document.querySelector('#searchName');
    searchInput.value = '';

    // Применяем фильтры заново, чтобы отобразить все маршруты
    applyFilters();
}
 
loadRoutes(currentPage);

function updatePagination() {
    const paginationItems = document.querySelectorAll('.page-item');
    const numPages = Math.ceil(filteredRoutes.length / itemsPerPage);

    paginationItems.forEach((item, index) => {
        if (index === 0 || index > numPages) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
            item.classList.remove('active');
            if (index === currentPage) {
                item.classList.add('active');
            }
        }
    });
}
  
  
  // Обработчики событий для конкретных страниц пагинации
  const paginationItems = document.querySelectorAll('.page-item');
  paginationItems.forEach((item, index) => {
    // Пропускаем первый и последний элементы, так как это кнопки "Previous" и "Next"
    if (index === 0 || index > totalPages) return;
  
    item.addEventListener('click', (event) => {
      event.preventDefault();
      currentPage = index;
      loadRoutes(currentPage);
      updatePagination();
    });
  });
  
  // Загрузка маршрутов и обновление пагинации при первой загрузке страницы
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
