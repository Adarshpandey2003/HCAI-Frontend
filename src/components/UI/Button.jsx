// src/components/UI/Button.jsx
import { Link } from 'react-router-dom';

export default function Button({ to, variant = 'solid', children }) {
  const base = 'inline-block px-6 py-3 font-medium rounded-md transition';
  const styles = variant === 'outline'
    ? `${base} border-2 border-white text-white hover:bg-white hover:text-black`
    : `${base} bg-violet-300 text-white hover:bg-violet-400`;

  return to
    ? <Link to={to} className={styles}>{children}</Link>
    : <button className={styles}>{children}</button>;
}
