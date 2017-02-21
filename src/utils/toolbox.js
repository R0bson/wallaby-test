import * as R from 'ramda'
import {Maybe} from 'ramda-fantasy'

/**
 * @function curry
 * @returns function
 */
export const curry = R.curry
export const compose = R.compose
export const fromPairs = R.fromPairs
export const toUpper = R.toUpper
export const pipe = R.pipe
export const identity = R.identity
export const pick = R.pick
export const path = R.path
export const map = R.map
export const reject = R.reject
export const drop = R.drop
export const flatten = R.flatten
export const isEmpty = R.isEmpty
export const reduce = R.reduce
export const prop = R.prop
export const merge = R.merge
export const mapObjIndexed = R.mapObjIndexed
export const toPairs = R.toPairs
export const none = R.none
export const equals = R.equals
export const values = R.values
export const isArrayLike = R.isArrayLike
export const not = R.not
export const ifElse = R.ifElse
export const both = R.both
export const assoc = R.assoc
export const __ = R.__
export const min = R.min
export const max = R.max
export const filter = R.filter
export const all = R.all
export const isNil = R.isNil
export const is = R.is
export const toLower = R.toLower
export const over = R.over
export const lensIndex = R.lensIndex
export const join = R.join
export const split = R.split
export const head = R.head
export const replace = R.replace
export const sort = R.sort
export const sortBy = R.sortBy
export const minBy = R.minBy
export const any = R.any
export const prepend = R.prepend


export const mapIndexed = R.curry((fn, arr) => arr.map(fn))

export const sortStringsAsc = sort((c1, c2) => c1.localeCompare(c2))
export const sortStringsDesc = sort((c1, c2) => c2.localeCompare(c1))

export const trace = curry((msg, obj) => {
  console.log(msg, obj) // eslint-disable-line no-console
  return obj
})

// List a -> List a
export const removeEmptyElements = reject(isEmpty)

export const dropFirst = drop(1)

export const removeNotExistingElements = reject(e => !e)

export const convertObjectToArrayDroppingEmpty =
  compose(
    removeNotExistingElements,
    removeEmptyElements,
    flatten,
    map(dropFirst),
    toPairs
  )

//export const log = console.log.bind(console)

export const toPack = curry((name, obj) => ({ [name]: obj }))

export const pack = curry((name, f, obj) => Object.assign({}, obj, { [name]: f(obj) }))

export const now = Date.now


export const handleError = curry((msg, reason) => {
  console.error(msg, reason)
  return reason
})

export const randomId = time => time.toString().concat('_').concat(Math.floor(Math.random() * 1000000))




export const reduceByKey = key => (acc, value) => Object.assign({}, acc, { [value[key]]: value })

// String -> List a -> Object
export const listToObjectBy = curry((key, list) => reduce(reduceByKey(key), {}, list))

export const addField = curry((field, mapper, list) => map(el => ({ ...el, [field]: mapper(el) }), list))
export const equalsId = curry((value, _) => equals(value, _.id))


const maybePath = curry((pathArr, obj) => {
  const val = path(pathArr, obj)
  //return val ? Maybe.of(val) : Maybe.Nothing
  return val ? Maybe.of(val) : Maybe.Nothing()
})

export const maybeGetOrUndefined = maybe => maybe.getOrElse(undefined)
export const safePathAndTransform = curry(
  (pathArr, transformation) => pipe(
    maybePath(pathArr),
    map(transformation),
    maybeGetOrUndefined,
  )
)

export const safeHead = list => (list.length > 0) ? head(list) : undefined
export const noop = () => undefined
