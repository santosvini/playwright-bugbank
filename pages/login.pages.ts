import { Page, expect } from '@playwright/test'

export class LoginPage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async sigIn(email: string, pass: string) {
    
    await this.page.fill('input[type=email]', email);
    await this.page.fill('input[type=password]', pass);
    await this.page.click('button >> text=Acessar');
    
    const message = this.page.locator('p#textName');
    await expect(message).toBeVisible();
  }

  async errorLogin(email: string, pass: string) {
    
    await this.page.fill('input[type=email]', email);
    await this.page.fill('input[type=password]', pass);
    await this.page.click('button >> text=Acessar');

    const modalMessage = this.page.locator('p#modalText');
    expect(modalMessage)
  }

  async fillData() {
    
    const emailField = this.page.locator('div').filter({ hasText: /^E-mailÉ campo obrigatório$/ }).getByRole('paragraph')
    const passField = this.page.locator('div').filter({ hasText: /^SenhaÉ campo obrigatório$/ }).getByRole('paragraph')
  
    await this.page.click('button >> text=Acessar')
    
    expect(emailField)
    expect(passField)
  }

  async registerUser(email: string, name: string, pass: string, repeatPass: string ) {
    
    await this.page.goto('/');

    await expect(this.page).toHaveTitle(/BugBank/);

    await this.page.getByRole('button', { name: 'Registrar' }).click();

    await this.page.locator('form').filter({ hasText: 'Voltar ao loginE-mailNomeSenhaConfirmação senhaCriar conta com saldo ?Cadastrar' }).getByPlaceholder('Informe seu e-mail').click();

    await this.page.locator('form').filter({ hasText: 'Voltar ao loginE-mailNomeSenhaConfirmação senhaCriar conta com saldo ?Cadastrar' }).getByPlaceholder('Informe seu e-mail').fill(email);

    await this.page.getByPlaceholder('Informe seu Nome').click();
    await this.page.getByPlaceholder('Informe seu Nome').fill(name);

    await this.page.locator('form').filter({ hasText: 'Voltar ao loginE-mailNomeSenhaConfirmação senhaCriar conta com saldo ?Cadastrar' }).getByPlaceholder('Informe sua senha').click();

    await this.page.locator('form').filter({ hasText: 'Voltar ao loginE-mailNomeSenhaConfirmação senhaCriar conta com saldo ?Cadastrar' }).getByPlaceholder('Informe sua senha').fill(pass);

    await this.page.getByPlaceholder('Informe a confirmação da senha').click();
    await this.page.getByPlaceholder('Informe a confirmação da senha').fill(repeatPass);

    await this.page.locator('div').filter({ hasText: /^Criar conta com saldo \?$/ }).locator('span').click();

    await this.page.locator('#toggleAddBalance').click();

    await this.page.getByRole('button', { name: 'Cadastrar' }).click();

    const modalMessage = this.page.locator('p#modalText');
    expect(modalMessage)
    await this.page.getByText('Fechar').click();    
    
  }

  async modalMessage(target: string) {
    const modalMessage = this.page.locator('p#modalText');
    await expect(modalMessage).toHaveText(target)
  }
}