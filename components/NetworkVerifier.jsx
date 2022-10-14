import {Alert, Snackbar} from '@mui/material';
import React, {useEffect, useState} from 'react';

export default function NetworkVerifier() {
  const [currentChain, setCurrentChain] = useState(0);
  const vertical = 'top';
  const horizontal = 'right';

  useEffect(() => {
    function verifyEthereum() {
      if (window.ethereum) {
        setCurrentChain(parseInt(window.ethereum.chainId));
        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload();
        });
      }
    }

    setTimeout(verifyEthereum, 3100);
  }, []);

  return (
    <>
      {currentChain !== 0 && currentChain !== 43114 ? (
        <Snackbar open style={{marginTop: '80px'}} anchorOrigin={{vertical, horizontal}}>
          <Alert severity="warning" sx={{width: '100%'}}>
            Switch to Avalanche Network
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};
