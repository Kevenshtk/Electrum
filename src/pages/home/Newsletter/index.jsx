import Button from '../../../components/Button';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import alert from '../../../utils/alert.js';

import './styles.sass';

const socialMedia = [
  {
    id: 1,
    href: 'https://www.facebook.com/',
    Icon: FaFacebookF,
  },
  {
    id: 2,
    href: 'https://www.instagram.com/',
    Icon: FaInstagram,
  },
  {
    id: 3,
    href: 'https://x.com/',
    Icon: FaTwitter,
  },
];

const Newsletter = () => {
  return (
    <section className="newsletter-container">
      <h2>
        Assine a nossa <span>Newsletter</span>
      </h2>
      <div>
        <input type="email" placeholder="Digite o seu e-mail" required />
        <Button
          className="btn btn-half"
          text="Assinar"
          onClick={alert.unavailable}
        />
      </div>
      <div className="social-media">
        {socialMedia.map(({ id, href, Icon }) => (
          <a key={id} href={href} target="_blank" rel="noopener noreferrer">
            <Icon className="icon" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Newsletter;
