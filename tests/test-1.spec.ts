import { test, expect } from '@playwright/test';
const login = JSON.parse(JSON.stringify(require("../login.json")));
const data = JSON.parse(JSON.stringify(require("../cancelaaula.json")));

test('cancelaraula', async ({ page }) => {
  await page.goto(login.url);

  await page.fill('input[name="user.login"]', login.username);
  await page.fill('input[name="user.senha"]', login.password);
  await page.click('input[value="Entrar"]');
  await page.waitForTimeout(1500);
  await page.click('input[value="Continuar >>"]');
  await page.waitForTimeout(1500);
  await page.click("text=			Portal do Docente  ");
  await page.waitForTimeout(1500);
  for (const item of data) {
    await page.click(`text="${item.disciplina}"`);
    await page.waitForTimeout(3000);
    await page.locator("id=formMenu:j_id_jsp_1337189032_45", {has: page.locator('.rich-panelbar-header-act')}).click();
    await page.waitForTimeout(3000);
    await page.locator('a',{ has: page.locator('text=Tópicos de Aula')}).click();
    await page.locator('a',{ has: page.locator('text=Criar Tópico de Aula')}).click();
    await page.waitForTimeout(3000);
    const datainicio = page.locator('id=formAva:inicio');
    await datainicio.selectOption({label: item.label});
    const datafim = page.locator('id=formAva:fim');
    await datafim.selectOption({label: item.label});
    await page.fill('input[id="formAva:descricao"]', item.motivo);
    await page.locator('id=formAva:cancelarAula').check();
    await page.click('input[value=Cadastrar]');
    await page.waitForTimeout(3000);
    await page.click('id=formAcoesTurma:botaoPortalDocente');
  }
});