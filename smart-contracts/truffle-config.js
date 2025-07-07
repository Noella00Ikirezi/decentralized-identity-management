module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (Ganache)
      port: 8545,            // Standard Ethereum port
      network_id: "*"        // Match any network
    },
  },

  compilers: {
    solc: {
      version: "0.8.21",     // Matches your pragma
    }
  },

  mocha: {
    // timeout: 100000
  }

  // Truffle DB is disabled by default
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
