import { RiCloseLargeLine } from "react-icons/ri";

import Button from '../Button';

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
