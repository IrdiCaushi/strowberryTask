import PouchDB from 'pouchdb-browser';
import { default as PouchDBAuthentication } from 'pouchdb-authentication';
import { default as PouchDBFind } from 'pouchdb-find';
import { default as SecurityPlugin } from './SecurityPlugin';

PouchDB.plugin(PouchDBAuthentication);
PouchDB.plugin(SecurityPlugin);
PouchDB.plugin(PouchDBFind);

//OTHER USEFUL PLUGINS
//https://pouchdb.com/external.html
//https://github.com/pouchdb-community/transform-pouch
//https://github.com/calvinmetcalf/crypto-pouch
//https://github.com/pouchdb-community/worker-pouch
//https://github.com/pouchdb-community/pouchdb-quick-search

export const LiveHmsDB = new PouchDB('http://root:root@127.0.0.1:5984/emp', { skip_setup: true });
const HmsDB = new PouchDB('emp'); //offline-local

//https://pouchdb.com/api.html#sync
HmsDB.sync(LiveHmsDB, {
    live: true, // do a live, ongoing sync
    retry: true // retry if the connection is lost
});

HmsDB.on('error', e => console.log('HMS PouchDB Error', e));

export default HmsDB;
