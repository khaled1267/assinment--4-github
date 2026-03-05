let thrivingList = [];
let strugglingList = []
let availablelist=[]
let currentfarhana = 'all'

let total = document.getElementById('total');
let thrivingCount = document.getElementById('thrivingCount')
let strugglingCount = document.getElementById('strugglingCount');
let emptystate =document.getElementById('empty-state')


const allFilterBtn = document.getElementById('all-filter-btn')
const thrivingFilterBtn = document.getElementById('thriving-filter-btn')
const strugglingFilterBtn = document.getElementById('struggling-filter-btn')

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')



   function calculateCount() {
    // 1. Dashboard sonkhya update
    total.innerText = allCardSection.querySelectorAll('.card').length;
    thrivingCount.innerText = thrivingList.length;
    strugglingCount.innerText = strugglingList.length;

    // 2. Jobs count lekha update (8 Jobs lekha-ta update hobe)
    const availableDisplay = document.getElementById('available');
    let currentCount = 0;

    if (currentfarhana === 'all-filter-btn') {
        currentCount = allCardSection.querySelectorAll('.card').length;
    } else if (currentfarhana === 'thriving-filter-btn') {
        currentCount = thrivingList.length;
    } else if (currentfarhana === 'struggling-filter-btn') {
        currentCount = strugglingList.length;
    }
    
    availableDisplay.innerText = `${currentCount} Jobs`;

    // 3. EMPTY STATE LOGIC (0 job hole image dekhabe)
    if (currentCount === 0) {
        emptystate.classList.remove('hidden');
        emptystate.classList.add('flex');
    } else {
        emptystate.classList.add('hidden');
        emptystate.classList.remove('flex');
    }
}

// step 1;
function toggleStyle(id) {
    // adding gray bg for all
    allFilterBtn.classList.add('bg-gray-300', 'text-black')
    thrivingFilterBtn.classList.add('bg-gray-300', 'text-black')
    strugglingFilterBtn.classList.add('bg-gray-300', 'text-black')

    // if any button has black then remove
    allFilterBtn.classList.remove('bg-black', 'text-white')
    thrivingFilterBtn.classList.remove('bg-black', 'text-white')
    strugglingFilterBtn.classList.remove('bg-black', 'text-white')

    // console.log(id);
    const selected = document.getElementById(id)//this is the button that clicked for filter

    currentfarhana = id
    // console.log(currentfarhana);
    // console.log(selected);
   

    // adding black bg for current button
    selected.classList.remove('bg-gray-300', 'text-black')
    selected.classList.add('bg-blue-700', 'text-white')
    // step 1 finish

    // show and hidden particular section
    // step 4 start
    // filtering while clicking the filter button (All, Thriving, Struggling)
    
    
    if (id == 'thriving-filter-btn') {
        allCardSection.classList.add('hidden');
        
        filterSection.classList.remove('hidden')
        renderThriving()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
    } else if (id == 'struggling-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderStruggling()`  `
    }
    // ... uporer if-else logic gulo thakbe ...

     else if (id == 'struggling-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        renderStruggling()
    }

    // --- EI KHANE (Line 63 er dike) ---
    calculateCount(); 

} // <--- Function-er shesh bracket



// step 2 delegation
mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('thriving-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const plantName = parenNode.querySelector('.plantName').innerText
        const light = parenNode.querySelector('.light').innerText
        const water = parenNode.querySelector('.water').innerText
        const farhana = parenNode.querySelector('.farhana').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.farhana').innerText = 'Interview'

        const cardInfo = {
            plantName,
            light,
            water,
            farhana: 'Interview',
            notes
        }

        const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName)

        if (!plantExist) {
            thrivingList.push(cardInfo)
        }

        // step 2 finish
        // removing the plant from struggling list
        strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName)

        // after remove rerender the html
        if (currentfarhana == 'struggling-filter-btn') {
            renderStruggling()
        }
        const clickeliment=event.target
        if(clickeliment.classList.contains('btn-delete')){
            console.log('deletclick')
        }
        

         calculateCount()

     
    }
    else if (event.target.closest('.btn-delete')) {
        const card = event.target.closest('.card');
        card.remove(); 

        const name = card.querySelector('.plantName').innerText;
        thrivingList = thrivingList.filter(item => item.plantName !== name);
        strugglingList = strugglingList.filter(item => item.plantName !== name);

        calculateCount();
    }
    
    else if (event.target.classList.contains('struggling-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const plantName = parenNode.querySelector('.plantName').innerText
        const light = parenNode.querySelector('.light').innerText
        const water = parenNode.querySelector('.water').innerText
        const farhana = parenNode.querySelector('.farhana').innerText
        const notes = parenNode.querySelector('.notes').innerText

        parenNode.querySelector('.farhana').innerText = 'Rejected'

        const cardInfo = {
            plantName,
            light,
            water,
            farhana: 'Rejected',
            notes
        }

        const plantExist = strugglingList.find(item => item.plantName == cardInfo.plantName)

        if (!plantExist) {
            strugglingList.push(cardInfo)
        }

        // removing the plant from thriving list
        thrivingList = thrivingList.filter(item => item.plantName != cardInfo.plantName)

        // console.log(thrivingList);

        // after remove rerender the html
        if (currentfarhana == "thriving-filter-btn") {
            renderThriving();
        }
        calculateCount()

    }

})

// step 3  html file create
function renderThriving() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''

    // crating innerHtml
    for (let thrive of thrivingList) {
        console.log(thrive);

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${thrive.plantName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">Bright Indicate</p>
                        <p class="water bg-gray-200 px-5">weekly</p>
                    </div>
                    <!-- part 3 -->
                     <p class="farhana">${thrive.farhana}</p>
                     <p class="notes">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="thriving-btn bg-green-200 px-4 py-2">Thrive</button>
                        <button class="struggling-btn bg-red-200 px-4 py-2">Struggle</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

function renderStruggling() {
    // make the filterSection empty every time
    filterSection.innerHTML = ''
    // crating innerHtml
    for (let struggle of strugglingList) {

        let div = document.createElement('div');
        div.className = 'card flex justify-between border p-8'
        div.innerHTML = `
         <div class="space-y-6">
                    <!-- part 1 -->
                    <div>
                        <p class="plantName text-4xl">${struggle.plantName}</p>
                        <p class="latinName">Latin Name</p>
                    </div>

                    <!-- part 2 -->
                    <div class="flex gap-2">
                        <p class="light bg-gray-200 px-5">Bright Indicate</p>
                        <p class="water bg-gray-200 px-5">weekly</p>
                    </div>
                    <!-- part 3 -->
                     <p class="farhana">${struggle.farhana}</p>
                     <p class="notes">New leaf unfurling by the east window.</p>

                     <div class="flex gap-5">
                        <button class="thriving-btn bg-green-200 px-4 py-2">Thrive</button>
                        <button class="struggling-btn bg-red-200 px-4 py-2">Struggle</button>
                     </div>
                </div>

                <!-- main part 2 -->
                <div>
                    <button class="btn-delete bg-red-200 text-red-600 px-4 py-2">Delete</button>
                </div>
        `
        filterSection.appendChild(div)
    }
}

