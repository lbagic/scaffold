import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const _stringify = JSON.stringify;
JSON.stringify = (value, replacer, space) =>
  _stringify(
    value,
    (k, v) => (typeof v === 'bigint' ? v.toString() + 'n' : v),
    space
  );

const _parse = JSON.parse;
JSON.parse = value =>
  _parse(value, (k, v) =>
    typeof v === 'string' && /^\d+n$/.test(v)
      ? BigInt(v.substr(0, v.length - 1))
      : v
  );

createRoot(document.getElementById('root')).render(<App />);
