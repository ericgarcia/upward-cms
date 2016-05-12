import React from 'react';
import ReactDOM from 'react-dom';
import SimpleTable from './components/SimpleTable';

function render(element, elementID) {
  ReactDOM.render( element, document.getElementById(elementID) );
}


render(<SimpleTable source='/api/resources'/>, 'simpleTable');
