//window load function to start the page with a focus on the name input.
window.onload = function() {
    document.getElementById('name').focus();

};
//initiate sum for price of events
var sum = 0;


const other_role = document.getElementById('other-title');
other_role.style.display = 'none';
const titles = document.getElementById('title');
const colorSelect = document.getElementById('color');
const colors = colorSelect.children;
const theme = document.getElementById('design');
const allThemes = theme.children;
let chosenTheme;

//event listener to display other_role element when other is selected value
titles.addEventListener('change', (e) => {
    if (e.target.value == 'other') {
        other_role.style.display = '';
    } else {
        other_role.style.display = 'none';
    }
})


//for loop to not display options
for (let i = 0; i < colors.length; i++) {
    colors[i].style.display = 'none';
}

//event listener to see if a theme is selected to display t-shirt types
theme.addEventListener('change', (e) => {

    if (theme.options[theme.selectedIndex].value != allThemes[0].value) {
        for (let i = 0; i < colors.length; i++) {
            colors[i].style.display = '';
        }
        allThemes[0].style.display = 'none'
    }
    if (theme.options[theme.selectedIndex].value === 'js puns') {
        for (let i = 3; i < colors.length; i++) {
            colors[i].style.display = 'none';
        }
        for (let i = 0; i < 4; i++) {
            colors[i].style.display = '';
        }
    }
    if (theme.options[theme.selectedIndex].value === 'heart js') {
        for (let i = 0; i < 4; i++) {
            colors[i].style.display = 'none';
        }
        for (let i = 4; i < colors.length; i++) {
            colors[i].style.display = '';
        }
    }

})

//event listener that deals with activities
document.querySelector('.activities').addEventListener('change', (e) => {
    //declare vairables for needed elements
    const activities = document.querySelector('.activities');
    const currentPrice = activities.querySelector('.current_price');
    const checkboxInput = activities.querySelectorAll(`input[type="checkbox"]`);
    const targText = e.target.parentElement.textContent.slice(e.target.parentElement.textContent.indexOf('—') + 2, e.target.parentElement.textContent.indexOf('$'));

    //if statement that adds to the price dependendant on which activity is chosen.
    if (e.target.checked == true) {
        let r = e.target.parentElement.textContent.split('$');
        currentPrice.textContent = (sum += parseInt(r[1]));

        // else if statement that subtracts to the price dependendant on which activity is chosen.
    } else if (e.target.checked == false && sum != 0) {
        let r = e.target.parentElement.textContent.split('$');
        currentPrice.textContent = (sum -= parseInt(r[1]));

    }

    //if statement that disables the activities if they conflict
    if (checkboxInput[1].checked) {
        checkboxInput[3].parentNode.style.color = 'grey';
        checkboxInput[3].disabled = true;
    } else {
        checkboxInput[3].disabled = false;
        checkboxInput[3].parentNode.style.color = 'black';
    }
    if (checkboxInput[3].checked) {
        checkboxInput[1].parentNode.style.color = 'grey';
        checkboxInput[1].disabled = true;
    } else {
        checkboxInput[1].disabled = false;
        checkboxInput[1].parentNode.style.color = 'black';
    }
    if (checkboxInput[2].checked) {
        checkboxInput[4].parentNode.style.color = 'grey';
        checkboxInput[4].disabled = true;
    } else {
        checkboxInput[4].disabled = false;
        checkboxInput[4].parentNode.style.color = 'black';
    }
    if (checkboxInput[4].checked) {
        checkboxInput[2].parentNode.style.color = 'grey';
        checkboxInput[2].disabled = true;
    } else {
        checkboxInput[2].disabled = false;
        checkboxInput[2].parentNode.style.color = 'black';
    }
})

//queryselectors that turn off other payment info 
document.querySelector('#paypal').style.display = 'none';
document.querySelector('#bitcoin').style.display = 'none';

//event listener for payment type.
document.querySelector('#payment').addEventListener('change', (e) => {
        const payMethods = document.querySelector('#payment').children;

        // if statements that check what type of payment option is selected and displays accordingly
        if (e.target.value == 'bitcoin') {
            document.querySelector('#credit-card').style.display = 'none';
            document.querySelector('#paypal').style.display = 'none';
            document.querySelector('#bitcoin').style.display = '';
        } else if (e.target.value == 'paypal') {
            document.querySelector('#paypal').style.display = '';
            document.querySelector('#credit-card').style.display = 'none';
            document.querySelector('#bitcoin').style.display = 'none';
        } else if (e.target.value == 'credit card') {
            document.querySelector('#credit-card').style.display = '';
            document.querySelector('#paypal').style.display = 'none';
            document.querySelector('#bitcoin').style.display = 'none';
        }



    })
    //regex to match email field to make sure its correctly inputted 
document.querySelector('#basicInfo').addEventListener('input', (e) => {
    const mail = document.querySelector('#mail');
    if (/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(mail.value) == true) {

        mail.style.color = 'black';
    } else {
        mail.style.color = 'red';
    }
})

const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

//event listener for credit card fields 
document.querySelector('#credit-card').addEventListener('input', (e) => {

    const paymentMethod = document.querySelector('#payment').value;
    //using regex to check if inputed value matches correct formating
    if (paymentMethod == 'credit card') {


        const submit = document.querySelector('form');
        e.preventDefault();

        if (/^\d{13,16}$/.test(ccNum.value) == true) {
            ccNum.style.color = 'black';
        } else {
            ccNum.style.color = 'red'
                // ccNum.disabled = true;
        }
        if (/^\d{5}$/.test(zip.value) == true) {
            zip.style.color = 'black';
        } else {
            zip.style.color = 'red'

        }
        if (/^\d{3}$/.test(cvv.value) == true) {

            cvv.style.color = 'black';
        } else {
            cvv.style.color = 'red'
        }



    }

})

//function to check if any activities arre selected or not
function checkOptions() {
    const activities = document.querySelector('.activities');
    const checkboxInput = document.querySelectorAll(`input[type="checkbox"]`);
    for (let i = 0; i < checkboxInput.length; i++) {
        if (checkboxInput[i].checked == true) {
            return true;


        }
    }
    return false;
}

//function that validates form.
function validateForm() {
    //declaration of necessary variables.
    const activities = document.querySelector('.activities');
    const checkboxInput = activities.querySelectorAll(`input[type="checkbox"]`);

    const paymentMethod = document.querySelector('#payment').value;
    const name = document.querySelector('#name');
    //if statement to check if the credit card payment method is selected.
    if (paymentMethod == 'credit card') {
        //if statement that checks if the number entered is correct.
        if (/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(mail.value) == false || /^\d{13,16}$/.test(ccNum.value) == true || /^\d{5}$/.test(zip.value) == true || /^\d{3}$/.test(cvv.value) == true || checkOptions() == false || name.value == '') {
            if (name.value == '') {
                name.style.borderColor = 'red';
                window.scrollTo(0, 0);

            }
            if (checkOptions() == false) {
                activities.parentElement.style.borderStyle = 'solid';
                activities.parentElement.style.borderColor = 'red';
                activities.parentElement.style.borderColor = 'red';


            }
            if (ccNum.style.color == 'red') {
                ccNum.style.borderColor = 'red';
            }
            if (zip.style.color == 'red') {
                zip.style.borderColor = 'red';
            }
            if (cvv.style.color == 'red') {
                cvv.style.borderColor = 'red';
            }
            return false;
        } else if (/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(mail.value) == true && ccNum.style.color != 'red' && zip.style.color != 'red' && cvv.style.color != 'red' && checkOptions() == true && name.value != '') {

            return true;
        }
        //if its not a credit card it checks inputs and submits
    } else {

        if (/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(mail.value) == false || checkOptions() == false || name.value == '') {
            if (name.value == '') {
                name.style.borderColor = 'red';
                window.scrollTo(0, 0);

            }
            if (checkOptions() == false) {
                activities.parentElement.style.borderStyle = 'solid';
                activities.parentElement.style.borderColor = 'red';
                activities.parentElement.style.borderColor = 'red';


            }
            if (ccNum.style.color == 'red') {
                ccNum.style.borderColor = 'red';
            }
            if (zip.style.color == 'red') {
                zip.style.borderColor = 'red';
            }
            if (cvv.style.color == 'red') {
                cvv.style.borderColor = 'red';
            }
            return false;
        } else if (/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(mail.value) == true && checkOptions() == true && name.value != '') {

            return true;
        }
    }

}