import "./styles.sass";

const Button = ({ className, text, onClick }) => {
  return <button className={className} onClick={onClick}>{text}</button>;
};

export default Button;
