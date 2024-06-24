// Table.js
import Quill from 'quill';

const Block = Quill.import('blots/block');
const Container = Quill.import('blots/container');

class TableCell extends Block {
  static create(value) {
    const node = super.create();
    node.setAttribute('data-cell', value);
    return node;
  }

  static formats(node) {
    return node.getAttribute('data-cell');
  }

  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute('data-cell', value);
    } else {
      super.format(name, value);
    }
  }
}
TableCell.blotName = 'table-cell';
TableCell.tagName = 'TD';

class TableRow extends Container {
  static create(value) {
    const node = super.create();
    node.setAttribute('data-row', value);
    return node;
  }

  static formats(node) {
    return node.getAttribute('data-row');
  }

  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute('data-row', value);
    } else {
      super.format(name, value);
    }
  }
}
TableRow.blotName = 'table-row';
TableRow.tagName = 'TR';
TableRow.defaultChild = 'table-cell';
TableRow.allowedChildren = [TableCell];

class Table extends Container {
  static create(value) {
    const node = super.create();
    node.setAttribute('data-table', value);
    return node;
  }

  static formats(node) {
    return node.getAttribute('data-table');
  }

  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute('data-table', value);
    } else {
      super.format(name, value);
    }
  }
}
Table.blotName = 'table';
Table.tagName = 'TABLE';
Table.defaultChild = 'table-row';
Table.allowedChildren = [TableRow];

Quill.register(Table);
Quill.register(TableRow);
Quill.register(TableCell);

export { Table, TableRow, TableCell };
