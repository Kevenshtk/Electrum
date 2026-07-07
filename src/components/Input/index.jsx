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
            <input id={name} type={type} placeholder={placeholder} {...field} />

            <span className="error">{errors?.[name]?.message}</span>
          </div>
        )}
      />
    </div>
  );
};

const Select = ({ label, name, className, control, options, errors }) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}:</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="containerInputError">
            <select id={name} {...field}>
              {options}
            </select>

            <span className="error">{errors?.[name]?.message}</span>
          </div>
        )}
      />
    </div>
  );
};

const TextArea = ({ label, name, className, control, errors }) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}:</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="containerInputError">
            <textarea id={name} rows="5" {...field}></textarea>

            <span className="error">{errors?.[name]?.message}</span>
          </div>
        )}
      />
    </div>
  );
};

const InputRounded = ({ type, className, placeholder }) => {
  return (
    <input
      type={type}
      className={`inputRounded ${className || ''}`}
      placeholder={placeholder}
      required
    />
  );
};

export { Input, InputRounded, Select, TextArea };
