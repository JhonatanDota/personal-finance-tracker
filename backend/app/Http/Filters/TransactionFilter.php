<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class TransactionFilter extends Filter
{
    /**
     * Filter transactions by type.
     *
     * @param  string $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function type(string $value): Builder
    {
        return $this->builder->whereHas('category', function ($query) use ($value) {
            $query->where('type', $value);
        });
    }

    /**
     * Filter transactions by category.
     *
     * @param  int $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function categoryId(int $value): Builder
    {
        return $this->builder->where($this->column('category_id'), $value);
    }

    /**
     * Filter transactions by the given string.
     *
     * @param  string $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function name(string $value = ''): Builder
    {
        return $this->builder->where($this->column('name'), 'like', "%{$value}%");
    }
}
