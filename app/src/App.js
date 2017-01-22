import React from 'react';

import ChessBoard from './chess-board';
import FenForm from './fen-form';
import Controls from './controls';


const App = () => (
  <div>
    <ChessBoard />
    <Controls />
    <FenForm />
  </div>
);

export default App;
