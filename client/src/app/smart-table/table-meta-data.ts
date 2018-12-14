enum ColumnTypes {
  Text, Number, Date, Table, CheckBox, Autocomplete, Object
}

interface TableColumn {
  name: string;
  displayName: string;
  type: ColumnTypes;
  metaData?: TableMetaData;
  autocomplete?: string[];
  map?: (any: any) => any;
}

interface TableMetaData {
  columns: Array<TableColumn>;
  collectionName?: string;
}

export { TableMetaData, TableColumn, ColumnTypes };
