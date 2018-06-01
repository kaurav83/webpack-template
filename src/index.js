import _ from 'lodash';

import $ from 'jquery';
import  './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const component = () => {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello world to fixed   RUFUS', 'webpack'], ' ');
    return element;
  }

document.getElementById('app')
    .appendChild(component());


    