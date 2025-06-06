import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the given URL
   * @param url The URL to open
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if element is visible
   * @param selector The locator string
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Wait for an element to be attached and visible
   * @param selector The locator string
   */
  async waitForVisibility(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  /**
   * Click an element
   * @param selector The locator string
   */
  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Enter text into an input field
   * @param selector The locator string
   * @param text The text to enter
   */
  async enterText(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text);
  }

  /**
   * Get text content from an element
   * @param selector The locator string
   * @returns The text content
   */
  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).innerText();
  }

  /**
 * Selects an option by visible label from a dropdown/select element.
 * @param selector The locator string for the dropdown
 * @param optionLabel The visible label of the option to select
 */
  async selectOptionByLabel(selector: string, optionLabel: string): Promise<void> {
    await this.page.locator(selector).selectOption({ label: optionLabel });
  }

}
