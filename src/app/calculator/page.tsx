'use client';
import React, { useState } from 'react';

const buttons: { label: string; value: string; type?: 'operator' | 'clear' | 'equal' }[] = [
  { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '/', value: '/', type: 'operator' },
  { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '*', value: '*', type: 'operator' },
  { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '-', value: '-', type: 'operator' },
  { label: '0', value: '0' }, { label: '.', value: '.' }, { label: 'C', value: 'C', type: 'clear' }, { label: '+', value: '+', type: 'operator' },
  { label: '=', value: '=', type: 'equal' },
];

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onButton = (val: string) => {
    if (val === 'C') {
      setInput('');
      setError(false);
      return;
    }
    if (val === '=') {
      if (!input.trim()) return;
      try {
        // Simple eval; replace or sandbox for production.
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${input})`)();
        setInput(String(result));
        setError(false);
      } catch {
        setError(true);
      }
      return;
    }
    setInput(prev => prev + val);
    setError(false);
  };

  return (
    <div className="page">
      <div className="container" draggable>
        <h1>Calculator</h1>
        <div className={`display ${error ? 'error' : ''}`} aria-live="polite">
          {error ? 'Error' : input || '\u00A0'}
        </div>
        <div className="buttons">
          {buttons.map(b => (
            <button
              key={b.label + b.value}
              onClick={() => onButton(b.value)}
              className={[
                b.type === 'operator' ? 'operator' : '',
                b.type === 'clear' ? 'clear' : '',
                b.type === 'equal' ? 'equal' : '',
              ].filter(Boolean).join(' ')}
              style={b.type === 'equal' ? { gridColumn: 'span 4' } : undefined}
              aria-label={b.label}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .page {
          background:#f0f0f0;
          font-family:Arial, sans-serif;
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          margin:0;
        }
        .container {
          width:300px;
          background:#110707;
          border-radius:10px;
          padding:20px;
          box-shadow:0 4px 10px rgba(0,0,0,0.3);
        }
        h1 {
          text-align:center;
          color:#fff;
          margin:0 0 20px;
        }
        .display {
          background:#3ed43e;
          border:2px solid rgb(72,34,211);
          padding:10px;
          margin-bottom:15px;
          font-size:24px;
          text-align:right;
          min-height:40px;
          color:#000;
          border-radius:5px;
          overflow:hidden;
          word-break:break-all;
        }
        .display.error {
          background:#ff3b30;
          color:#fff;
        }
        .buttons {
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:10px;
        }
        button {
          padding:15px;
          font-size:18px;
          border:none;
          border-radius:5px;
          cursor:pointer;
          background:#555;
          color:#fff;
          transition:background .2s;
        }
        button:hover { background:#777; }
        button.operator { background:#ff9500; }
        button.operator:hover { background:#ffa733; }
        button.clear { background:#ff3b30; }
        button.clear:hover { background:#ff6158; }
        button.equal { background:#3a7afe; }
        button.equal:hover { background:#5a8cff; }
      `}</style>
    </div>
  );
};

export default Calculator;