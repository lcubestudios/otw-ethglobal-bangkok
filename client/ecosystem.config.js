require('dotenv').config();
module.exports = {
  apps: [
    {
      name: 'otw-ethglobal-bangkok',
      script: 'npm',
      args: 'run start',
      exec_mode: 'fork', // Use 'cluster' for multiple instances
      instances: 1, // Set to 'max' for all CPU cores
      env: {
        NEXT_PUBLIC_PAGE_TITLE: process.env.NEXT_PUBLIC_PAGE_TITLE,
        NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
        PRIVY_APP_SECRET: process.env.PRIVY_APP_SECRET,
        PORT: process.env.PORT || 3000
      }
    }
  ]
};