let currentStep = 1;
let userData = JSON.parse(localStorage.getItem("userData")) || {
    gender: null,
    height: 170,
    weight: 70,
    age: 25,
    goal: null,
    muscles: [],
    experience: null,
    workouts: 3,
    equipment: [],
    telegramId: null
};

document.addEventListener("DOMContentLoaded", function() {
    loadUserData();
    
    document.getElementById("heightSlider").addEventListener('input', function() {
        userData.height = this.value;
        document.getElementById('heightValue').textContent = this.value;
        saveUserData();
    });

    document.getElementById("weightSlider").addEventListener('input', function() {
        userData.weight = this.value;
        document.getElementById('weightValue').textContent = this.value;
        saveUserData();
    });

    document.getElementById("ageSlider").addEventListener('input', function() {
        userData.age = this.value;
        document.getElementById('ageValue').textContent = this.value;
        saveUserData();
    });

    document.getElementById("workoutsSlider").addEventListener('input', function() {
        userData.workouts = this.value;
        document.getElementById('workoutsValue').textContent = this.value;
        saveUserData();
    });
});

function saveUserData() {
    localStorage.setItem("userData", JSON.stringify(userData));
}

function loadUserData() {
    if (userData.gender) document.getElementById('finalGender').textContent = userData.gender;
    document.getElementById('finalHeight').textContent = userData.height;
    document.getElementById('finalWeight').textContent = userData.weight;
    document.getElementById('finalAge').textContent = userData.age;
    document.getElementById('finalGoal').textContent = userData.goal;
    document.getElementById('finalMuscles').textContent = userData.muscles.join(', ');
    document.getElementById('finalExperience').textContent = userData.experience;
    document.getElementById('finalWorkouts').textContent = userData.workouts;
    document.getElementById('finalEquipment').textContent = userData.equipment.join(', ');
}

function nextStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
    updateProgress();
    saveUserData();
}

function updateProgress() {
    const progress = (currentStep / 10) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function selectGender(gender, element) {
    userData.gender = gender;
    document.querySelectorAll('.gender-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    saveUserData();
}

function finish() {
    saveUserData();
    nextStep(11);
    generateExcelFile();
}

// Телеграм авторизация
function telegramAuth(user) {
    userData.telegramId = user.id;
    userData.telegramName = user.first_name;
    saveUserData();
}

// Генерация Excel-файла
function generateExcelFile() {
    const wb = XLSX.utils.book_new();
    const ws_data = [
        ["Пол", "Рост", "Вес", "Возраст", "Цель", "Группы мышц", "Опыт", "Тренировки в неделю", "Оборудование"],
        [userData.gender, userData.height, userData.weight, userData.age, userData.goal, userData.muscles.join(', '), userData.experience, userData.workouts, userData.equipment.join(', ')]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Training Plan");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const file = new File([blob], "training_plan.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    sendFileToTelegram(file);
}

// Отправка Excel в Telegram
function sendFileToTelegram(file) {
    const formData = new FormData();
    formData.append("chat_id", userData.telegramId);
    formData.append("document", file);

    fetch(`https://api.telegram.org/bot<TOKEN>/sendDocument`, {
        method: "POST",
        body: formData
    }).then(response => response.json())
      .then(data => console.log("Файл отправлен!", data))
      .catch(error => console.error("Ошибка отправки файла:", error));
}
