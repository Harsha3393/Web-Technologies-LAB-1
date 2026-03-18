let studentName = "Arun";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

const calculateTotal = (m1, m2, m3) => m1 + m2 + m3;
const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;

let total = calculateTotal(mark1, mark2, mark3);
let average = calculateAverage(mark1, mark2, mark3);

console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${total}`);
console.log(`Average Marks: ${average.toFixed(2)}`);
