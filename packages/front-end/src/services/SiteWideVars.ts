interface ISiteWideVars {
  numberOfDetectors: string;
}

export default class SiteWideVars {
  private static getData() {
    const { siteWideVars } = window as unknown as {
      siteWideVars?: ISiteWideVars;
    };

    return siteWideVars;
  }

  private static getDomTextNodes() {
    // TODO: Increase coverage based on necessity and watch for bugs
    return document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,span,div:empty');
  }

  public static replaceVarsInDom() {
    const data = this.getData();
    if (!data) return;

    const textNodes = this.getDomTextNodes();

    textNodes.forEach(node => {
      // eslint-disable-next-line no-param-reassign
      node.textContent =
        node.textContent?.replace(/%(\w*)%/g, (m, key: keyof typeof data) =>
          data[key] ? data[key] : '',
        ) || '';
    });
  }
}
