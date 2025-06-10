import { Controller } from 'react-hook-form';

import './styles.sass';

const Input = ({ name, label, className, control, render }) => {

  return (
    <div className={className}>
      <label htmlFor={name}>{label}:</label>
      <Controller name={name} control={control} render={render} />
    </div>
  );
};

export default Input;
