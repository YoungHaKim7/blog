import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>

function remarkReadingTime() {
  return (tree, { data }) => {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutes = Math.max(
      1,
      Math.round(readingTime.minutes),
    );
    data.astro.frontmatter.words = readingTime.words;
  }
}

export { remarkReadingTime };
