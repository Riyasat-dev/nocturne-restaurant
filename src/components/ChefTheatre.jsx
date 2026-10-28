import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ChefHat, Flame, Sparkles } from "lucide-react";
import "./ChefTheatre.css";

const creations = [
  {
    number: "01",
    name: "The Signature Steak",
    description:
      "A beautifully seared steak finished with aromatic herbs and a rich house sauce.",
    tag: "CHEF'S SIGNATURE",
  },
  {
    number: "02",
    name: "Ember-Roasted Salmon",
    description:
      "Delicate salmon with roasted seasonal vegetables and a bright citrus finish.",
    tag: "FROM THE FIRE",
  },
  {
    number: "03",
    name: "Midnight Chocolate",
    description:
      "An indulgent dark chocolate creation with a silky, velvety finish.",
    tag: "SWEET FINALE",
  },
];

export default function ChefTheatre({ onExploreMenu }) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle("chef-visible", entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="chef-theatre" ref={sectionRef}>
      <div className="chef-atmosphere" aria-hidden="true">
        <div className="chef-glow" />
        <div className="chef-glow chef-glow-two" />
        <div className="chef-grid" />
      </div>

      <header className="chef-nav">
        {/* <button className="chef-back" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>BACK TO DINING</span>
        </button> */}

        {/* <span className="chef-brand">NOCTURNE</span> */}

        {/* <span className="chef-nav-label">THE KITCHEN</span> */}
      </header>

      <div className="chef-hero">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="chef-intro"
        >
          <span className="chef-eyebrow">
            <Flame size={15} />
            THE ART OF FIRE
          </span>

          <h1>
            Where Craft
            <br />
            Meets <em>Flavour.</em>
          </h1>

          <p>
            Every creation begins with a spark. Step into our kitchen, where
            patience, precision, and passion transform ingredients into an
            experience.
          </p>

          <button className="chef-primary" onClick={onExploreMenu}>
            EXPLORE OUR MENU
            <ArrowDown size={16} />
          </button>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="chef-artwork"
          role="img"
          aria-label="Abstract glowing fire representing the restaurant's open kitchen"
        >
          <div className="chef-orbit chef-orbit-one" />
          <div className="chef-orbit chef-orbit-two" />
          <div className="chef-fire">
            <Flame size={100} strokeWidth={0.8} />
          </div>
          <span className="chef-artwork-caption">
            MADE BY HAND · SERVED WITH SOUL
          </span>
        </motion.div>
      </div>

      <div className="chef-creations">
        <div className="chef-section-heading">
          <div>
            <span className="chef-eyebrow">
              <Sparkles size={14} />
              FROM OUR KITCHEN
            </span>
            <h2>
              Signature <em>Creations</em>
            </h2>
          </div>
          <ChefHat size={30} strokeWidth={1} />
        </div>

        <div className="chef-cards">
          {creations.map((dish, index) => (
            <motion.article
              key={dish.number}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="chef-card"
            >
              <span className="chef-card-number">{dish.number}</span>
              <span className="chef-card-tag">{dish.tag}</span>
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <button className="chef-text-link" onClick={onExploreMenu}>
                DISCOVER THE MENU ↗
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <footer className="chef-footer">
        <span>NOCTURNE — DINING BEYOND THE ORDINARY</span>
        <span>CRAFTED WITH INTENTION</span>
      </footer>
    </section>
  );
}
