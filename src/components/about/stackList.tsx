import { useState, type KeyboardEvent } from "react";
import styles from "./stackList.module.css";
import { stackCategories } from "./stackData";

export function StackList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCategory = stackCategories[selectedIndex];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % stackCategories.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + stackCategories.length) % stackCategories.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = stackCategories.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelectedIndex(nextIndex);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
    tabs?.[nextIndex]?.focus();
  }

  return (
    <section className={styles.section} aria-labelledby="stack-heading">
      <h2 id="stack-heading" className={styles.heading}>Stack</h2>
      <div className={styles.tabs} role="tablist" aria-label="Tools by category">
        {stackCategories.map((category, index) => (
          <button
            key={category.name}
            id={`stack-tab-${index}`}
            className={styles.tab}
            type="button"
            role="tab"
            aria-selected={selectedIndex === index}
            aria-controls="stack-panel"
            tabIndex={selectedIndex === index ? 0 : -1}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div
        id="stack-panel"
        role="tabpanel"
        aria-labelledby={`stack-tab-${selectedIndex}`}
        tabIndex={0}
      >
        <ul className={styles.list}>
          {selectedCategory.tools.map((tool) => (
            <li key={tool.name} className={styles.item}>
              <a className={styles.link} href={tool.url}>{tool.name}</a>
              <span className={styles.description}>{tool.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
