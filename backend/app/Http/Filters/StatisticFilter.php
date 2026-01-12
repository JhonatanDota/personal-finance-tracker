<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class StatisticFilter extends Filter
{
    /**
     * @param  string $date
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function dateGe(string $date): Builder
    {
        return $this->builder->whereDate($this->column('date'), '>=', $date);
    }

    /**
     * @param  string $date
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function dateLe(string $date): Builder
    {
        return $this->builder->whereDate($this->column('date'), '<=', $date);
    }
}
