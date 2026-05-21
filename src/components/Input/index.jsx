import { Controller } from 'react-hook-form';

import './styles.sass';

const Input = ({
  name,
  label,
  className,
  control,
  type = 'text',
  placeholder,
  errors,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}:</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="containerInputError">
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
            />

            <span className="error">
              {errors?.[name]?.message}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default Input;
