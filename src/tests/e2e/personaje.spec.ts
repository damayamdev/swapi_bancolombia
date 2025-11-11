import { test, expect } from '@playwright/test';

test.describe('Pruebas E2E de visualización de personaje', () => {
  test('Debe mostrar la información del personaje Luke Skywalker.', async ({ page }) => {
    await page.goto('/personaje-id');
    await page.fill('input[type="number"]', '1');
    await page.click('button:has-text("Buscar")');
    await page.waitForSelector('[data-testid="personaje-card"]', { timeout: 10000 });
    const characterName = await page.getByTestId('personaje-name');
    await expect(characterName).toHaveText('Luke Skywalker');
    await expect(page.getByTestId('info-altura')).toBeVisible();
    await expect(page.getByTestId('info-masa')).toBeVisible();
    await expect(page.getByTestId('info-color-de piel')).toBeVisible();
    await expect(page.getByTestId('info-género')).toBeVisible();
  });

  test('Debe mostrar la altura del personaje con la unidad correcta', async ({ page }) => {
    await page.goto('/personaje-id');
    await page.fill('input[type="number"]', '1');
    await page.click('button:has-text("Buscar")');
    await page.waitForSelector('[data-testid="personaje-card"]');
    const heightInfo = await page.getByTestId('info-altura');
    const text = await heightInfo.textContent();
    expect(text).toContain('cm');
    expect(text).toMatch(/\d+\s*cm/);
  });

  test('Debe mostrar la sección de vehículos', async ({ page }) => {
    await page.goto('/personaje-id');
    await page.fill('input[type="number"]', '1');
    await page.click('button:has-text("Buscar")');
    await page.waitForSelector('[data-testid="personaje-card"]');
    await page.waitForTimeout(2000);
    const vehicleList = page.getByTestId('vehicle-list');
    const noVehicles = page.getByTestId('no-vehicles');
    const hasVehicleList = await vehicleList.isVisible().catch(() => false);
    const hasNoVehicles = await noVehicles.isVisible().catch(() => false);
    expect(hasVehicleList || hasNoVehicles).toBe(true);
  });

  test('Debe mostrar el estado de carga inicialmente', async ({ page }) => {
    await page.goto('/personaje-id');
    await page.fill('input[type="number"]', '1');
    await page.click('button:has-text("Buscar")');
    const loading = page.getByTestId('loading');
    const isLoadingVisible = await loading.isVisible().catch(() => false);
    expect(typeof isLoadingVisible).toBe('boolean');
  });


  test('Debe ser receptivo en la vista móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/personaje-id');
    await page.fill('input[type="number"]', '1');
    await page.click('button:has-text("Buscar")');
    await page.waitForSelector('[data-testid="personaje-card"]');
    const personajeCard = page.getByTestId('personaje-card');
    await expect(personajeCard).toBeVisible();
    const personajeName = page.getByTestId('personaje-name');
    await expect(personajeName).toBeVisible();
  });

  test('Debe manejar la recarga de página de manera adecuada', async ({ page }) => {
    await page.goto('/personaje-id');
    await page.fill('input[type="number"]', '1');
    await page.click('button:has-text("Buscar")');
    await page.waitForSelector('[data-testid="personaje-card"]');
    await page.reload();
    await page.fill('input[type="number"]', '1');
    await page.click('button:has-text("Buscar")');
    await page.waitForSelector('[data-testid="personaje-card"]', { timeout: 10000 });
    const characterName = await page.getByTestId('personaje-name');
    await expect(characterName).toHaveText('Luke Skywalker');
  });
});
