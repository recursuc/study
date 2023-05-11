class Failure {
    type = "failure";
    constructor(public input: string, public message: string) {}
  }
  
  class Success<T> {
    type = "success";
    constructor(public result: T, public input: string) {}
  }
  

export class Parser {
    static Result = val => new Parser(input => [[val, input]])

    static Zero = () => new Parser(() => [])

    // parseFn = input => [[recognized, remaining]]
    constructor(parseFn, next) {
        this.next = next
        this.parse = parseFn
    }

    bind = fn =>
        new Parser(input =>
            this.parse(input).flatMap(
                val => fn(val[0]).parse(val[1])
            )
        )

    map = fn =>
        new Parser(input =>
            this.parse(input).map(
                val => [fn(val[0]), val[1]]
            )
        )

    sat = predicate =>
        this.bind(recognized => predicate(recognized) ? Parser.Result(recognized) : Parser.Zero())

    plus = parser =>
        new Parser(input => this.parse(input).concat(parser.parse(input)))

    then = parser => {
        new Parser(input => this.parse(input).concat(parser.parse(input)))
    }
}


export const or = (...parsers) =>
    new Parser(input => {
        for (const parser of parsers) {
            const r1 = parser.parse(input)
            if (r1.length) {
                return r1
            }
        }

        return []
    })

export const and = (...parsers) =>
    new Parser(input => {
        let res = [[[], input]]
        for (const parser of parsers) {
            res = res.flatMap(([prevVal, prevInput]) => {
                const r1 = parser.parse(prevInput)
                if (!r1.length) {
                    return []
                }

                return r1.map(([currentVal, currentInput]) => [prevVal.concat(currentVal), currentInput])
            })

            if (!res.length) {
                return []
            }
        }

        return res
    })

export const many = parsers =>
    new Parser(input => {
        let res = []
        for (const parser of parsers) {
            const r1 = parser.parse(input)
            if (!r1.length) {
                return []
            }

            res = res.concat(r1)
        }

        return res
    })


function sequence<T>(...parsers: Parser<T>[]): Parser<T[]> {
    return (input: string) => {
        let result = [];
        for (let parser of parsers) {
        let r = parser(input);
        if (r instanceof Failure) {
            return r;
        }
        input = r.input;
        result.push(r.result);
        }
        return new Success(result, input);
    };
}

function choice<T>(...parsers: Parser<T>[]): Parser<T> {
    return (input: string) => {
        for (let parser of parsers) {
        let r = parser(input);
        if (r instanceof Success) {
            return r;
        }
        }
        return new Failure('Choice failed', input);
    };
}

function map<T, U>(parser: Parser<T>, f: (value: T) => U): Parser<U> {
    return (input: string) => {
        let r = parser(input);
        if (r instanceof Success) {
        return new Success(f(r.result), r.input);
        }
        return r;
    };
}

function many<T>(parser: Parser<T>): Parser<T[]> {
    return (input: string) => {
        let result = [];
        while (true) {
            let r = parser(input);
            if (r instanceof Success) {
                input = r.input;
                result.push(r.result);
            } else {
                break;
            }
        }
        return new Success(result, input);
    };
}

function optional<T>(parser: Parser<T>, defaultValue: T): Parser<T> {
    return (input: string) => {
        let r = parser(input);
        if (r instanceof Success) {
        return r;
        }
        return new Success(defaultValue, input);
    };
}    
    
function between(left: Parser<U>, parser: Parser<T>, right: Parser<V>): Parser<T> {
    return (input: string) => {
        const r1 = left(input);
        if (r1 instanceof Failure) {
        return r1;
        }
        const r2 = parser(r1.input);
        if (r2 instanceof Failure) {
        return r2;
        }
        const r3 = right(r2.input);
        if (r3 instanceof Failure) {
        return r3;
        }
        return new Success(r2.result, r3.input);
    };
}

function sepBy<T, U>(parser: Parser<T>, separator: Parser<U>): Parser<T[]> {
    return (input: string) => {
      const result = [];
      const r = parser(input);
      if (r instanceof Failure) {
        return new Success(result, input);
      }
      let nextInput = r.input;
      result.push(r.result);
      while (true) {
        const r = separator(nextInput);
        if (r instanceof Failure) {
          break;
        }
        nextInput = r.input;
        const r2 = parser(nextInput);
        if (r2 instanceof Failure) {
          break;
        }
        nextInput = r2.input;
        result.push(r2.result);
      }
      return new Success(result, nextInput);
    };
  }