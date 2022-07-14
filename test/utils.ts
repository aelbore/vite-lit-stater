import { render, TemplateResult, ReactiveElement } from 'lit'

const elements = []

export const NODE_TYPES = Object.freeze({
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_FRAGMENT_NODE: 11,
});

const isUsefulNode = ({ nodeType, textContent }) => {
  switch (nodeType) {
    case NODE_TYPES.COMMENT_NODE:
      return false;
    case NODE_TYPES.TEXT_NODE:
      return textContent.trim();
    default:
      return true;
  }
}

export async function fixture(template: TemplateResult) {
  render(template, document.body)
  const [ node ] = Array.from(document.body.childNodes).filter(isUsefulNode);
  elements.push(node)
  await (node as ReactiveElement).updateComplete
  return node
}

export function fixtureCleanUp() {
  elements.forEach(element => element.remove())
}