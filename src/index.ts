// import foo from './foo';
// import bar from './bar';
// import baz from './baz';

// foo.run();
// baz.run();
// bar.run();

const service_name = process.argv[2];

switch (service_name) {
  case 'foo':
  case 'bar':
  case 'baz':
    require(`./${service_name}`).run();
    break;
  default:
    break;
}
