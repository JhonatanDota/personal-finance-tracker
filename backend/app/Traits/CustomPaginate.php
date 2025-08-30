<?php

namespace App\Traits;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

trait CustomPaginate
{
    /**
     * Default number of items per page.
     */
    const DEFAULT_PER_PAGE = 10;

    /**
     * Maximum allowed items per page.
     */
    const MAX_PER_PAGE = 100;

    /**
     * Converts a LengthAwarePaginator into a simplified JSON structure using a Resource.
     *
     * @param LengthAwarePaginator $paginator The paginator instance.
     * @param string $resourceClass The JsonResource class to apply to each item.
     * @param int|null $perPage Optional number of items per page.
     *
     * @return array
     */
    public function toSimplePaginateWithResource(
        LengthAwarePaginator $paginator,
        string $resourceClass,
        int|null $perPage = self::DEFAULT_PER_PAGE
    ): array {
        $perPage = $this->applyPerPageLimit($perPage);

        return [
            'data' => $resourceClass::collection($paginator->items()),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
                'per_page'     => $perPage,
                'total'        => $paginator->total(),
            ],
        ];
    }

    /**
     * Converts a LengthAwarePaginator into a simplified JSON structure without a Resource.
     *
     * @param LengthAwarePaginator $paginator The paginator instance.
     * @param int|null $perPage Optional number of items per page.
     *
     * @return array
     */
    public function toSimplePaginate(LengthAwarePaginator $paginator, int|null $perPage = self::DEFAULT_PER_PAGE): array
    {
        $perPage = $this->applyPerPageLimit($perPage);

        return [
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
                'per_page'     => $perPage,
                'total'        => $paginator->total(),
            ],
        ];
    }

    /**
     * Applies the maximum per-page limit to the given value.
     *
     * @param int $perPage Requested number of items per page.
     * @return int|null Limited number of items per page.
     */
    protected function applyPerPageLimit(int|null $perPage): int
    {
        return min($perPage ?? self::DEFAULT_PER_PAGE, self::MAX_PER_PAGE);
    }
}
