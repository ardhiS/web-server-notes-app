const {
  tambahNote,
  semuaNote,
  ediNoteBerdasarkanId,
  dapetinNoteBerdasarkanId,
  hapusNoteBerasarkaId,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: tambahNote,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: semuaNote,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: dapetinNoteBerdasarkanId,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: ediNoteBerdasarkanId,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: hapusNoteBerasarkaId,
  },
];

module.exports = routes;
