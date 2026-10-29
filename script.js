// BMI = weight (kg) / height (m) x height (m)

var weightInput = document.getElementById("weight");
var heightInput = document.getElementById("height");
var errorText = document.getElementById("error");
var emptyBox = document.getElementById("empty");
var outputBox = document.getElementById("output");

function calculateBMI() {
  var weight = parseFloat(weightInput.value);
  var heightCm = parseFloat(heightInput.value);

  if (isNaN(weight) || isNaN(heightCm)) {
    errorText.textContent = "Please fill both fields.";
    return;
  }
  if (weight <= 0 || heightCm <= 0) {
    errorText.textContent = "Values must be more than zero.";
    return;
  }
  errorText.textContent = "";

  var heightM = heightCm / 100;
  var bmi = weight / (heightM * heightM);
  bmi = Math.round(bmi * 10) / 10;

  var category = "";
  var color = "";
  if (bmi < 18.5) { category = "Underweight"; color = "#2f84c9"; }
  else if (bmi < 25) { category = "Normal weight"; color = "#2e9e5b"; }
  else if (bmi < 30) { category = "Overweight"; color = "#c98a10"; }
  else { category = "Obese"; color = "#d0443a"; }

  document.getElementById("bmiValue").textContent = bmi;
  document.getElementById("bmiCategory").textContent = category;
  document.getElementById("bmiCategory").style.color = color;

  // move marker on the bar (bar starts at BMI 10 and ends at 40)
  var percent = (bmi - 10) / 30 * 100;
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;
  document.getElementById("marker").style.left = percent + "%";

  emptyBox.classList.add("hidden");
  outputBox.classList.remove("hidden");
}

function resetAll() {
  weightInput.value = "";
  heightInput.value = "";
  errorText.textContent = "";
  outputBox.classList.add("hidden");
  emptyBox.classList.remove("hidden");
}

document.getElementById("calcBtn").addEventListener("click", calculateBMI);
document.getElementById("resetBtn").addEventListener("click", resetAll);

[weightInput, heightInput].forEach(function (box) {
  box.addEventListener("keydown", function (e) {
    if (e.key === "Enter") calculateBMI();
  });
});
