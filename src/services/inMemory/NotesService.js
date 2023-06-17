/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
  constructor() {
    this._note = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      body,
      tags,
      id,
      createdAt,
      updatedAt,
    };

    this._note.push(newNote);

    const isSuccess = this._note.filter((n) => n.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }
    return id;
  }

  getNotes() {
    return this._note;
  }

  getNoteById(id) {
    const note = this._note.filter((n) => n.id === id)[0];
    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._note.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new NotFoundError(
        'Gagal memperbaharui catatan, id tidak  ditemukan'
      );
    }
    const updatedAt = new Date().toISOString();

    this._note[index] = {
      ...this._note[index],
      title,
      body,
      tags,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._note.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus, Id tidak ditemukan');
    }

    this._note.splice(index, 1);
  }
}

module.exports = NotesService;
