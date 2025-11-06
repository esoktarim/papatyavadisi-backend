// PM2 Configuration for Production
module.exports = {
  apps: [
    {
      name: "papatyavadisi-backend",
      script: "index.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      // Windows için özel ayarlar
      interpreter: "node",
      interpreter_args: "--harmony",
    },
  ],
};

