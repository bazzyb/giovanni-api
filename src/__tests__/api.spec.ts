import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../index';

chai.use(chaiHttp);
chai.should();

describe('Orders API', () => {
  describe('/GET orders', () => {
    it('should get task schedule', done => {
      chai.request(app)
        .get('/orders')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  describe('/POST order', () => {
    it('should return status 200', done => {
      chai.request(app)
        .post('/order')
        .send({ recipient: 'Stavros' })
        .end((_, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should have 3 items in the schedule', done => {
      chai.request(app)
        .get('/orders')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });
});
