import _ from 'lodash'
import './style.css';


function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerHTML = 'next';
   // btn.onclick = Calendar.next();
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(btn);
    element.classList.add('hello');
    return element;
  }
  
  document.body.appendChild(component());