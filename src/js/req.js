var arr = ['str', 'app', 'str', 'two', 'cop', 'app'];

const a = arr.filter((el, i) => {
    return arr.indexOf(el) == i;
});

console.log(a);

var names = ['str', 'app', 'str', 'two', 'cop', 'app'];

var uniq = names.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
}, []);

console.log(uniq);
