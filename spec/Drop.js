/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let baseDir, chai;
const noflo = require('noflo');

if (!noflo.isBrowser()) {
  chai = require('chai');
  const path = require('path');
  baseDir = path.resolve(__dirname, '../');
} else {
  baseDir = 'noflo-core';
}

describe('Drop component', function() {
  let c = null;
  let ins = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    return loader.load('core/Drop', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      ins = noflo.internalSocket.createSocket();
      c.inPorts.in.attach(ins);
      return done();
    });
  });

  return describe('when receiving a packet', () =>
    it('should drop it', function(done) {
      const ip = new noflo.IP('data', 'Foo');
      setTimeout(function() {
        chai.expect(Object.keys(ip)).to.eql([]);
        return done();
      }
      , 200);
      ins.connect();
      ins.send(ip);
      return ins.disconnect();
    })
  );
});
