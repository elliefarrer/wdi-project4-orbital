const dbURI = process.env.DBURI || 'mongodb://localhost/orbital';
const port = 4000;
const secret = process.env.SECRET || 'afsd93DkafdpysDiaIDSAFadfsiaFdfs,304iaPdsfaXdf';

module.exports = {
  dbURI, port, secret
};
