<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class CategoryFilter extends Filter
{
    /**
     * Filter transactions by ids.
     *
     * @param array $idList
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function ids(array $idList): Builder
    {
        return $this->builder->whereIn($this->column('id'), $idList);
    }
}
