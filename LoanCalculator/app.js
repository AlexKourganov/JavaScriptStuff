//Listen for submit
//document.querySelector('#loan-form').addEventListener('submit',calculateResults);
document.querySelector('#loan-form').addEventListener('submit',function(e)
{
    //show loader and hide results
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults,2000);


    e.preventDefault();
});

//Function to calculate results
function calculateResults(){
//console.log("here");
//UI variable
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

//Formulas
const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(years.value)*12;
//Calculate montly payment
const x =Math.pow(1+calculatedInterest,calculatedPayments);
const montly = (principal * x * calculatedInterest)/(x-1);

if(isFinite(montly)){
monthlyPayment.value = montly.toFixed(2);
totalPayment.value = (montly * calculatedPayments).toFixed(2);
totalInterest.value = ((montly * calculatedPayments)-principal).toFixed(2);
//show results and hide loader
document.getElementById('results').style.display = 'block';
document.getElementById('loading').style.display = 'none';


}else{
//console.log("Error!");
showError('Check Your Numbers!');
}

//e.preventDefault();
}

//Error function
function showError(error){
//hide loader and results
document.getElementById('results').style.display = 'none';
document.getElementById('loading').style.display = 'none';

const errorDiv = document.createElement('div');
//get elements
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
//add class
errorDiv.className = 'alert alert-danger';
//add text to div
errorDiv.appendChild(document.createTextNode(error));
//Insert error above heading
//call on a parent,(what you want to insert, before what you want to insert)
card.insertBefore(errorDiv,heading);

//clear error after x seconds, takes in a function to call, time in ms
setTimeout(clearError,3000);
}
//clear function
function clearError(){
    document.querySelector('.alert').remove();
}