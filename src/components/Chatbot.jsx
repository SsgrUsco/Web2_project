import { useEffect, useRef, useState } from 'react';
import { getChatReply } from '../data/chatbot.js';
import styles from './Chatbot.module.css';
import ChatbotIcon from './ChatbotIcon.jsx';
import ChatSuggestions from './ChatSuggestions.jsx';
import { gsap } from '../lib/motion.js';

const suggestions = ['Recomiéndame un combo', 'Hasta 20 mil', 'Mi carrito', 'Horarios'];

export default function Chatbot({ cart, onOpenCart, catalogState }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Bienvenido a Burger Zone. ¿En qué te puedo ayudar? Consulta el menú, tu carrito o información del local.' },
  ]);
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const panelRef = useRef(null);
  const previousMessageCount = useRef(messages.length);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tween = gsap.to(panelRef.current, {
      autoAlpha: open ? 1 : 0,
      y: open || reduced ? 0 : 18,
      scale: open || reduced ? 1 : .96,
      duration: reduced ? 0 : open ? .32 : .2,
      ease: 'power2.out', overwrite: true,
      onComplete: () => { if (open) inputRef.current?.focus(); },
    });
    return () => tween.kill();
  }, [open]);

  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    const start = previousMessageCount.current;
    previousMessageCount.current = messages.length;
    if (!open || messages.length <= start || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const added = [...logRef.current.children].slice(start);
    const tween = gsap.fromTo(added, { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, duration: .28, stagger: .08,
      ease: 'power2.out', clearProps: 'opacity,transform',
    });
    return () => {
      tween.kill();
      gsap.set(added, { clearProps: 'opacity,transform' });
    };
  }, [open, messages]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function send(value) {
    const text = value.trim().slice(0, 500);
    if (!text) return;
    const reply = getChatReply(text, cart, catalogState.products, catalogState.status, messages);
    setMessages(current => [...current, { role: 'user', text }, { role: 'assistant', ...reply }]);
    setDraft('');
    inputRef.current?.focus();
  }

  return (
    <div className={styles.widget}>
        <section
          ref={panelRef}
          inert={!open}
          aria-hidden={!open}
          id="burger-chat"
          className={styles.panel}
          role="dialog"
          aria-labelledby="burger-chat-title"
          onKeyDown={event => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              close();
            }
          }}
        >
          <header className={styles.header}>
            <span className={styles.avatar}><ChatbotIcon /></span>
            <div>
              <h2 id="burger-chat-title">Burger Zone</h2>
              <p>Asistente virtual</p>
            </div>
            <button type="button" className={styles.close} onClick={close} aria-label="Cerrar chat">
              <span uk-icon="close" aria-hidden="true" />
            </button>
          </header>
          <div ref={logRef} className={styles.messages} role="log" aria-label="Conversación con el asistente" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${message.role === 'user' ? styles.user : styles.assistant}`}>
                <span className="uk-hidden-visually">{message.role === 'user' ? 'Tú' : 'Asistente'}: </span>
                <p>{message.text}</p>
                {message.action && (message.action.type === 'cart'
                  ? <button type="button" className={styles.action} onClick={() => { close(); onOpenCart(); }}>{message.action.label}</button>
                  : <a className={styles.action} href={message.action.href} onClick={close}>{message.action.label} <span uk-icon="icon: arrow-right; ratio: .8" aria-hidden="true" /></a>)}
              </div>
            ))}
          </div>
          <ChatSuggestions suggestions={suggestions} onSelect={send} chatOpen={open} />
          <form className={styles.form} onSubmit={event => { event.preventDefault(); send(draft); }}>
            <label htmlFor="burger-chat-input" className="uk-hidden-visually">Tu mensaje</label>
            <input ref={inputRef} id="burger-chat-input" className="uk-input" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Escribe tu mensaje…" maxLength={500} autoComplete="off" />
            <button type="submit" disabled={!draft.trim()} aria-label="Enviar mensaje"><span uk-icon="arrow-right" aria-hidden="true" /></button>
          </form>
        </section>
      <button ref={launcherRef} type="button" className={styles.launcher} aria-expanded={open} aria-controls={open ? 'burger-chat' : undefined} onClick={() => open ? close() : setOpen(true)}>
        {open ? (
          <svg key="close" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : <img key="assistant" src="/images/chatbot-assistant.svg" width="40" height="40" alt="" aria-hidden="true" draggable={false} />}
        <span className="uk-hidden-visually">{open ? 'Cerrar chat' : 'Abrir asistente de Burger Zone'}</span>
      </button>
    </div>
  );
}
