const { nanoid } = require('nanoid');
const notes = require('./notes');

const tambahNote = (request, h) => {
  const { title, body, tags } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const baru = {
    id,
    title,
    body,
    createdAt,
    updatedAt,
    tags,
  };

  notes.push(baru);

  const sukses = notes.filter((n) => n.id === id).length > 0;
  if (sukses) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan catatan',
      data: {
        nomorNote: id,
      },
    });

    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'gagal',
    message: 'Gagal menambahkan catatan',
  });
  response.code(500);
  return response;
};

const semuaNote = () => ({
  status: 'success',
  message: 'Berhasil mengambil semua note',
  data: {
    notes,
  },
});
const dapetinNoteBerdasarkanId = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    const response = h.response({
      status: 'Success',
      data: {
        note,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(400);
  return response;
};

const ediNoteBerdasarkanId = (request, h) => {
  const { id } = request.params;
  const { body, title, tags } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      id,
      updatedAt,
      body,
      title,
      tags,
    };

    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil diperbarui',
      data: {
        notes,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbaharui',
  });
  response.code(500);
  return response;
};

const hapusNoteBerasarkaId = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil dihapus',
      data: {
        notes,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(400);
  return response;
};

module.exports = {
  tambahNote,
  semuaNote,
  ediNoteBerdasarkanId,
  dapetinNoteBerdasarkanId,
  hapusNoteBerasarkaId,
};
