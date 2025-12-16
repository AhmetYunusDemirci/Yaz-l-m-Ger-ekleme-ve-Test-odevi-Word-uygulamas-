export interface DocumentItem {
  id: string;
  title: string;
  thumbnail?: string;
  content: string; // HTML content
  type: 'doc' | 'sheet' | 'slide' | 'pdf' | 'folder';
  lastModified: string; // ISO date string or display string
  icon: string;
  color: string;
  isShared?: boolean;
}

export interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
}

export enum ExportFormat {
  PDF = 'PDF',
  DOCX = 'DOCX',
  HTML = 'HTML',
}