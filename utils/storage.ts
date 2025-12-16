import { DocumentItem } from '../types';

const STORAGE_KEY = 'docflow_documents';

const INITIAL_DOCS: DocumentItem[] = [
  {
    id: '1',
    title: 'Q3 Pazarlama Raporu',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Un0QYcd1tC_IZhojvmymz__FME1oCaLImysXeeoyQ6qQwKG1Ev14k2hhutnF8NOJLL96sahA3KJiLuy0XVYYeIE31Ojnjb7JzqOxUhvwdVglX9JC5X7RTzJemUY8MT5ZhizM1qLV9alzxbcdlK5oJ6X6uIH8X0Nj_BlYzFDakH462fMyZrXl5ZugnUYQ4wpfz_iQ0JtSQEf8C-kvgHeJ0dQxLXhyDPCsMhY-zm_TaXO-tVzao0D5K527nLPgWGK9prxg6AeJk_s',
    content: '<p>Bu rapor, 3. çeyrek pazarlama verilerini içermektedir.</p>',
    type: 'doc',
    lastModified: '2023-10-25T14:30:00',
    icon: 'description',
    color: 'text-blue-600',
    isShared: true
  },
  {
    id: '2',
    title: 'Proje Teklifi - Acme',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSwFsTo333pNws5Y1awKYbXItbGJSHvI3vk7VrE3LK9FHHmyxTrkalwJ6nUoaUiBcaSDZGDNh9dGwmYXjXTtAx1EKSqKz8qVQN4vKFc8FwIOOtNZchc81oPxBqxuPZSmERs0h6nNhqc160Tdu9ZQ5xLd_t-2qV9Xu2TMZf28vecM71_-xfq8NoAmZuDnBvQi98ur2rAW-VJuf-BS7fV5blhIvzhbF9Gmkb-hPhAG91483L89oRC_ox3F68VH2_IB6n_R94ecSY_b8',
    content: '<h1>Acme Corp Proje Teklifi</h1><p>Giriş ve amaçlar...</p>',
    type: 'doc',
    lastModified: '2023-10-24T09:15:00',
    icon: 'article',
    color: 'text-orange-500',
    isShared: false
  },
  {
    id: '3',
    title: 'Marka Taslakları v2',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsZPv19yGTdXcCCWjAfkuPjFCKH7d4KA7eYCXE7foKKUj2Wh5lq0WjTQBJllCmtq9v9TofySH3pXhGYoMFQw4CUccXFDJkhHr5ltXGotzjjDu50Qbxo69_922Gp7px-9J1a4COwEU3eecYn5q30iWtvFd6Gf_6FiEq2TiQKYW5kDpgHZ5wQ098zlCK-vpIEfdKp6wjXFijfi8GRZNlzU_j-wwLHo8UPiR299Ovt3Yw9n-aznmOfDVYAL8EIL1T0TcOHsB_I7BYwmM',
    content: '<p>Marka renk paleti ve logo kullanımları.</p>',
    type: 'folder',
    lastModified: '2023-10-20T11:00:00',
    icon: 'folder',
    color: 'text-purple-500',
    isShared: true
  }
];

export const getDocuments = (): DocumentItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCS));
    return INITIAL_DOCS;
  }
  return JSON.parse(stored);
};

export const getDocumentById = (id: string): DocumentItem | undefined => {
  const docs = getDocuments();
  return docs.find(d => d.id === id);
};

export const saveDocument = (doc: DocumentItem): void => {
  const docs = getDocuments();
  const index = docs.findIndex(d => d.id === doc.id);
  
  if (index >= 0) {
    docs[index] = { ...doc, lastModified: new Date().toISOString() };
  } else {
    docs.unshift({ ...doc, lastModified: new Date().toISOString() });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
};

export const createNewDocumentId = (): string => {
  return Date.now().toString();
};