import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import './Contact.scss';

export function Contact() {
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    const phrases = ['ssh hello@px_dev.sys', 'initializing handshake...', 'waiting for user input...'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 150;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      timeout = setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="contact-view">
      <div className="contact-container container">
        {/* Terminal Section */}
        <div className="terminal-section">
          <div className="terminal-header">
            <h1 className="font-headline-lg text-primary tracking-tight uppercase">
              // GET_IN_TOUCH
            </h1>
            <div className="window-controls">
              <div className="control-dot bg-secondary-container"></div>
              <div className="control-dot bg-surface-variant"></div>
              <div className="control-dot bg-primary"></div>
            </div>
          </div>
          
          <div className="terminal-body font-label-mono">
            <p className="text-on-surface-variant"><span className="text-secondary">SYSTEM:</span> INITIALIZING SECURE_CHANNEL.EXE...</p>
            <p className="text-on-surface-variant"><span className="text-secondary">STATUS:</span> READY_FOR_INPUT</p>
            
            <div className="contact-links">
              <div className="link-item group">
                <span className="indicator-box bg-primary"></span>
                <span className="text-outline">01</span>
                <span className="text-primary font-bold">EMAIL:</span>
                <span className="text-on-surface">HELLO@PX_DEV.SYS</span>
              </div>
              <div className="link-item group">
                <span className="indicator-box border-outline"></span>
                <span className="text-outline">02</span>
                <span className="text-primary font-bold">GITHUB:</span>
                <span className="text-on-surface">/PX_ARCHITECT_ROOT</span>
              </div>
              <div className="link-item group">
                <span className="indicator-box border-outline"></span>
                <span className="text-outline">03</span>
                <span className="text-primary font-bold">LINKEDIN:</span>
                <span className="text-on-surface">/IN/PIXEL-DEVELOPER</span>
              </div>
            </div>
          </div>

          <div className="terminal-footer">
            <div className="prompt font-label-mono text-primary terminal-cursor">
              root@px_dev:~$ <span className="text-on-surface">{typedText}</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-card">
            <h3 className="font-label-mono text-primary flex items-center">
              <span className="material-symbols-outlined icon">edit</span>
              MESSAGE_ENTRY
            </h3>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="font-label-mono uppercase">User_Identity</label>
                <input type="text" placeholder="NAME" className="font-label-mono" />
              </div>
              <div className="form-group">
                <label className="font-label-mono uppercase">Return_Path</label>
                <input type="email" placeholder="EMAIL@DOMAIN.COM" className="font-label-mono" />
              </div>
              <div className="form-group">
                <label className="font-label-mono uppercase">Payload_Body</label>
                <textarea rows={4} placeholder="ENTER_MESSAGE..." className="font-label-mono"></textarea>
              </div>
              <Button type="submit" variant="primary" fullWidth>
                CONNECT
              </Button>
            </form>
          </div>

          {/* Extra Visual Pixel Detail */}
          <div className="pixel-detail-card">
            <div className="bars">
              <div className="bar opacity-100"></div>
              <div className="bar opacity-80"></div>
              <div className="bar opacity-60"></div>
              <div className="bar opacity-40"></div>
              <div className="bar opacity-20"></div>
            </div>
            <div className="stats text-right">
              <div className="font-label-mono text-primary">LATENCY: 12ms</div>
              <div className="font-label-mono text-primary">ENCRYPT: AES-256</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Detail */}
      <div className="corner-detail font-label-mono text-outline">
        <span>©2024 ARCH_NULL_POINTER</span>
        <span>VER: 4.0.1_STABLE</span>
      </div>
    </div>
  );
}
