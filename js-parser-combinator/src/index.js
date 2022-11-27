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

const Choice = next => parsers =>