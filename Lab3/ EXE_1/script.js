const validationRules = {
    Student: {
        minAge: 13,
        passRegex: /.{6,}/,
        passMsg: "Minimum 6 characters",
        showSkills: true
    },
    Teacher: {
        minAge: 21,
        passRegex: /.{8,}/,
        passMsg: "Minimum 8 characters",
        showSkills: true
    },
    Admin: {
        minAge: 18,
        passRegex: /^(?=.*[A-Z])(?=.*\d).{10,}$/,
        passMsg: "Min 10 chars, at least 1 uppercase & 1 number",
        showSkills: false
    }
};

const form = document.getElementById('regForm');
const roleSelect = document.getElementById('role');
const submitBtn = document.getElementById('submitBtn');

const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    age: document.getElementById('age'),
    skills: document.getElementById('skills')
};

const feedback = {
    email: document.getElementById('emailError'),
    password: document.getElementById('passwordFeedback'),
    age: document.getElementById('ageError')
};

function validateForm() {
    const role = roleSelect.value;
    const config = validationRules[role];

    const nameVal = fields.name.value.trim();
    const emailVal = fields.email.value.trim();
    const passVal = fields.password.value;
    const confirmVal = fields.confirmPassword.value;
    const ageVal = fields.age.value.trim();
    const skillsVal = fields.skills.value.trim();

    const isNameValid = nameVal.length >= 2;

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

    const isPasswordValid = config.passRegex.test(passVal);
    const passwordsMatch = passVal === confirmVal && passVal !== "";

    let isAgeValid = false;
    if (ageVal !== "" && !isNaN(ageVal)) {
        const ageNum = Number(ageVal);
        isAgeValid = Number.isInteger(ageNum) && ageNum >= config.minAge && ageNum <= 120;
    }

    const isSkillsValid = !config.showSkills || skillsVal.length > 0;

    document.getElementById('skillsSection').style.display = config.showSkills ? 'block' : 'none';

    feedback.email.innerText = isEmailValid || emailVal === "" ? "" : "Please enter a valid email";
    feedback.password.innerText = passVal === "" ? "" : (isPasswordValid ? "" : config.passMsg);
    feedback.age.innerText = (ageVal === "" || isAgeValid) ? "" : `Must be at least ${config.minAge} years old`;

    applyStatus(fields.name, isNameValid);
    applyStatus(fields.email, isEmailValid);
    applyStatus(fields.password, isPasswordValid);
    applyStatus(fields.confirmPassword, passwordsMatch && passVal !== "");
    applyStatus(fields.age, isAgeValid && ageVal !== "");

    const allValid =
        isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        passwordsMatch &&
        isAgeValid &&
        isSkillsValid;

    submitBtn.disabled = !allValid;
}

function applyStatus(element, isValid) {
    element.classList.remove('valid', 'invalid');

    if (element.value.trim() === "") {
        return; 
    }

    if (isValid) {
        element.classList.add('valid');
    } else {
        element.classList.add('invalid');
    }
}

form.addEventListener('input', validateForm);
form.addEventListener('change', validateForm);   
roleSelect.addEventListener('change', validateForm);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!submitBtn.disabled) {
        alert("Registration successful!\n\nRole: " + roleSelect.value);
        form.reset();
        submitBtn.disabled = true;
        validateForm(); 
    }
});

validateForm();
