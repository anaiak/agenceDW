import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAIL_SERVICE_ID = 'service_phh8eqg';
const EMAIL_TEMPLATE_ID = 'template_9fyodtg';
const EMAIL_PUBLIC_KEY = 'U8hV-pNs7SUXzDZ-1';

const ContactSection = styled.section`
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  padding: 15vh 5vw;
  position: relative;

  @media (max-width: 768px) {
    padding: 10vh 4vw;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 100;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 10vh;
  line-height: 0.8;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: #ffffff;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    font-size: clamp(3rem, 8vw, 6rem);
    margin-bottom: 6vh;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    gap: 4rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FormSection = styled.div`
  position: relative;
`;

const ContactForm = styled(motion.form)`
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 3rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-left: 2px solid #ffffff;
    border-top: 2px solid #ffffff;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const Label = styled.label`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  padding: 1rem 0;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-bottom-color: #ffffff;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-family: 'JetBrains Mono', monospace;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  padding: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #ffffff;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-family: 'JetBrains Mono', monospace;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 1rem 3rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    background: #000000;
    color: #ffffff;
    box-shadow: inset 0 0 0 2px #ffffff;
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:disabled:hover {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.6);
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.8rem 2rem;
    font-size: 0.8rem;
  }
`;

const InfoSection = styled.div`
  position: relative;
`;

const InfoCard = styled(motion.div)`
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 3rem;
  margin-bottom: 3rem;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

const InfoTitle = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ContactLink = styled.a`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  cursor: none;
  transition: all 0.3s ease;
  
  &:hover {
    text-shadow: 2px 2px 0 #ffffff;
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const SocialLink = styled(motion.a)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.8rem 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ffffff;
    color: #000000;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.6rem 1rem;
  }
`;

const ResponseMessage = styled(motion.div)<{ type: 'success' | 'error' }>`
  background: ${props => props.type === 'success' 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 0, 0, 0.1)'
  };
  color: ${props => props.type === 'success' ? '#000000' : '#ffffff'};
  border: 2px solid ${props => props.type === 'success' ? '#ffffff' : '#ff0000'};
  padding: 1.5rem;
  margin-top: 2rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '${props => props.type === 'success' ? '✓' : '✗'}';
    position: absolute;
    top: -10px;
    left: 20px;
    background: ${props => props.type === 'success' ? '#ffffff' : '#ff0000'};
    color: ${props => props.type === 'success' ? '#000000' : '#ffffff'};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }
  
  ${props => props.type === 'success' && `
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  `}
  
  ${props => props.type === 'error' && `
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
  `}

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.75rem;
    margin-top: 1.5rem;
  }
`;

const budgetOptions = [
  '',
  '< 2 000 €',
  '2 000 – 5 000 €',
  '5 000 – 10 000 €',
  '> 10 000 €'
];

const siteTypeOptions = [
  '',
  'Vitrine',
  'E-commerce',
  'Portfolio',
  'Éditorial',
  'Application',
  'Expérimental'
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '',
    siteType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);
    
    try {
      // Initialiser EmailJS avec la clé publique
      emailjs.init(EMAIL_PUBLIC_KEY);
      
      // Préparer les données du template avec date/heure automatiques
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Non précisée',
        phone: formData.phone || 'Non précisé',
        budget: formData.budget || 'Non précisé',
        site_type: formData.siteType || 'Non précisé',
        message: formData.message,
        date: new Date().toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        }),
        time: new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        to_email: 'ferrerrehugo974@gmail.com', // Email de destination
      };

      console.log('Envoi des données:', templateParams);

      // Envoyer l'email via EmailJS
      const result = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        templateParams
      );

      console.log('Email envoyé avec succès:', result);
      
      setResponseMessage({
        text: 'MESSAGE ENVOYÉ AVEC SUCCÈS - Nous vous recontacterons sous 24h',
        type: 'success'
      });
      
      // Réinitialiser le formulaire
      setFormData({ name: '', email: '', company: '', phone: '', budget: '', siteType: '', message: '' });
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      
      setResponseMessage({
        text: 'ERREUR D\'ENVOI - Veuillez réessayer ou nous contacter directement',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
      
      // Effacer le message après 7 secondes
      setTimeout(() => setResponseMessage(null), 7000);
    }
  };

  const contactInfo = [
    // Informations de contact supprimées sur demande
  ];

  const socialLinks = [
    { name: "GITHUB", href: "#" },
    { name: "LINKEDIN", href: "#" },
    { name: "TWITTER", href: "#" },
    { name: "INSTAGRAM", href: "#" }
  ];

  return (
    <ContactSection id="contact" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        CONTACT
      </SectionTitle>

      <ContentGrid>
        <FormSection>
          <ContactForm
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <FormGroup>
              <Label htmlFor="name">NOM *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="VOTRE NOM"
                required
                disabled={isSubmitting}
                data-cursor="hover"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">EMAIL *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="VOTRE@EMAIL.COM"
                required
                disabled={isSubmitting}
                data-cursor="hover"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="company">ENTREPRISE</Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="VOTRE ENTREPRISE"
                disabled={isSubmitting}
                data-cursor="hover"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">TÉLÉPHONE</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+33 6 12 34 56 78"
                disabled={isSubmitting}
                data-cursor="hover"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="budget">BUDGET / PRIX PAR TRANCHE</Label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  padding: '1rem 0',
                  outline: 'none',
                  marginBottom: '0.5rem',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
                data-cursor="hover"
              >
                {budgetOptions.map((option, idx) => (
                  <option key={idx} value={option} style={{ color: '#000', background: '#fff' }}>
                    {option === '' ? 'Sélectionnez une tranche' : option}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="siteType">TYPE DE SITE SOUHAITÉ</Label>
              <select
                id="siteType"
                name="siteType"
                value={formData.siteType}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  padding: '1rem 0',
                  outline: 'none',
                  marginBottom: '0.5rem',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
                data-cursor="hover"
              >
                {siteTypeOptions.map((option, idx) => (
                  <option key={idx} value={option} style={{ color: '#000', background: '#fff' }}>
                    {option === '' ? 'Sélectionnez un type' : option}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">MESSAGE *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="DÉCRIVEZ VOTRE PROJET..."
                required
                disabled={isSubmitting}
                data-cursor="hover"
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              data-cursor="hover"
            >
              {isSubmitting ? 'TRANSMISSION EN COURS...' : 'TRANSMETTRE'}
            </SubmitButton>

            {responseMessage && (
              <ResponseMessage
                type={responseMessage.type}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {responseMessage.text}
              </ResponseMessage>
            )}
          </ContactForm>
        </FormSection>

        <InfoSection>
          {contactInfo.map((info, index) => (
            <InfoCard
              key={info.title}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              data-cursor="hover"
            >
              <InfoTitle className="text-fragmented">{info.title}</InfoTitle>
              <InfoText>{info.text}</InfoText>
              <ContactLink 
                href={info.href}
                className="accent-micro"
                data-cursor="hover"
              >
                {info.link}
              </ContactLink>
            </InfoCard>
          ))}

          <SocialLinks>
            {socialLinks.map((social, index) => (
              <SocialLink
                key={social.name}
                href={social.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                data-cursor="hover"
              >
                {social.name}
              </SocialLink>
            ))}
          </SocialLinks>
        </InfoSection>
      </ContentGrid>
    </ContactSection>
  );
};

export default Contact; 