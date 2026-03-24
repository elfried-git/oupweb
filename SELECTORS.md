# Oupweb - Selectors Documentation for Playwright Automation

This document lists all static `data-testid` selectors available for automated testing.

---

## 📋 Table of Contents

1. [Login Page](#login-page)
2. [Dashboard](#dashboard)
3. [Products](#products)
4. [Tasks](#tasks)
5. [Notifications](#notifications)
6. [Modals](#modals)
7. [Common Elements](#common-elements)

---

## 🔐 Login Page

### Page Structure
| Selector | Description |
|----------|-------------|
| `login-page` | Login page container |
| `login-loading-state` | Loading skeleton state |
| `login-card` | Main login card |
| `login-logo` | Logo container |
| `login-title` | "Oupweb" title |
| `login-subtitle` | Subtitle text |
| `login-form` | Login form element |
| `login-header-actions` | Header with toggles |

### Form Elements
| Selector | Description |
|----------|-------------|
| `login-email-group` | Email input group |
| `email-label` | Email field label |
| `email-input` | Email input field |
| `login-password-group` | Password input group |
| `password-label` | Password field label |
| `password-input` | Password input field |
| `toggle-password-visibility` | Show/hide password button |
| `login-remember-group` | Remember me group |
| `remember-me-checkbox` | Remember me checkbox |
| `login-submit-button` | Submit/login button |

### Demo Credentials
| Selector | Description |
|----------|-------------|
| `demo-credentials-card` | Demo card container |
| `demo-credentials-title` | "Demo Credentials" text |
| `demo-credentials-buttons` | Buttons container |
| `demo-admin-button` | Admin demo button |
| `demo-user-button` | User demo button |
| `demo-guest-button` | Guest demo button |

### Error States
| Selector | Description |
|----------|-------------|
| `login-error` | Error alert message |

---

## 🏠 Dashboard

### Header
| Selector | Description |
|----------|-------------|
| `dashboard-page` | Dashboard container |
| `dashboard-header` | Sticky header |
| `dashboard-logo-section` | Logo area |
| `dashboard-title` | "Oupweb" title |
| `dashboard-subtitle` | "Dashboard Demo" text |
| `dashboard-header-actions` | Header actions |
| `refresh-data-button` | Refresh button |
| `user-avatar-button` | User avatar dropdown trigger |
| `notification-badge` | Unread count badge |
| `user-dropdown-menu` | Dropdown menu container |
| `user-info` | User info section |
| `user-name` | User name text |
| `user-email` | User email text |
| `open-profile-button` | Profile menu item |
| `logout-button` | Logout menu item |

### Navigation Tabs
| Selector | Description |
|----------|-------------|
| `main-navigation-tabs` | Tab list container |
| `tab-overview` | Overview tab |
| `tab-products` | Products tab |
| `tab-tasks` | Tasks tab |
| `tab-notifications` | Notifications tab |
| `tab-content-overview` | Overview content |
| `tab-content-products` | Products content |
| `tab-content-tasks` | Tasks content |
| `tab-content-notifications` | Notifications content |

### Stats Cards
| Selector | Description |
|----------|-------------|
| `stats-cards` | Stats cards container |
| `stat-products` | Products stat card |
| `stat-tasks` | Tasks stat card |
| `stat-completed` | Completed stat card |
| `stat-notifications` | Notifications stat card |
| `stat-value-products` | Products count value |
| `stat-value-tasks` | Tasks count value |
| `stat-value-completed` | Completed count value |
| `stat-value-notifications` | Notifications count value |

### Quick Actions
| Selector | Description |
|----------|-------------|
| `quick-actions-card` | Quick actions container |
| `quick-actions-title` | Section title |
| `quick-actions-grid` | Buttons grid |
| `quick-action-add-product` | Add product button |
| `quick-action-add-task` | Add task button |
| `quick-action-export` | Export data button |
| `quick-action-report` | Generate report button |

---

## 📦 Products

### Table Structure
| Selector | Description |
|----------|-------------|
| `products-table-card` | Products card container |
| `add-product-button` | Add product CTA |
| `products-filters` | Filters container |
| `product-search-input` | Search input |
| `category-filter-select` | Category dropdown |
| `category-filter-options` | Category options |
| `category-option-all` | "All" option |
| `category-option-{name}` | Specific category option |
| `products-table-wrapper` | Table wrapper |
| `products-table` | Table element |
| `products-table-body` | Table body |

### Sort Buttons
| Selector | Description |
|----------|-------------|
| `sort-by-name-button` | Sort by name |
| `sort-by-price-button` | Sort by price |
| `sort-by-stock-button` | Sort by stock |

### Product Rows
| Selector | Description |
|----------|-------------|
| `product-row-{id}` | Product row (dynamic ID) |
| `product-name-{id}` | Product name cell |
| `product-sku-{id}` | SKU cell |
| `product-category-{id}` | Category badge |
| `product-price-{id}` | Price cell |
| `product-stock-{id}` | Stock cell |
| `product-status-{id}` | Status badge |
| `product-actions-button-{id}` | Actions menu trigger |
| `product-actions-menu-{id}` | Actions dropdown |
| `edit-product-button-{id}` | Edit action |
| `delete-product-button-{id}` | Delete action |

### Empty State
| Selector | Description |
|----------|-------------|
| `products-empty-state` | No products message |
| `products-count` | "Showing X of Y" text |

---

## ✅ Tasks

### List Structure
| Selector | Description |
|----------|-------------|
| `tasks-list-card` | Tasks card container |
| `tasks-list-title` | Section title |
| `add-task-button` | Add task CTA |
| `tasks-progress-section` | Progress section |
| `tasks-completion-count` | X/Y completed text |
| `tasks-progress-bar` | Progress bar |
| `tasks-filter-section` | Filter container |
| `tasks-filter-select` | Status filter dropdown |
| `filter-option-all` | All tasks filter |
| `filter-option-todo` | Todo filter |
| `filter-option-in-progress` | In progress filter |
| `filter-option-done` | Done filter |
| `tasks-list-container` | Tasks list |

### Task Items
| Selector | Description |
|----------|-------------|
| `task-item-{id}` | Task row (dynamic ID) |
| `task-checkbox-{id}` | Completion checkbox |
| `task-title-{id}` | Task title |
| `task-priority-{id}` | Priority indicator |
| `task-status-badge-{id}` | Status badge |
| `task-due-date-{id}` | Due date |
| `task-status-select-{id}` | Status dropdown |
| `status-option-todo-{id}` | Todo option |
| `status-option-in-progress-{id}` | In progress option |
| `status-option-done-{id}` | Done option |

### Empty State
| Selector | Description |
|----------|-------------|
| `tasks-empty-state` | No tasks message |

---

## 🔔 Notifications

| Selector | Description |
|----------|-------------|
| `notifications-panel` | Panel container |
| `clear-notifications-button` | Clear all button |
| `notification-{id}` | Notification item |
| `mark-read-{id}` | Mark as read button |

---

## 📝 Modals

### Product Form Modal
| Selector | Description |
|----------|-------------|
| `product-form-modal` | Modal container |
| `product-name-input` | Name input |
| `product-sku-input` | SKU input |
| `product-category-select` | Category select |
| `product-price-input` | Price input |
| `product-stock-input` | Stock input |
| `product-description-input` | Description textarea |
| `product-image-input` | Image URL input |
| `product-active-switch` | Active toggle |
| `cancel-product-button` | Cancel button |
| `submit-product-button` | Submit button |

### Task Form Modal
| Selector | Description |
|----------|-------------|
| `task-form-modal` | Modal container |
| `task-title-input` | Title input |
| `task-description-input` | Description textarea |
| `task-status-select` | Status select |
| `task-priority-select` | Priority select |
| `task-duedate-input` | Due date input |
| `cancel-task-button` | Cancel button |
| `submit-task-button` | Submit button |

### Profile Modal
| Selector | Description |
|----------|-------------|
| `profile-modal` | Modal container |
| `profile-name-input` | Name input |
| `profile-email-input` | Email input |
| `profile-avatar-input` | Avatar URL input |
| `profile-language-select` | Language select |
| `cancel-profile-button` | Cancel button |
| `submit-profile-button` | Submit button |

### Delete Confirmation
| Selector | Description |
|----------|-------------|
| `delete-confirmation-dialog` | Dialog container |
| `delete-dialog-title` | "Are you sure?" title |
| `delete-dialog-description` | Description text |
| `delete-dialog-cancel` | Cancel button |
| `delete-dialog-confirm` | Confirm delete button |

---

## 🔧 Common Elements

### Theme Toggle
| Selector | Description |
|----------|-------------|
| `theme-toggle` | Theme toggle button |
| `theme-option-light` | Light theme option |
| `theme-option-dark` | Dark theme option |
| `theme-option-system` | System theme option |

### Language Toggle
| Selector | Description |
|----------|-------------|
| `language-toggle` | Language toggle button |
| `lang-fr` | French option |
| `lang-en` | English option |

---

## 🎯 Playwright Example Usage

```typescript
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('/');
  
  // Wait for login page
  await expect(page.getByTestId('login-page')).toBeVisible();
  
  // Fill demo credentials
  await page.getByTestId('demo-admin-button').click();
  
  // Submit form
  await page.getByTestId('login-submit-button').click();
  
  // Verify dashboard loaded
  await expect(page.getByTestId('dashboard-page')).toBeVisible();
});

test('add product', async ({ page }) => {
  // ... login first
  
  // Go to products tab
  await page.getByTestId('tab-products').click();
  
  // Click add button
  await page.getByTestId('add-product-button').click();
  
  // Fill form
  await page.getByTestId('product-name-input').fill('Test Product');
  await page.getByTestId('product-sku-input').fill('TEST-001');
  await page.getByTestId('product-price-input').fill('99.99');
  await page.getByTestId('product-stock-input').fill('10');
  
  // Submit
  await page.getByTestId('submit-product-button').click();
});

test('complete task', async ({ page }) => {
  // ... login first
  
  // Find a task checkbox and click it
  const taskCheckbox = page.getByTestId(/task-checkbox-/).first();
  await taskCheckbox.click();
  
  // Verify task is marked done
  await expect(page.getByTestId('tasks-progress-bar')).toBeVisible();
});
```

---

## 📊 Data Attributes

### Additional data attributes for advanced testing:

| Attribute | Description |
|-----------|-------------|
| `data-product-id` | Product unique ID |
| `data-product-name` | Product name |
| `data-task-id` | Task unique ID |
| `data-task-title` | Task title |
| `data-task-status` | Task status (todo/in_progress/done) |
| `data-task-priority` | Task priority (low/medium/high) |
| `data-category` | Category name |
| `data-status` | Status value |
| `data-priority` | Priority value |
| `data-stock` | Stock count |
| `data-is-active` | Active state (true/false) |
| `data-loading` | Loading state (true/false) |
| `data-action` | Action type identifier |
| `data-filter-type` | Filter type (search/category/status) |
| `data-sort-column` | Sort column name |
| `data-sort-order` | Sort order (asc/desc) |
| `data-row-index` | Row index in table/list |
| `data-count` | Count value |
| `data-role` | User role (admin/user/guest) |
| `data-email` | Email address |

---

**Last updated:** 2024
