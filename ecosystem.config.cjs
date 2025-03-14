module.exports = [
  {
    script: 'index.js',
    cwd: '/app/',
    name: 'vue-quasar-web',
    exec_mode: 'cluster',
    instances: 2,
    // out_file: '/var/log/web-output.log',
    // error_file: '/var/log/web-error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  },
];
