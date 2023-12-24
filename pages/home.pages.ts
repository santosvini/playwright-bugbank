import { Page, expect } from '@playwright/test'

export class HomePage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }
  
  async go() {
    
    await this.page.goto('/');
    
    await expect(this.page).toHaveTitle(/BugBank/);
    const locator = this.page.locator('span img').first();
    await expect(locator).toBeVisible();
  }
}