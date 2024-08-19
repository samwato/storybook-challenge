import { type ChangeEvent, useCallback, useMemo, useState } from 'react'

type ISearchItem = {
  id: string
} & {}

interface IUseSearchOptions<TItem> {
  initSearch: string
  valueGetter: (item: TItem) => string
}

interface IUseSearchReturn<TItem> {
  search: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  filteredList: TItem[]
}

/**
 * For this challenge, I'm abstracting the search filtering logic into a generic custom hook.
 * I thought it might be a nice bonus to be used for any type of list that each item has at least an id field.
 * It can be exported with the SearchField component as a more complete solution.
 * Can be expanded, such as optional debounce to the filtered result, etc.
 */
export function useSearch<TItem extends ISearchItem>(
  list: TItem[],
  _options: Partial<IUseSearchOptions<TItem>> = {},
): IUseSearchReturn<TItem> {
  const options: IUseSearchOptions<TItem> = useMemo(
    () => ({
      initSearch: '',
      valueGetter: (item) => item.id,
      ..._options,
    }),
    [_options],
  )

  const [search, setSearch] = useState(options.initSearch)
  const searchValue = useMemo(() => search.trim().toLowerCase(), [search])

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
    },
    [],
  )

  const filteredList = useMemo(
    () =>
      list.filter((item) =>
        options.valueGetter(item).toLowerCase().includes(searchValue),
      ),
    [list, options, searchValue],
  )

  return {
    search,
    handleSearchChange,
    filteredList,
  }
}
