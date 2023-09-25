module.exports = {
  apps: [
    {
      name: "JCWD-0206-05", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3605,
      },
      time: true,
    },
  ],
};
