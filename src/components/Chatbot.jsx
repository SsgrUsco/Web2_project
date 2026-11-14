import { useEffect, useRef, useState } from 'react';
import { getChatReply } from '../data/chatbot.js';
import styles from './Chatbot.module.css';

const suggestions = ['Ver menú', 'Horarios', 'Mi carrito'];

export default function Chatbot({ cart, onOpenCart, catalogState }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Bienvenido a Burger Zone. ¿En qué te puedo ayudar? Consulta el menú, tu carrito o información del local.' },
  ]);
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [open, messages]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function send(value) {
    const text = value.trim().slice(0, 500);
    if (!text) return;
    const reply = getChatReply(text, cart, catalogState.products, catalogState.status);
    setMessages(current => [...current, { role: 'user', text }, { role: 'assistant', ...reply }]);
    setDraft('');
    inputRef.current?.focus();
  }

  return (
    <div className={styles.widget}>
      {open && (
        <section
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
            <span className={styles.avatar} aria-hidden="true">B</span>
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
          <div className={styles.suggestions} aria-label="Preguntas rápidas">
            {suggestions.map(question => <button type="button" key={question} onClick={() => send(question)}>{question}</button>)}
          </div>
          <form className={styles.form} onSubmit={event => { event.preventDefault(); send(draft); }}>
            <label htmlFor="burger-chat-input" className="uk-hidden-visually">Tu mensaje</label>
            <input ref={inputRef} id="burger-chat-input" className="uk-input" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Escribe tu mensaje…" maxLength={500} autoComplete="off" />
            <button type="submit" disabled={!draft.trim()} aria-label="Enviar mensaje"><span uk-icon="arrow-right" aria-hidden="true" /></button>
          </form>
        </section>
      )}
      <button ref={launcherRef} type="button" className={styles.launcher} aria-expanded={open} aria-controls={open ? 'burger-chat' : undefined} onClick={() => open ? close() : setOpen(true)}>
        <span uk-icon={open ? 'close' : 'commenting'} aria-hidden="true" />
        {open ? 'Cerrar chat' : '¿Necesitas ayuda?'}
      </button>
    </div>
  );
}
