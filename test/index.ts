import Convert, { bit, B, KB, MB, GB, TB, SizeConvertFactory, ESizeType } from '../src/'

const myBaseFactory = SizeConvertFactory(ESizeType.KB, {base: 2, toFix: 2});

console.log("transformMB fixed default", myBaseFactory().MB());
console.log("transformMB fixed4", myBaseFactory().MB({toFix: 4}));
console.log("transformMB fixed4 readable false", myBaseFactory().MB({toFix: 4}).readable());

console.log('=====from 10 base=====');
const myTenBaseFactory = Convert.from('1MB', {base: 10});
console.log('from string to bit', myTenBaseFactory?.bit());
console.log('from string to B', myTenBaseFactory?.B());
console.log('from string to KB', myTenBaseFactory?.KB());
console.log('from string to MB', myTenBaseFactory?.MB());
console.log('from string to GB', myTenBaseFactory?.GB());
console.log('from string to TB', myTenBaseFactory?.TB());
console.log('=====from 10 base=====');

console.log('\n');

console.log('=====from 2 base=====');
const myTwoBaseFactory = Convert.from('1MB', {base: 2});
console.log('from string to bit', myTwoBaseFactory?.bit());
console.log('from string to B', myTwoBaseFactory?.B());
console.log('from string to KB', myTwoBaseFactory?.KB());
console.log('from string to MB', myTwoBaseFactory?.MB());
console.log('from string to GB', myTwoBaseFactory?.GB());
console.log('from string to TB', myTwoBaseFactory?.TB());
console.log('=====from 2 base=====');

console.log('\n');

console.log('=====Bit======');
const one_bit = Convert.from('1bit') || bit();
console.log('1 Bit to bit', one_bit.bit());
console.log('1 Bit to B', one_bit.B());
console.log('1 Bit to KB', one_bit.KB());
console.log('1 Bit to MB', one_bit.MB());
console.log('1 Bit to GB', one_bit.GB());
console.log('1 Bit to TB', one_bit.TB());
console.log('=====Bit======');

console.log('\n');

console.log('=====B======');
const oneB = Convert.from('1B') || B();
console.log('1 B to bit', oneB.bit());
console.log('1 B to B', oneB.B());
console.log('1 B to KB', oneB.KB());
console.log('1 B to MB', oneB.MB());
console.log('1 B to GB', oneB.GB());
console.log('1 B to TB', oneB.TB());
console.log('=====B======');

console.log('\n');

console.log('=====KB======');
const oneKB = Convert.from('1kB') || KB();
console.log('1 KB to bit', oneKB.bit());
console.log('1 KB to B', oneKB.B());
console.log('1 KB to KB', oneKB.KB());
console.log('1 KB to MB', oneKB.MB());
console.log('1 KB to GB', oneKB.GB());
console.log('1 KB to TB', oneKB.TB());
console.log('=====KB======');

console.log('\n');

console.log('=====MB======');
const oneMB = Convert.from('1mB')|| MB();
console.log('1 MB to bit', oneMB.bit());
console.log('1 MB to B', oneMB.B());
console.log('1 MB to KB', oneMB.KB());
console.log('1 MB to MB', oneMB.MB());
console.log('1 MB to GB', oneMB.GB());
console.log('1 MB to TB', oneMB.TB());
console.log('=====MB======');

console.log('\n');

console.log('=====GB======');
const oneGB = Convert.from('1GB') || GB();
console.log('1 GB to bit', oneGB.bit());
console.log('1 GB to B', oneGB.B());
console.log('1 GB to KB', oneGB.KB());
console.log('1 GB to MB', oneGB.MB());
console.log('1 GB to GB', oneGB.GB());
console.log('1 GB to TB', oneGB.TB());
console.log('=====GB======');

console.log('\n');

console.log('=====TB======');
const oneTB = Convert.from('1tB') || TB();
console.log('1 TB to bit', oneTB.bit());
console.log('1 TB to B', oneTB.B());
console.log('1 TB to KB', oneTB.KB());
console.log('1 TB to MB', oneTB.MB());
console.log('1 TB to GB', oneTB.GB());
console.log('1 TB to TB', oneTB.TB());
console.log('=====TB======');
