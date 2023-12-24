import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.pages';
import { HomePage } from '../pages/home.pages';
import { email, name, pass, repeatPass, errorEmail, errorPass } from './helper';

let loginPage: LoginPage
let homePage: HomePage

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page)
  loginPage = new LoginPage(page)
  await homePage.go()
})

test('Registrar usuário e fazer login com sucesso', async ({ page }) => {
  await loginPage.registerUser(email, name, pass, repeatPass)
  await loginPage.sigIn(email, pass)
})

test('Não deve fazer login sem registro', async ({ page }) => {
  await loginPage.errorLogin(errorEmail, errorPass);
  await loginPage.modalMessage('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
});

test('Tentar o acesso sem dados preenchidos', async ({ page }) => {
  await loginPage.fillData()
})

