import Quill from 'quill';

const Block = Quill.import('blots/block');
const Table = Quill.import('blots/container');

class TableRow extends Block {
  static blotName = 'table-row';
  static tagName = 'TR';
}

class TableCell extends Block {
  static blotName = 'table-cell';
  static tagName = 'TD';
  static requiredContainer = TableRow;
}

class TableBlot extends Table {
  static blotName = 'table';
  static tagName = 'TABLE';
  static requiredContainer = null;

  insertBefore(childBlot, refBlot) {
    if (childBlot.statics.blotName !== this.statics.blotName) {
      const row = this.scroll.create(TableRow.blotName);
      row.appendChild(childBlot);
      super.insertBefore(row, refBlot);
    } else {
      super.insertBefore(childBlot, refBlot);
    }
  }
}

Quill.register(TableCell);
Quill.register(TableRow);
Quill.register(TableBlot);

export { TableBlot, TableRow, TableCell };
