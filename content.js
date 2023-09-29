// Function to set focus on the text box when the page loads or after an AJAX refresh
function setFocusOnLoadAndRefresh() {
    const searchInput = document.querySelector('#class_name_search1, #class_name_search2');
    if (searchInput) {
        searchInput.setAttribute('tabindex', '0');
        searchInput.focus();
    }
}

// Function for valid scan search input
function checkSearchInput() {
    const searchInput = document.querySelector('#class_name_search1, #class_name_search2')
    const scanIdRegex = /^;.{16,}\?$/;
    if (searchInput && scanIdRegex.test(searchInput.value)) {
        const observer = new MutationObserver(function (mutationsList) {
            if(clickStudentCard(searchInput.value)){
                observer.disconnect();
            }
        });
        observer.observe(document, { childList: true, subtree: true });
    }
}

//Function to click the student card
function clickStudentCard(searchText) {
    const studentCard = document.querySelector('.student_view_card span.ng-binding');
    if (studentCard && studentCard.textContent.includes(searchText)) {
        studentCard.click();
        const observer = new MutationObserver(function (mutationsList) {
            if(handleTimeLabels()){
                observer.disconnect();
            }
        });
        observer.observe(document, { childList: true, subtree: true });
        return true; 
    }
}

// Function to handle time labels when h6.modal_title appears
function handleTimeLabels() {
    const modaldialog = document.getElementById('modaldialog');
    if (modaldialog) {
        // Select all div elements with class "col-12" under "mediadialog" that don't have "pointer-events: none;"
        const divElements = modaldialog.querySelectorAll('div.col-12.outerbox.ng-scope:not([style*="pointer-events: none;"])');
        //work with the selected div elements as needed
        divElements.forEach(div => {
            div.scrollIntoView({ behavior: 'smooth', block: 'start' });
            div.click();
        });
        
        // Focus goes back to the search input
        setFocusOnLoadAndRefresh();
        return true;
    }
}

// Function to start the entire process
function startProcess() {
    setFocusOnLoadAndRefresh();
    checkSearchInput();
}

// Attach the startProcess function to the window.onload event
window.onload = startProcess;

// Listen for changes to the ajax
document.addEventListener('input', startProcess);