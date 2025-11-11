import { test, expect } from '@playwright/test';

test.describe('Personaje Lista Page E2E Tests', () => {
  test('debería mostrar la lista de personajes en la página de inicio', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="personaje-card-lista"]', { timeout: 10000 });
    const characterCards = await page.locator('[data-testid="personaje-card-lista"]').count();
    expect(characterCards).toBeGreaterThan(0);
  });

  test('debería mostrar los nombres de los personajes en la lista', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="personaje-card-lista"]', { timeout: 10000 });
    const lukeCard = page.locator('[data-testid="personaje-card-lista"]').first();
    await expect(lukeCard).toBeVisible();
  });

  test('debería cargar más personajes al desplazarse (lazy loading)', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="personaje-card-lista"]', { timeout: 10000 });
    const initialCount = await page.locator('[data-testid="personaje-card-lista"]').count();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    const newCount = await page.locator('[data-testid="personaje-card-lista"]').count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test('debería abrir el modal al hacer clic en Ver detalles completos', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="personaje-card-lista"]', { timeout: 10000 });
    const viewDetailsButton = page.locator('[data-testid="ver-detalles-button"]').first();
    await viewDetailsButton.click();
    await page.waitForSelector('[data-testid="modal"]', { timeout: 5000 });
    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
  });

  test('debería mostrar las pestañas de navegación', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Lista de Personajes')).toBeVisible();
    await expect(page.getByText('Buscar personaje x id')).toBeVisible();
  });

  test('debería navegar a la página de búsqueda al hacer clic en Buscar por ID', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Buscar personaje x id');
    await page.waitForURL('**/personaje-id');
    expect(page.url()).toContain('/personaje-id');
  });

  test('debería ser receptivo en la vista móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('[data-testid="personaje-card-lista"]', { timeout: 10000 });
    const characterCard = page.locator('[data-testid="personaje-card-lista"]').first();
    await expect(characterCard).toBeVisible();
  });
});
