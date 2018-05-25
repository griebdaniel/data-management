enum ColumnTypes {
  Text, Number, Date, Table, CheckBox, Autocomplete
}

interface TableColumn {
  name: string;
  displayName: string;
  type: ColumnTypes;
  metaData?: TableMetaData;
  autocomplete?: string[];
}

interface TableMetaData {
  columns: Array<TableColumn>;
  collectionName?: string;
}

export { TableMetaData, TableColumn, ColumnTypes };
