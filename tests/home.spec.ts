import { test } from '@playwright/test';
import { HomePage } from '../pages/home.pages';

let homePage: HomePage

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page)
})

test('Acessar a home do Bugbank',async ({ page }) => {
  await homePage.go()
});