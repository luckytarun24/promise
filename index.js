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
  const promise2 = new Promise((resolve, reject) => {
    console.log('Promise 2 -', 1);
    resolve(2);
  });
  promise2.then((res) => {
    console.log('Promise 2 -', res);
  });
  console.log('Promise 2 - end');
}

{
  console.log('Promise 3 - start');
  const promise3 = new Promise((resolve, reject) => {
    console.log('Promise 3 -', 1);
    resolve(2);
    console.log('Promise 3 -', 3);
  });
  promise3.then((res) => {
    console.log('Promise 3 -', res);
  });
  console.log('Promise 3 - end');
}
{
  console.log('Promise 4 - start');
  const promise4 = new Promise((resolve, reject) => {
    console.log('Promise 4 - ', 1);
  });
  promise4.then((res) => {
    //Cursor will never come here because promise never resolve or reject. so it will in pending state.
    console.log('Promise 4 - ', 2);
  });
  console.log('Promise 4 - end', promise4);
}

{
  console.log('Promise 5 - start');
  const fn = () =>
    new Promise((resolve, reject) => {
      console.log('Promise 5 - ', 1);
      resolve('success');
    });
  console.log('Promise 5 - middle');
  fn().then((res) => {
    console.log('Promise 5 - ', res);
  });

  console.log('Promise 5 - end');
}

{
  console.log('Promise 6 - start');
  setTimeout(() => {
    console.log('Promise 6 - setTimeout');
  });
  Promise.resolve().then(() => {
    console.log('Promise 6 - resolve');
  });
  console.log('Promise 6 - end');
}

{
  const promise7 = new Promise((resolve, reject) => {
    console.log('Promise 7 - ', 1);
    setTimeout(() => {
      console.log('Promise 7 - timer start');
      resolve('Promise 7 -  success');
      console.log('Promise 7 -  timer end');
    }, 0);
    console.log('Promise 7 - ', 2);
  });
  promise7.then((res) => {
    console.log('Promise 7 - ', res);
  });
  console.log('Promise 7 - ', 4);
}
