# Node.js service modularity management

Multiple node processes can be handled gracefully if we write entry point logic prior to handing over the application to the process manager (in this case referring to PM2 in production).

Furthermore, graceful shutdown can also be applied across application layer within the code, adding an extra layer to ensure shutdown occurs gracefully and applies process exits in the correct logical temporal order.

For now there are 3 services to experiment with (`foo`, `bar`, `baz`). The goal is to start up the multiple connected services in a specific order. The order represents the dependencies of some services on others therefore the order of start up is as follows:

1. `foo`
2. `bar`
3. `baz`

> `baz` depends on `bar` being ready. `bar` depends on `foo` being ready. Therefore `baz` also requires that `foo` is ready by association.

Example of spinning up a service (by argument flag):

```bash
# src/index.ts is the entry point
# the code within the index file will initialise the foo service
npm run debug src/index.ts foo
```

> At a later stage, all services will be set up as PM2 services that have the same entry point (src/index.ts) but different arguments to trigger the service of choice.

<br />

## Useful references

[PM2 graceful start](https://pm2.keymetrics.io/docs/usage/signals-clean-restart/)

<br />

Graceful start using `--wait-ready` (`wait_ready` in configuration file). When you set this option, PM2 will listen for that event. In your application you will need to add `process.send('ready');` when you want the application to be considered as ready.
