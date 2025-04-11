// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


//Uses Luhn algorithm to check if card is valid
const validateCred = arr =>{
    let total = 0;
    let mult = false;

    //goes through the array backwords multiplies every other number by 2
    for (let i = arr.length - 1; i >= 0; i--) {
        if(arr[i] < 0){
            arr[i] *= -1;
        }
        let currVal = arr[i];

        //Checks if the number should be multiplied
        if (mult) {
          currVal *= 2;
          //if currVall is greater then 9 we need to subtract it by 9
          if (currVal > 9) currVal -= 9;
        }

        total += currVal;
        mult = !mult;
    }
    //If total is mod 10 then we know this card is valid else return false
    if(total % 10 === 0){
        return true;
    }
    else{
        return false;
    }
}

//uses invalidCards to make a new nested array of only invalid cards
const findInvalidCards = arr =>{
    let invalidCards = [];

    //checks if arr is a nested array 
    if(Array.isArray(arr) && arr.some(item => Array.isArray(item))){
        arr.forEach(card => {
            if(validateCred(card) === false){
                invalidCards.push(card);
            }
        })
    }else{
        if(validateCred(arr) === false){
            return arr;
        }
    }
    return invalidCards;
}

//looks at the first index of an array to find which company invalid cards belongs to
//uses Set to deal with possible duplications
const idInvalidCardCompanies = arr =>{
    let badCards = findInvalidCards(arr);
    let companies = new Set();

    //if all card numbers are valid then badCards will equal 0
    if(badCards.length > 0){
        //checks if arr is a nested array 
        if(Array.isArray(arr) && arr.some(item => Array.isArray(item))){
            badCards.forEach(card => {
                switch (card[0]) {
                    case 3:
                        companies.add("Amex (American Express)")
                        break;
                    case 4: 
                        companies.add("Visa")
                        break;
                    case 5:
                        companies.add("Mastercard")
                        break;
                    case 6:
                        companies.add("Discover")
                        break;
                    default:
                        console.log('Company not found')
                }
            })
        }else{
            switch (badCards[0]) {
                case 3:
                    companies.add("Amex (American Express)")
                    break;
                case 4: 
                    companies.add("Visa")
                    break;
                case 5:
                    companies.add("Mastercard")
                    break;
                case 6:
                    companies.add("Discover")
                    break;
                default:
                    console.log('Company not found')
            }
        }
}
    return companies
}

//split a given string into newCard array and finds if it's valid
const createCardArray = cardString =>{
    let newCard = cardString.split("").map(Number);
    return idInvalidCardCompanies(newCard);
}


console.log(idInvalidCardCompanies(batch));
console.log(createCardArray("4539404967869666"))
