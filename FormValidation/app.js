//Event listeners for input fields
document.getElementById('name').addEventListener('blur',validateName);
document.getElementById('zip').addEventListener('blur',validateZip);
document.getElementById('email').addEventListener('blur',validateEmail);
document.getElementById('phone').addEventListener('blur',validatePhone);

//Functions
function validateName(){
    const name = document.getElementById('name');
    
    const re =/^[a-zA-z]{2,10}$/;
    if(!re.test(name.value)){
        //Add invalid class
        name.classList.add('is-invalid');
    }else{
        name.classList.remove('is-invalid');
    }
}
function validateZip(){
    const zip = document.getElementById('zip');
    //US ZIP CODES
    const re =/^[0-9]{5}(-[0-9]{4})?$/;
    if(!re.test(zip.value)){
        //Add invalid class
        zip.classList.add('is-invalid');
    }else{
        zip.classList.remove('is-invalid');
    }
    
}
function validateEmail(){
    const email = document.getElementById('email');
    
    const re =/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    
    if(!re.test(email.value)){
        //Add invalid class
        email.classList.add('is-invalid');
    }else{
        email.classList.remove('is-invalid');
    }
    
}
function validatePhone(){
    const phone = document.getElementById('phone');
    //allow space, dot, dash, num together, parenthesis
    const re =/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
    
    if(!re.test(phone.value)){
        //Add invalid class
        phone.classList.add('is-invalid');
    }else{
        phone.classList.remove('is-invalid');
    }
    
}