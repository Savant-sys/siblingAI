// siblingai/next.config.js
module.exports = {
    rewrites() {
      return {
        beforeFiles: [
          // Custom rewrite rules specific to the "siblingai" directory
          {
            source: '/custom-path/:path*', // Match specific paths
            destination: '/custom-handler/:path*', // Redirect to a different path
          },
        ],
      };
    },
  };
  