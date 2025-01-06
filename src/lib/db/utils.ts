import { RowDataPacket } from 'mysql2';

export const convertBinaryUUIDToString = (row: RowDataPacket) => {
  const converted: any = { ...row };
  
  // Convert known UUID fields
  const uuidFields = ['id', 'user_id', 'project_id', 'reference_id'];
  
  for (const field of uuidFields) {
    if (converted[field] instanceof Buffer) {
      converted[field] = converted[field].toString('hex')
        .match(/.{1,8}/g)
        ?.join('-') ?? '';
    }
  }

  // Convert timestamps to ISO strings
  const dateFields = ['created_at', 'updated_at', 'due_date', 'start_date', 'end_date'];
  
  for (const field of dateFields) {
    if (converted[field] instanceof Date) {
      converted[field] = converted[field].toISOString();
    }
  }

  return converted;
};

export const convertToSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

export const convertToCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const formatQueryResult = <T>(rows: RowDataPacket[]): T[] => {
  return rows.map(row => {
    const converted = convertBinaryUUIDToString(row);
    
    // Convert snake_case to camelCase
    const formatted: any = {};
    for (const [key, value] of Object.entries(converted)) {
      formatted[convertToCamelCase(key)] = value;
    }
    
    return formatted as T;
  });
};