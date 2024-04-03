var globalPrimeOrComposite = '';
var globalPerfectRootOrIrrational = '';

function backToWhite() {
    document.getElementById('title').style = 'border: white solid;';
    document.getElementById('logtitle').style = 'border: white solid;';
    document.getElementById('glossarytitle').style = 'border: white solid;';
    document.getElementById('Enter').style = 'border: white solid;';
    document.getElementById('result_box').style = 'border: white solid;';
    document.getElementById('logbox').style = 'border: white solid;';
    document.getElementById('glossarybox').style = 'border: white solid;';
    document.getElementById('input').style = 'border: white dotted;';
}

function whiteToGreenEffect() {
    document.getElementById('title').style = 'border: green solid;';
    document.getElementById('logtitle').style = 'border: green solid;';
    document.getElementById('glossarytitle').style = 'border: green solid;';
    document.getElementById('Enter').style = 'border: green solid;';
    document.getElementById('result_box').style = 'border: green solid;';
    document.getElementById('logbox').style = 'border: green solid;';
    document.getElementById('glossarybox').style = 'border: green solid;';
    document.getElementById('input').style = 'border: green dotted;';
}

function whiteToRedEffect() {
    document.getElementById('title').style = 'border: red solid;';
    document.getElementById('logtitle').style = 'border: red solid;';
    document.getElementById('glossarytitle').style = 'border: red solid;';
    document.getElementById('Enter').style = 'border: red solid;';
    document.getElementById('result_box').style = 'border: red solid;';
    document.getElementById('logbox').style = 'border: red solid;';
    document.getElementById('glossarybox').style = 'border: red solid;';
    document.getElementById('input').style = 'border: red dotted;';
}



function filter() {
    globalPerfectRootOrIrrational = '';
    if (document.getElementById('input').value.length > 0) {
        if (document.getElementById('input').value >= 2) {
            document.getElementById('success').play();
            calculate();
            whiteToGreenEffect();
            setTimeout(backToWhite, 1000);
        } else if (document.getElementById('input').value < 2) {
            whiteToRedEffect();
            document.getElementById('buzzer').play();
            setTimeout(backToWhite, 1000);
            console.error('ERROR_2_1: INVALID NUMBER');
            document.getElementById('error').innerHTML = 'ERROR_2_1: Must enter a natural number greater than 1.';
            return appendElem('ERROR_2_1');
        }
    } else if (document.getElementById('input').value.length == 0) {
        whiteToRedEffect();
        document.getElementById('buzzer').play();
        setTimeout(backToWhite, 1000);
        console.error('ERROR_1: NO INPUT');
        document.getElementById('error').innerHTML = 'ERROR_1: Please input a value first.';
        appendElem('ERROR_1')
    }
}

function check(array) {
    if (array != undefined) {
        return array;
    } else {
        return 1;
    }
}

function deleteLastLine() {
    var logbox = document.getElementById('logbox');
    var children = logbox.childNodes;
    if (children.length > 0) {
        logbox.removeChild(children[children.length - 1]);
    }
}

function deleteAll() {
    var logbox = document.getElementById('logbox');
    logbox.innerHTML = '';
}

function appendElem(n) {
    var newElement = document.createElement('h2');
    if (globalPrimeOrComposite == 'P') {
        newElement.innerText = n + ' is a prime number';
    } else if (globalPrimeOrComposite == 'C') {
        newElement.innerText = n + ' is a composite number';
    }
    if (n == 'ERROR_1') {
        newElement.innerText = 'ERROR_1: NO INPUT.';
        newElement.style = "color: red;";
    } else if (n == 'ERROR_2_1') {
        newElement.innerText = 'ERROR_2_1: INVALID NUMBER. (LOWER THAN LIMIT)';
        newElement.style = "color: red;";
    } else if (n == 'ERROR_2_2') {
        newElement.innerText = 'ERROR_2_2: INVALID NUMBER. (HIGHER THAN LIMIT)';
        newElement.style = "color: red;";
    }

    if (n != 'ERROR_1' || n != 'ERROR_2') {
        if (globalPerfectRootOrIrrational == 'PerfectRoot') {
            newElement.innerText = newElement.innerText + " and is a Perfect Square Root";
        } else if (globalPerfectRootOrIrrational == 'I') {
            newElement.innerText = newElement.innerText + " and is not a Perfect Square Root";
        }
    }
    return document.getElementById('logbox').appendChild(newElement);
}

function calculate() {
    var divisibilityValues = [];
    globalPrimeOrComposite = '';
    globalPerfectRootOrIrrational = '';

    document.getElementById('ResultLabel').innerHTML = '';
    document.getElementById('divisibility1').innerHTML = '';
    document.getElementById('divisibility2').innerHTML = '';
    document.getElementById('divisibility3').innerHTML = '';
    document.getElementById('divisibility4').innerHTML = '';
    document.getElementById('divisibility5').innerHTML = '';
    document.getElementById('rootcheck').innerHTML = '';
    document.getElementById('error').innerHTML = 'Errors will be shown here.';

    var input = Math.floor(document.getElementById('input').value);

    for (i = 2; i <= (input - 1); i++) {
        if (input / i == Math.floor(input / i)) {
            divisibilityValues.push(i);
            console.log('x');
        }
    }

    if (input == 2) {
        globalPrimeOrComposite = "P";
        console.log('p');
        document.getElementById('ResultLabel').innerHTML = 'The number is a prime.';
    }

    if (Math.pow(input, (1 / 2)) == Math.floor(Math.pow(input, (1 / 2)))) {
        globalPerfectRootOrIrrational = "PerfectRoot";
        document.getElementById('rootcheck').innerHTML = 'The number is a perfect square root.';
    } else if (Math.pow(input, (1 / 2)) != Math.floor(Math.pow(input, (1 / 2)))) {
        globalPerfectRootOrIrrational = "I";
        document.getElementById('rootcheck').innerHTML = 'The number to the 1/2 power gives an irrational output.';
    }

    if (divisibilityValues[0] != undefined) {
        globalPrimeOrComposite = "C";
        document.getElementById('ResultLabel').innerHTML = 'The number is composite';
        document.getElementById('divisibility1').innerHTML = 'Its divisible by ' + divisibilityValues[0] + '.';
        document.getElementById('divisibility2').innerHTML = 'Its divisible by ' + check(divisibilityValues[1]) + '.';
        document.getElementById('divisibility3').innerHTML = 'Its divisible by ' + check(divisibilityValues[2]) + '.';
        document.getElementById('divisibility4').innerHTML = 'Its divisible by ' + check(divisibilityValues[3]) + '.';
        document.getElementById('divisibility5').innerHTML = 'Its divisible by ' + check(divisibilityValues[4]) + '.';
        console.log('z');
    } else {
        document.getElementById('ResultLabel').innerHTML = 'The number is prime.';
        console.log('wq');
        globalPrimeOrComposite = "P";
    }
    appendElem(input);
}
