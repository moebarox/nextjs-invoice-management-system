import { memo, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { INVOICE_STATUS } from '~/constants/invoice';
import { debounce } from 'lodash';

// Create a memoized icon to avoid glitching
const ChevronIcon = memo((props) => (
  <Image
    {...props}
    src="/icon-chevron-down.svg"
    alt="Filter"
    width={24}
    height={24}
    style={{ top: 7 }}
  />
));
ChevronIcon.displayName = 'ChevronIcon';

export default function InvoiceListFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState({
    keywords: searchParams?.get('keywords') || '',
    status: searchParams?.get('status') || '',
  });

  useEffect(() => {
    const debouncedFilter = debounce(handleFilter, 500);
    debouncedFilter();
    return () => debouncedFilter.cancel();
  }, [filter]);

  const handleFilter = () => {
    const query = new URLSearchParams(window.location.search);
    query.set('keywords', filter.keywords);
    query.set('status', filter.status);
    router.push(`/?${query.toString()}`);
  };

  return (
    <Stack direction="row" gap="25px" data-testid="invoice-filter">
      <FormControl variant="filled" size="small" sx={{ flexGrow: 1 }}>
        <TextField
          variant="filled"
          placeholder="Search"
          value={filter.keywords}
          data-testid="filter-keywords"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, keywords: e.target.value }))
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mt: '0 !important' }}>
                  <Image
                    src="/icon-search.svg"
                    alt="Search"
                    width={18}
                    height={18}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
      <FormControl variant="filled" size="small" sx={{ minWidth: 135 }}>
        <Select
          displayEmpty
          value={filter.status}
          data-testid="filter-status"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, status: e.target.value }))
          }
          IconComponent={ChevronIcon}
        >
          <MenuItem value="">All Status</MenuItem>
          {Object.entries(INVOICE_STATUS).map((status) => (
            <MenuItem key={status[0]} value={status[0]}>
              {status[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
