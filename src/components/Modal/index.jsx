import Button from '../Button';

import { RiCloseLargeLine } from "react-icons/ri";

import './styles.sass';

const Modal = ({ children, setShowModal }) => {
  return (
    <div className="containerModal">
      <div className="content">{children}</div>
      <Button className="btn-close-modal" text={<RiCloseLargeLine />} onClick={() => setShowModal(false)}/>
    </div>
  );
};

export default Modal;
