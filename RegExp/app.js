// let re;
// re = /hello/i;

//exec() - Return result in array or null
// const result =re.exec('hello space world hello');
// console.log(result);
// console.log(result[0]);
// console.log(result.index);
//test() - returns true or false

// /hello/i  == i makes it case insensetive
// /hello/i  == g makes it a global search will search for all instances of hello

//const result = re.test('hello space world hello');
// const result = re.exec('hello space world hello');

//match() - will return result array or null


// const str = 'Hello There';
// const result = str.match(re);


//search()  -  returns the index of first match else returns -1
// const str='Hello there';
// const result = str.search(re);

//replace()- Return new string with some or all matches of a pattern
// const str='hello there'
// const newStr = str.replace(re,'HI');
// console.log(newStr);


/////////////////////////////////////////////////////////////////////////////////////////////////

let re;
//literal ch
re=/hello/;
re=/hello/i;
//Metacharacter symbols
re=/^h/i; //must start with
re=/d$/i; //must end with a d
re=/^hello$/i; //must s tart and end with
re=/h.llo/i; //matches any one character
re=/h*llo/i;//matches any charatcer 0 or more times
re=/gre?a?y/i; //? is put after a character that is optional in this case e and a are optional
re=/gre?a?y\?/i; //excape charaters

//Brackets  [] - Character sets
re=/gr[ae]y/i; //must be an a or e
re=/[GF]ray/; //must be an G or F
re=/[^GF]ray/; //Match anything except G or F, because ^ is inside of brackets
re=/[A-Z]ray/;  // Match any upper case letter
re=/[a-z]ray/; // Match any lower case letter
re=/[A-Za-z]ray/; // Match any letter of any case
re=/[0-9]ray/; //will match any digit

//braces {} quantifiers

re = /Hel{2}o/i; // Matches 2 L's exactly
re = /Hel{2,4}o/i; // Matches 2 to 4 L's exactly
re = /Hel{2,}o/i; // Matches 2 or more time L's exactly

//Paranthesis () - grouping
re = /([0-9]x){3}/; // loks num x that repeats 3 times

//Short Hand Character Classes

re=/\w/; //Word character - alphanumeric character char,num, or _
re=/\w+/; //looks at one or more word character
re=/\W+/; //Non Word Characters
re=/\d/;    //Will match any 1 digit
re=/\d+/;    //Will match any 1 or more digitnon digits1 digit
re=/\D+/;    //Will match any 1 or more non digit
re=/\s/;    //match white space character
re=/\S/;  //Non white space character
re=/Hell\b/i;  //Word Boundary  will look for just Hell and not for word inside a word

//Asertions
re=/x(?=y)/;  //will match X if only followed by y
re=/x(?!y)/;  //will match X if only if NOT followed by y


//string to match
const str = 'rarxdy';

//log results
const result = re.exec(str);
console.log(result);

function reTest(re,str){
    if(re.test(str)){
        console.log(`${str} matched ${re.source}`);
    }else{
        console.log(`${str} does NOT match ${re.source}`);
    }
}

reTest(re,str);