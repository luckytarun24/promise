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

{
  const promise8 = new Promise((resolve, reject) => {
    console.log('Promise 8 - ', 1);
    resolve('Promise 8 -  success');
  });
  promise8
    .then(() => {
      console.log('then 1');
      throw 'error';
    })
    .then(() => {
      console.log('then 2');
    })
    .then(() => {
      console.log('then 3');
    })
    .then(() => {
      console.log('then 4');
    })
    .catch(() => {
      console.log('catch 1');
    })
    .finally(() => {
      console.log('finally 1');
    })
    .then(() => {
      console.log('then 5');
    });
}

const promise1 = () =>
  new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = () =>
  new Promise((resolve) => setTimeout(() => resolve(2), 2000));
const promise3 = () =>
  new Promise((resolve) => setTimeout(() => resolve(3), 3000));

const arr = [promise1, promise2, promise3];

Array.prototype.myAll = function () {
  return new Promise((resolve, reject) => {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      this[i]()
        .then((res) => {
          result.push(res);
          if (result.length === this.length) {
            resolve(result);
          }
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};

Array.prototype.myAllSettled = function () {
  return new Promise((resolve, reject) => {
    const result = [];
    let settledCount = 0;

    for (let i = 0; i < this.length; i++) {
      this[i]().then(
        (res) => {
          result[i] = { status: 'fulfilled', value: res };
          settledCount++;
          if (settledCount === this.length) {
            resolve(result);
          }
        },
        (e) => {
          result[i] = { status: 'rejected', reason: e };
          settledCount++;
          if (settledCount === this.length) {
            resolve(result);
          }
        }
      );
    }
  });
};

Array.prototype.myAny = function () {
  return new Promise((resolve, reject) => {
    let settledCount = 0;

    for (let i = 0; i < this.length; i++) {
      this[i]()
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          settledCount++;
          if (settledCount === this.length) {
            reject(new Error('All promises were rejected'));
          }
        });
    }
  });
};

Array.prototype.myRace = function () {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < this.length; i++) {
      this[i]()
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};

// Test
arr
  .myAll()
  .then((result) => {
    console.log(result); // Output: [1, 2, 3]
  })
  .catch((e) => {
    console.error(e);
  });
