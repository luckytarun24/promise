// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Promise</h1>`;

{
  console.log('Promise 1 - start');
  const promise1 = new Promise((resolve, reject) => {
    console.log('Promise 1 -', 1);
  });
  console.log('Promise 1 - end', promise1);
}

{
  console.log('Promise 2 - start');
  const promise1 = new Promise((resolve, reject) => {
    console.log('Promise 2 -', 1);
    resolve(2);
  });
  promise1.then((res) => {
    console.log('Promise 2 -', res);
  });
  console.log('Promise 2 - end');
}
