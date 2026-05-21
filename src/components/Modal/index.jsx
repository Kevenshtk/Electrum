import { RiCloseLargeLine } from 'react-icons/ri';

import Button from '../Button';

import './styles.sass';

const Modal = ({ children, setShowModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <Button
          className="modal-close"
          text={<RiCloseLargeLine size={20} />}
          onClick={() => setShowModal(false)}
        />
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
