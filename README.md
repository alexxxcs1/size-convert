# Easy way to size convert

<!-- # INSTALL
NOT PUBLISH
```
npm i @cxug/size-convert
```
or
```
yarn add @cxug/size-convert
``` -->

# USAGE

```
import Convert, { bit, B, KB, MB, GB, TB, SizeConvertFactory, ESizeType } from '../src/'
```

## default covert calculate base 2
```
//get 1MB convert to KB
MB().KB();  // 1024

//get 1MB convert to GB fixed
// if toFix is true ,use Number.toFixed(2) to parse number
MB().GB({toFix: true})  // 0

// if toFix is number ,use Number.toFixed(number) to parse number
MB().GB({toFix: 5});  // 0.00098

// if toFix is function ,use arg's function to to parse number
MB().GB({toFix: (v: number) => {
    return v.toFixed(10);
}});  // 0.0009765625

//get 1MB convert to KB readable
MB().KB().readable();  // 1024KB

// get 120.2KB convert to Byte
KB(120.2).B();  // 123084.8

```

## covert calculate base 10
```
// create a convert base KB and calculate base 10
// factory will set all result toFixed(2) and return readable value [string];
const tenBaseKB = SizeConvertFactory(ESizeType.KB, {base: 10, toFix: 2}).readable();

// 1KB to B
tenBaseKB().B() // "1024"

// 1KB to MB and replace global toFix conffig
tenBaseKB().MB({toFix: 4}))

```

## don't want to check string size value type ?

```
Convert.from('1MB');    // MB(1)

Convert.from('1.2');    // MB(1.2)

Convert.from('1.2.123MB');    // error: undefine

Convert.from('1MB', {base: 10}) // SizeConvertFactory(ESizeType.MB, {base: 10});

const value = Convert.from('1MB')?.KB() // safe transform 1MB to KB on typescript;

```