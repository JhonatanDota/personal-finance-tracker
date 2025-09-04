<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class TransactionFilter extends Filter
{
    /**
     * Filter transactions by the given string.
     *
     * @param  string $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function name(string $value = ''): Builder
    {
        return $this->builder->where('name', 'like', "%{$value}%");
    }
}
