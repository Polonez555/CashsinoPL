import { Selector, ClientFunction } from 'testcafe';

interface PageInfo {
  title: string;
  url: string;
}

fixture('Wikipedia Clicker')
  .page('https://en.wikipedia.org/wiki/Plato');

// Get current page title and URL
const getPageInfo = ClientFunction(() => {
  return {
    title: document.title,
    url: window.location.href,
  };
});

// Check if link is valid (not a bracket link, not a footnote, not disambiguation, not "Redirected from")
const isValidLink = ClientFunction((link: HTMLElement) => {
  const href = link.getAttribute('href') || '';
  
  // Must be an internal Wikipedia link
  if (!href.startsWith('/wiki/')) {
    return false;
  }
  
  // Exclude special pages
  if (href.includes(':')) {
    return false;
  }
  
  // Check if link is within parentheses (bracket link)
  const parent = link.parentElement;
  if (parent) {
    const text = parent.textContent || '';
    const linkIndex = text.indexOf(link.textContent || '');
    
    // Count opening and closing parentheses before this link
    let openCount = 0;
    let closeCount = 0;
    
    for (let i = 0; i < linkIndex; i++) {
      if (text[i] === '(') openCount++;
      if (text[i] === ')') closeCount++;
    }
    
    // If there are more open than close parentheses, this link is in brackets
    if (openCount > closeCount) {
      return false;
    }
  }
  
  // Check if link is a citation/footnote (has class that indicates citation)
  if (link.classList.contains('citation') || 
      link.classList.contains('mw-cite-backlink') ||
      link.closest('.reference') ||
      link.closest('.mw-reference-text')) {
    return false;
  }
  
  return true;
});

// Find the first valid article link in the body content
const findFirstValidLink = ClientFunction(() => {
  const content = document.querySelector('#mw-content-text');
  if (!content) return null;
  
  const links = content.querySelectorAll('a[href^="/wiki/"]');
  
  for (let link of Array.from(links)) {
    if ((window as any).isValidLink(link)) {
      return {
        href: link.getAttribute('href'),
        text: link.textContent?.trim() || '',
      };
    }
  }
  
  return null;
});

test('Wikipedia Philosophy Clicker', async (t) => {
  const visitedPages = new Set<string>();
  const chain: string[] = [];
  const maxSteps = 100; // Safety limit to prevent infinite loops
  let steps = 0;
  let foundPhilosophy = false;
  let loopDetected = false;

  while (steps < maxSteps) {
    const pageInfo = await getPageInfo();
    chain.push(pageInfo.title);
    
    console.log(`Step ${steps + 1}: ${pageInfo.title}`);
    
    // Check if we found Philosophy
    if (pageInfo.title === 'Philosophy' || pageInfo.url.includes('/wiki/Philosophy')) {
      foundPhilosophy = true;
      break;
    }
    
    // Check for loops
    if (visitedPages.has(pageInfo.url)) {
      loopDetected = true;
      console.log(`Loop detected at ${pageInfo.title}`);
      break;
    }
    
    visitedPages.add(pageInfo.url);
    
    // Find and click first valid link
    const firstLink = await findFirstValidLink();
    
    if (!firstLink) {
      console.log('No valid links found on this page');
      break;
    }
    
    console.log(`  -> Clicking: ${firstLink.text}`);
    
    // Navigate to the next page
    await t.navigateTo(`https://en.wikipedia.org${firstLink.href}`);
    
    steps++;
  }

  // Output results
  console.log('\n=== RESULTS ===');
  console.log(`Total steps: ${steps + 1}`);
  console.log(`Chain length: ${chain.length}`);
  console.log(`Found Philosophy: ${foundPhilosophy}`);
  console.log(`Loop detected: ${loopDetected}`);
  console.log('\nLongest chain found:');
  chain.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
  });

  // Assertions
  if (foundPhilosophy) {
    await t
      .expect(chain.length).gt(0)
      .expect(chain[chain.length - 1]).eql('Philosophy');
  } else if (loopDetected) {
    await t
      .expect(chain.length).gt(1)
      .expect(loopDetected).ok();
  } else {
    await t
      .expect(chain.length).gt(0);
  }
});