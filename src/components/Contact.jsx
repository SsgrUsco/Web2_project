import styles from './Contact.module.css';
import { business } from '../data/business.js';

export default function Contact() {
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={`container ${styles.container}`}>
        <a className={styles.back} href="#inicio"><span uk-icon="arrow-left" aria-hidden="true" /> Volver al inicio</a>
        <header className={styles.heading}>
          <span className="eyebrow">ESTAMOS PARA ESCUCHARTE</span>
          <h1 id="contact-title">HABLEMOS <em>DE TU ANTOJO</em></h1>
          <p>¿Tienes una pregunta o una sugerencia? Nos gustaría conocerla.</p>
        </header>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span uk-icon="icon: mail; ratio: 1.3" aria-hidden="true" />
            <div><h2>Escríbenos</h2><p>{business.email}</p></div>
          </div>
          <div className={styles.infoItem}>
            <span uk-icon="icon: location; ratio: 1.3" aria-hidden="true" />
            <div>
              <h2>Visítanos</h2>
              <p>{business.city}</p>
              <p className={styles.muted}>{business.address}</p>
              <div className={styles.hours}><strong>{business.days}</strong><p>{business.hours}</p></div>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span uk-icon="icon: receiver; ratio: 1.3" aria-hidden="true" />
            <div><h2>Llámanos</h2><p>{business.phone}</p></div>
          </div>
        </div>

        <form className={`uk-form-stacked ${styles.form}`} aria-labelledby="contact-form-title" onSubmit={event => event.preventDefault()}>
          <div className={styles.formHeading}><h2 id="contact-form-title">Déjanos un mensaje</h2><p>Cuéntanos cómo podemos ayudarte.</p></div>
          <div className={styles.fields}>
            <div className={styles.fullWidth}>
              <label className="uk-form-label" htmlFor="contact-name">Nombre completo</label>
              <input className="uk-input" id="contact-name" name="name" autoComplete="name" placeholder="Tu nombre" maxLength={100} required />
            </div>
            <div>
              <label className="uk-form-label" htmlFor="contact-phone">Teléfono <span>(opcional)</span></label>
              <input className="uk-input" id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Tu número de contacto" maxLength={25} />
            </div>
            <div>
              <label className="uk-form-label" htmlFor="contact-email">Correo electrónico</label>
              <input className="uk-input" id="contact-email" name="email" type="email" autoComplete="email" placeholder="tu@correo.com" maxLength={254} required />
            </div>
            <div className={styles.fullWidth}>
              <label className="uk-form-label" htmlFor="contact-message">Mensaje</label>
              <textarea className="uk-textarea" id="contact-message" name="message" rows={4} placeholder="Escribe aquí tu pregunta o sugerencia…" maxLength={2000} required />
            </div>
          </div>
          <div className={styles.formFooter}>
            <button className="btn-primary" type="submit" disabled>Enviar mensaje <span uk-icon="arrow-right" aria-hidden="true" /></button>
          </div>
        </form>
      </div>
    </section>
  );
}
