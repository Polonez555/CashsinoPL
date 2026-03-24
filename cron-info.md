# CRON Expression Documentation

## CRON Expression: `30 9 * * 1`

This expression runs every **Monday at 09:30 AM**.

## CRON Field Breakdown

A CRON expression consists of 5 fields separated by spaces:

```
┌───────────── Minute (0 - 59)
│ ┌───────────── Hour (0 - 23)
│ │ ┌───────────── Day of Month (1 - 31)
│ │ │ ┌───────────── Month (1 - 12)
│ │ │ │ ┌───────────── Day of Week (0 - 7, where both 0 and 7 are Sunday)
│ │ │ │ │
* * * * *
```

### Field Explanations

| Field | Allowed Values | Description | Our Value | Meaning |
|-------|---------------|-------------|-----------|---------|
| **Minute** | 0-59 | The minute at which the command runs | `30` | At the 30th minute |
| **Hour** | 0-23 | The hour at which the command runs (24-hour format) | `9` | At 9 AM |
| **Day of Month** | 1-31 | The day of the month on which to run | `*` | Every day |
| **Month** | 1-12 | The month in which to run | `*` | Every month |
| **Day of Week** | 0-7 | The day of the week (0 or 7 = Sunday, 1 = Monday, etc.) | `1` | On Monday |

## Special Characters

- **`*`** (asterisk) - Matches all values (e.g., every minute, every hour, every day)
- **`,`** (comma) - Separates multiple values (e.g., `1,2,3` means 1, 2, AND 3)
- **`-`** (hyphen) - Specifies a range (e.g., `1-5` means 1 through 5)
- **`/`** (slash) - Specifies increments (e.g., `*/5` means every 5)

## Examples

| Expression | Meaning |
|------------|---------|
| `0 0 * * *` | Every day at midnight |
| `0 12 * * *` | Every day at noon |
| `0 */2 * * *` | Every 2 hours |
| `0 9 * * 1-5` | At 9 AM, Monday through Friday |
| `0 0 1 * *` | At midnight on the first day of every month |
| `*/15 * * * *` | Every 15 minutes |
| `30 9 * * 1` | Every Monday at 9:30 AM (our expression) |

## Usage in CI/CD

This CRON expression is used in GitHub Actions workflows to schedule periodic runs:

```yaml
on:
  schedule:
    - cron: '30 9 * * 1'  # Runs every Monday at 09:30
```

This ensures that scheduled tasks (like tests, builds, or maintenance) run automatically every Monday morning.