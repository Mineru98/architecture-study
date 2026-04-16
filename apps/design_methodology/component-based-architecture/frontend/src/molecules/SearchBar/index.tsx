import React from 'react';
import { Stack, Button } from '@vibe-architecture/react';
interface SearchBarProps { value: string; onChange: (v: string) => void; categories: string[]; selected: string; onSelect: (c: string) => void; }
export const SearchBar: React.FC<SearchBarProps> = ({ categories, selected, onSelect }) => (
  <Stack direction="row" gap="var(--va-space-8)" style={{ marginBottom: 16 }}>
    {categories.map(c => <Button key={c} variant={selected === c ? 'solid' : 'outline'} onClick={() => onSelect(c)}>{c}</Button>)}
  </Stack>
);
