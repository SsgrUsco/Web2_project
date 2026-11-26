import { useEffect, useRef, useState } from 'react';
import styles from './Chatbot.module.css';

export default function ChatSuggestions({ suggestions, onSelect, chatOpen }) {
  const [expanded, setExpanded] = useState(false);
  const wrapper = useRef(null);
  const trigger = useRef(null);
  const visible = expanded && chatOpen;

  useEffect(() => {
    if (!visible) return;
    const dismiss = event => {
      if (!wrapper.current?.contains(event.target)) setExpanded(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [visible]);

  return (
    <div ref={wrapper} className={styles.suggestions}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}
      onKeyDown={event => {
        if (event.key === 'Escape' && visible) {
          event.stopPropagation();
          setExpanded(false);
          trigger.current?.focus();
        }
      }}>
      <button ref={trigger} type="button" className={styles.suggestionsToggle}
        aria-expanded={visible} aria-controls="chat-suggestions"
        onClick={() => setExpanded(!visible)}>
        Preguntas rápidas
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transform: visible ? 'rotate(180deg)' : undefined }}>
          <path d="m4 10 4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {visible && <div id="chat-suggestions" className={styles.suggestionsPopup} role="group" aria-label="Mensajes sugeridos">
        {suggestions.map(question => <button type="button" key={question} onClick={() => { setExpanded(false); onSelect(question); }}>{question}</button>)}
      </div>}
    </div>
  );
}
