function getSelectedAnswer(question) {
    const selectedInput = document.querySelector(`input[name="${question}"]:checked`);
    return selectedInput ? selectedInput.value : null;
}

function allQuestionsAnswered() {
    const questions = ['recipient', 'age', 'gender', 'occasion', 'interests', 'budget'];
    return questions.every(question => getSelectedAnswer(question) !== null);
}

function findGifts() {
    // Check if all questions are answered
    if (!allQuestionsAnswered()) {
        alert('Davam etmək üçün bütün sualları cavablayın!');
        return;
    }

    // Get selected answers
    const recipient = getSelectedAnswer('recipient');
    const age = getSelectedAnswer('age');
    const gender = getSelectedAnswer('gender');
    const occasion = getSelectedAnswer('occasion');
    const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(input => input.value);
    const budget = getSelectedAnswer('budget');

    // Filter products based on selected answers
    const filteredProducts = productList.filter(product =>
        (!recipient || product.recipient === recipient) &&
        (!age || product.age === age) &&
        (!gender || product.gender === gender) &&
        (!occasion || product.occasion === occasion) &&
        (interests.length === 0 || interests.some(interest => product.interests.includes(interest))) &&
        (!budget || product.budget === budget)
    );

    // Display recommendations
    displayRecommendations(filteredProducts);
}


function displayRecommendations(products) {
    const formContainer = document.querySelector('.form-container');
    const giftRecommendations = document.getElementById('giftRecommendations');

    // Move recommendations section to the top
    formContainer.style.display = 'none'; // Hide the form
    giftRecommendations.classList.remove('hidden');
    document.body.insertBefore(giftRecommendations, document.body.firstChild);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const giftList = document.getElementById('giftList');

    // Clear previous recommendations
    giftList.innerHTML = '';

    // Display new recommendations
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price-tag">${product.price}</div>
                    <a href="${product.link}" target="_blank" class="product-link">Məhsula bax</a>
                </div>
            </div>
        `;
        giftList.appendChild(listItem);
    });

    // Add "Go Back" button to recommendations page
    const goBackButton = document.createElement('button');
    goBackButton.textContent = '< Geri Qayıt';
    goBackButton.addEventListener('click', goBack);
    document.body.insertBefore(goBackButton, document.body.firstChild);

    // Hide real gift recommendations container
    const realGiftList = document.getElementById('realGiftList');
    realGiftList.parentElement.classList.add('hidden');
}


function goBack() {
    const formContainer = document.querySelector('.form-container');
    const giftRecommendations = document.getElementById('giftRecommendations');
    const goBackButton = document.querySelector('button');

    // Move form container back to its original position
    formContainer.style.display = 'block';
    document.body.insertBefore(formContainer, document.body.firstChild);

    // Hide recommendations and remove "Go Back" button
    giftRecommendations.classList.add('hidden');
    document.body.removeChild(goBackButton);
}
