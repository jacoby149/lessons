
// show hide functionality
function showhide(thing) {
    thing.hidden = !thing.hidden;
}

//lesson 1 functions

function add(a, b, c) {
    //A Float is a number that can also be a decimal, i.e. 3.4
    //A regular integer can't be a decimal.
    c.value = parseFloat(a.value) + parseFloat(b.value);
    return c.value;
}

function subtract(a, b, c) {
    c.value = parseFloat(a.value) - parseFloat(b.value);
    return c.value;
}

function multiply(a, b, c) {
    c.value = parseFloat(a.value) * parseFloat(b.value);
    return c.value;
}

function divide(a, b, c) {
    if (parseFloat(b.value) == 0) {
        c.value = "NaN";
    }
    else {
        c.value = parseFloat(a.value) / parseFloat(b.value);
    }
    return c.value;
}

//lesson 2 functions
function even(n, x) {
    x.value = n.value * 2;
    return x.value
}

function odd(n, x) {
    x.value = n.value * 2 - 1;
    return x.value;
}

function isPrime(number) {
    var divide_by = 2;
    while (divide_by < number) {
        if (number % divide_by == 0) {
            return false;
        }
        divide_by = divide_by + 1
    }
    return true;
}

function prime(n, x) {
    var count = 0;
    var curr = 1;
    while (count < n.value) {
        curr = curr + 1;
        if (isPrime(curr)) {
            count = count + 1;
        }
    }
    x.value = curr;
    return x.value;
}

function factorial(n) {
    if (n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

function factorial_wrapper(n, x) {
    x.value = factorial(n.value)
    return x.value;
}

function fibonnaci(n, memoize = false) {
    if (n == 1 || n == 0) {
        return 1;
    }
    return fibonnaci(n - 1) + fibonnaci(n - 2)
}


function fibonnaci_wrapper(n, x) {
    x.value = fibonnaci(n.value);
    return x.value;
}

