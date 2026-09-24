import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.e2e.test.ts'],
    globalSetup: ['src/test/wait-for-database.ts'],
    env: { DATABASE_URL: 'postgres://bank:bank@localhost:5434/bank_test' },
    fileParallelism: false,
  },
})
