let currentStep = 1;
let userData = {
    gender: null,
    height: 170,
    weight: 70,
    age: 25,
    goal: null,
    muscles: [],
    experience: null,
    workouts: 3,
    equipment: []
};

function nextStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
    updateProgress();
}

function updateProgress() {
    const progress = (currentStep / 10) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function selectGender(gender, element) {
    userData.gender = gender;
    document.querySelectorAll('.gender-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

function selectGoal(goal, element) {
    userData.goal = goal;
    document.querySelectorAll('.goal-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

function toggleMuscle(muscle, element) {
    const index = userData.muscles.indexOf(muscle);
    if (index === -1) {
        userData.muscles.push(muscle);
        element.classList.add('selected');
    } else {
        userData.muscles.splice(index, 1);
        element.classList.remove('selected');
    }
}

function selectAllMuscles() {
    const muscles = ['chest', 'back', 'legs', 'arms', 'shoulders', 'abs'];
    userData.muscles = muscles;
    document.querySelectorAll('.muscle-option').forEach(opt => opt.classList.add('selected'));
}

function selectExperience(experience, element) {
    userData.experience = experience;
    document.querySelectorAll('.experience-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

function toggleEquipment(equipment, element) {
    const index = userData.equipment.indexOf(equipment);
    if (index === -1) {
        userData.equipment.push(equipment);
        element.classList.add('selected');
    } else {
        userData.equipment.splice(index, 1);
        element.classList.remove('selected');
    }
}

function finish() {
    document.getElementById('finalGender').textContent = userData.gender;
    document.getElementById('finalHeight').textContent = userData.height;
    document.getElementById('finalWeight').textContent = userData.weight;
    document.getElementById('finalAge').textContent = userData.age;
    document.getElementById('finalGoal').textContent = userData.goal;
    document.getElementById('finalMuscles').textContent = userData.muscles.join(', ');
    document.getElementById('finalExperience').textContent = userData.experience;
    document.getElementById('finalWorkouts').textContent = userData.workouts;
    document.getElementById('finalEquipment').textContent = userData.equipment.join(', ');
    nextStep(11);
}

document.getElementById('heightSlider').addEventListener('input', function() {
    userData.height = this.value;
    document.getElementById('heightValue').textContent = this.value;
});

document.getElementById('weightSlider').addEventListener('input', function() {
    userData.weight = this.value;
    document.getElementById('weightValue').textContent = this.value;
});

document.getElementById('ageSlider').addEventListener('input', function() {
    userData.age = this.value;
    document.getElementById('ageValue').textContent = this.value;
});

document.getElementById('workoutsSlider').addEventListener('input', function() {
    userData.workouts = this.value;
    document.getElementById('workoutsValue').textContent = this.value;
});