export default class AnimatedTabMenuIndicator {
  private $tabMenu = $(this.tabMenuSelector);

  private dom = {
    tabMenu: this.$tabMenu,
    tabMenuLinks: this.$tabMenu.find('.w-tab-link'),
    tabMenuIndicator: this.$tabMenu.find('[tab-menu-indicator]'),
  };

  private mutationObserver?: MutationObserver;

  constructor(private tabMenuSelector: string) {
    this.addListeners();
    this.styleIndicatorElement();
  }

  private addListeners() {
    this.mutationObserver = new MutationObserver(() => {
      this.styleIndicatorElement();
    });

    this.dom.tabMenuLinks.each((index, link) => {
      this.mutationObserver?.observe(link, {
        attributes: true,
        attributeFilter: ['class'],
      });
    });
  }

  private styleIndicatorElement() {
    const activeTab = this.dom.tabMenuLinks.filter('.w--current');

    const activeTabOffsetLeft = activeTab.position().left || 0;
    const activeTabWidth = activeTab.outerWidth() || 0;

    this.dom.tabMenuIndicator.css({
      width: `${activeTabWidth}px`,
      transform: `translateX(${activeTabOffsetLeft}px)`,
    });
  }

  public destroy() {
    this.mutationObserver?.disconnect();
  }
}
