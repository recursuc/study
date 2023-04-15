// The prompt "解析器组合字" is in Chinese and translates to "Parser Combinators"
// Here is an example of a simple parser combinator in JavaScript:

function charParser(char) {
  return function(input) {
    if (input[0] === char) {
      return {
        result: char,
        rest: input.slice(1)
      };
    } else {
      return null;
    }
  };
}

// This parser combinator takes a character as input and returns a function that takes an input string.
// If the first character of the input string matches the input character, the function returns an object with the matched character and the rest of the input string.
// Otherwise, it returns null. // Here is an example of a simple parser combinator in JavaScript:

function charParser(char) {
  return function(input) {
    if (input[0] === char) {
      return {
        result: char,
        rest: input.slice(1)
      };
    } else {
      return null;
    }
  };
}

// This parser combinator takes a character as input and returns a function that takes an input string.
// If the first character of the input string matches the input character, the function returns an object with the matched character and the rest of the input string.
// Otherwise, it returns null.

// To continue, you can use this charParser function to build more complex parser combinators. For example, you can use it to parse strings or numbers by combining it with other parser combinators.To continue, you can use this charParser function to create more complex parser combinators by combining them together using higher-order functions such as sequence, choice, and many.
// To continue, you can use this charParser function to build more complex parser combinators. For example, you can use it to parse strings or numbers by combining it with other parser combinators. 
// Here is an example of a parser combinator that parses a string of characters:

function stringParser(str) {
  const parsers = Array.from(str).map(charParser);
  return function(input) {
    let result = '';
    let rest = input;
    for (let i = 0; i < parsers.length; i++) {
      const parser = parsers[i];
      const parseResult = parser(rest);
      if (parseResult === null) {
        return null;
      }
      result += parseResult.result;
      rest = parseResult.rest;
    }
    return {
      result: result,
      rest: rest
    };
  };
}

// This parser combinator takes a string as input and returns a function that takes an input string.
// It uses the charParser function to create an array of parser functions, one for each character in the input string.
// It then iterates over the array of parsers, applying each parser to the remaining input string until either all parsers have been applied successfully or one of them fails.
// If all parsers succeed, it returns an object with the parsed string and the remaining input string.
// Otherwise, it returns null. 

// You can also combine parser combinators using the choice function to create parsers that can handle multiple input formats. For example:

function choice(...parsers) {
  return function(input) {
    for (let i = 0; i < parsers.length; i++) {
      const parser = parsers[i];
      const parseResult = parser(input);
      if (parseResult !== null) {
        return parseResult;
      }
    }
    return null;
  };
}


function numberParser(input) {
  const numberRegex = /^-?\d+(\.\d+)?/;
  const match = input.match(numberRegex);
  if (match) {
    return {
      result: parseFloat(match[0]),
      rest: input.slice(match[0].length)
    };
  } else {
    return null;
  }
}

// This parser combinator uses a regular expression to match a number at the beginning of the input string.
// If a number is found, it returns an object with the parsed number and the remaining input string.
// Otherwise, it returns null.

// You can combine this parser combinator with other parser combinators to create more complex parsers that can handle input formats that include numbers. For example:

function sumParser(input) {
  const leftParser = numberParser;
  const operatorParser = charParser('+');
  const rightParser = numberParser;
  const parseResultLeft = leftParser(input);
  if (parseResultLeft === null) {
    return null;
  }
  const parseResultOperator = operatorParser(parseResultLeft.rest);
  if (parseResultOperator === null) {
    return null;
  }
  const parseResultRight = rightParser(parseResultOperator.rest);
  if (parseResultRight === null) {
    return null;
  }
  return {
    result: parseResultLeft.result + parseResultRight.result,
    rest: parseResultRight.rest
  };
}



