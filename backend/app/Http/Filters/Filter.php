<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Support\Str;

abstract class Filter
{
    /**
     * The request instance.
     *
     * @var Illuminate\Foundation\Http\FormRequest
     */
    protected $request;

    /**
     * The builder instance.
     *
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $builder;

    /**
     * Initialize a new filter instance.
     *
     * @param  Illuminate\Foundation\Http\FormRequest $request
     * @return void
     */
    public function __construct(FormRequest $request)
    {
        $this->request = $request;
    }

    /**
     * Returns the table name from builder property.
     * 
     * @return string
     */
    protected function table(): string
    {
        return $this->builder->getModel()->getTable();
    }

    /**
     * Returns the column with table name prefix.
     * 
     * @param string $column
     * @return string
     */
    protected function column(string $column): string
    {
        return $this->table() . '.' . $column;
    }

    /**
     * Apply the filters on the builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply(Builder $builder): Builder
    {
        $this->builder = $builder;

        foreach ($this->request->validated() as $name => $value) {
            $name = Str::camel($name);

            if ($this->checkValueHasValue($value) && method_exists($this, $name)) {
                call_user_func_array([$this, $name], array_filter([$value]));
            }
        }

        return $this->builder;
    }

    /**
     * Check if value has value.
     * 
     * @param mixed $value
     * @return bool
     */
    private function checkValueHasValue(mixed $value)
    {
        if (is_array($value) && empty($value)) return false;

        if (is_string($value) && empty($value)) return false;

        if (is_null($value)) return false;

        return true;
    }
}
