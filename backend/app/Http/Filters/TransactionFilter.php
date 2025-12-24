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

    /**
     * Order transactions by the given value.
     *
     * @param  string $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function orderBy(string $value): Builder
    {
        $orderDirection = $this->orderByDirectionByValue($value);

        // If order is desc, this means that string starts with "-" and we need to remove "-" from value
        if ($orderDirection === 'desc') {
            $value = substr($value, 1);
        }

        if (!$this->columnExists($value)) {
            return $this->builder;
        }

        return $this->builder->orderBy($this->column($value), $orderDirection);
    }
}
