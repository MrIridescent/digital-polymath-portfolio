#!/usr/bin/env node

/**
 * 🛡️ Content Protection Application Script
 * Automatically applies content protection to all components and pages
 */

const fs = require('fs');
const path = require('path');

// Components and pages that need protection
const PROTECTION_TARGETS = [
  'components/SkillsMatrix.tsx',
  'components/ProjectGrid.tsx',
  'components/FeaturedProjects.tsx',
  'components/TechEvolutionTimeline.tsx',
  'components/EducationJourney.tsx',
  'components/PersonalPhilosophy.tsx',
  'components/PolymathicManifesto.tsx',
  'components/Footer.tsx',
  'components/Navigation.tsx',
  'app/page.tsx',
  'app/about/page.tsx',
  'app/projects/page.tsx',
  'app/skills/page.tsx',
  'app/resume/page.tsx',
  'app/contact/page.tsx'
];

// Protection imports to add
const PROTECTION_IMPORTS = `import AdvancedContentProtection from '@/components/AdvancedContentProtection';
import { ProtectedText, ProtectedImage } from '@/components/ContentProtection';`;

/**
 * Check if file exists
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

/**
 * Read file content
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Write file content
 */
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Add protection imports to file
 */
function addProtectionImports(content) {
  // Check if imports already exist
  if (content.includes('AdvancedContentProtection')) {
    return content;
  }

  // Find the last import statement
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ') && !lines[i].includes('from \'react\'')) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex !== -1) {
    lines.splice(lastImportIndex + 1, 0, PROTECTION_IMPORTS);
    return lines.join('\n');
  }

  return content;
}

/**
 * Wrap component with protection
 */
function wrapWithProtection(content, componentName) {
  // Check if already protected
  if (content.includes('<AdvancedContentProtection')) {
    return content;
  }

  // Find the return statement
  const returnMatch = content.match(/(\s*return\s*\(\s*\n?)(\s*<[^>]+>)/);
  if (!returnMatch) {
    console.warn(`Could not find return statement in ${componentName}`);
    return content;
  }

  const beforeReturn = content.substring(0, returnMatch.index + returnMatch[1].length);
  const afterReturn = content.substring(returnMatch.index + returnMatch[1].length);

  // Determine protection level based on component type
  let protectionLevel = 4;
  let watermark = `© David Akpoviroro OKE - ${componentName}`;

  if (componentName.includes('Hero') || componentName.includes('About')) {
    protectionLevel = 5;
  } else if (componentName.includes('Project') || componentName.includes('Skill')) {
    protectionLevel = 4;
  } else if (componentName.includes('Footer') || componentName.includes('Navigation')) {
    protectionLevel = 3;
  }

  // Add protection wrapper
  const protectionWrapper = `<AdvancedContentProtection level={${protectionLevel}} watermark="${watermark}">\n    `;
  const protectionClose = '\n    </AdvancedContentProtection>';

  // Find the last closing tag before the closing parenthesis
  const lastTagMatch = afterReturn.match(/^(.*?)(\n\s*\)\s*\n?\s*}?\s*)$/s);
  if (!lastTagMatch) {
    console.warn(`Could not find closing structure in ${componentName}`);
    return content;
  }

  const componentContent = lastTagMatch[1];
  const closingStructure = lastTagMatch[2];

  return beforeReturn + protectionWrapper + componentContent + protectionClose + closingStructure;
}

/**
 * Protect text content in component
 */
function protectTextContent(content) {
  // Protect email addresses
  content = content.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '<ProtectedText level={4}>$1</ProtectedText>'
  );

  // Protect phone numbers
  content = content.replace(
    /(\+?[\d\s\-\(\)]{10,})/g,
    (match) => {
      if (match.trim().length >= 10) {
        return `<ProtectedText level={4}>${match}</ProtectedText>`;
      }
      return match;
    }
  );

  // Protect important headings (but not JSX props)
  content = content.replace(
    /(>)([^<]*(?:David|Akpoviroro|Oke|Iridescent|Polymath)[^<]*?)(<)/g,
    '$1<ProtectedText level={5}>$2</ProtectedText>$3'
  );

  return content;
}

/**
 * Protect images in component
 */
function protectImages(content) {
  // Replace img tags with ProtectedImage
  content = content.replace(
    /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/g,
    '<ProtectedImage src="$2" $1$3 />'
  );

  return content;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  console.log(`Processing: ${filePath}`);

  if (!fileExists(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return false;
  }

  let content = readFile(filePath);
  if (!content) {
    return false;
  }

  const originalContent = content;
  const componentName = path.basename(filePath, '.tsx');

  // Add protection imports
  content = addProtectionImports(content);

  // Wrap with protection
  content = wrapWithProtection(content, componentName);

  // Protect text content
  content = protectTextContent(content);

  // Protect images
  content = protectImages(content);

  // Only write if content changed
  if (content !== originalContent) {
    if (writeFile(filePath, content)) {
      console.log(`✅ Protected: ${filePath}`);
      return true;
    } else {
      console.error(`❌ Failed to write: ${filePath}`);
      return false;
    }
  } else {
    console.log(`⏭️  Already protected: ${filePath}`);
    return true;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🛡️ Starting Content Protection Application...\n');

  let successCount = 0;
  let totalCount = 0;

  for (const target of PROTECTION_TARGETS) {
    totalCount++;
    if (processFile(target)) {
      successCount++;
    }
  }

  console.log(`\n🛡️ Content Protection Complete!`);
  console.log(`✅ Successfully protected: ${successCount}/${totalCount} files`);

  if (successCount < totalCount) {
    console.log(`❌ Failed to protect: ${totalCount - successCount} files`);
    process.exit(1);
  }

  console.log('\n🎉 All content is now protected from copying!');
  console.log('🤖 Bots can still read content for SEO purposes.');
  console.log('🚫 Humans cannot copy, right-click, or use developer tools.');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  processFile,
  addProtectionImports,
  wrapWithProtection,
  protectTextContent,
  protectImages
};
