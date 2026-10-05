import logoSource from '../assets/images/baithak-logo.png';

function Logo({ className = '' }) {
  const classes = ['brand-logo', className].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      <img src={logoSource} alt="Baithak" decoding="async" />
    </span>
  );
}

export default Logo;
