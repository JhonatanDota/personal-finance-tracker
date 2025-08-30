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
     *
     * @return array
     */
    public function toSimplePaginateWithResource(
        LengthAwarePaginator $paginator,
        string $resourceClass
    ): array {
        return [
            'data' => $resourceClass::collection($paginator->items()),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
            ],
        ];
    }

    /**
     * Converts a LengthAwarePaginator into a simplified JSON structure without a Resource.
     *
     * @param LengthAwarePaginator $paginator The paginator instance.
     *
     * @return array
     */
    public function toSimplePaginate(LengthAwarePaginator $paginator): array
    {
        return [
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
            ],
        ];
    }

    /**
     * Applies the maximum per-page limit to the given value.
     *
     * @param int|null $perPage Requested number of items per page.
     * @return int Limited number of items per page.
     */
    protected function applyPerPageLimit(int|null $perPage): int
    {
        return min($perPage ?? self::DEFAULT_PER_PAGE, self::MAX_PER_PAGE);
    }
}
