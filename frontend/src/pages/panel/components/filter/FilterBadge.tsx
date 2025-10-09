import FilterOption from "../../../../types/filterOption";

type FilterBadgeProps = {
  filter: FilterOption;
};

export function FilterBadge(props: FilterBadgeProps) {
  const { filter } = props;

  return (
    <div className="flex items-center text-xs text-primary-text gap-1.5 py-1.5 px-2.5 bg-secondary rounded-full overflow-hidden">
      <span>{filter.label}:</span>
      <span className="font-bold">{filter.value}</span>
    </div>
  );
}

type FilterBadgesProps = {
  filters: FilterOption[];
};

export function FilterBadges(props: FilterBadgesProps) {
  const { filters } = props;

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(
        (filter) =>
          filter.value && <FilterBadge key={filter.label} filter={filter} />
      )}
    </div>
  );
}
